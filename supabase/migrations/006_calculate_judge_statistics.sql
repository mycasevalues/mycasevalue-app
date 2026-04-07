-- Judge Statistics Calculation Stored Procedures
-- Phase 6: Calculate aggregate statistics from case data

-- Enable pg_trgm extension for fuzzy matching on judge names
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Function to calculate judge statistics by aggregating FJC case data
-- Fuzzy matches judges to cases using similarity on (last_name, district) combination
-- Aggregates outcomes per judge per NOS code and calculates derived rates
CREATE OR REPLACE FUNCTION calculate_judge_statistics()
RETURNS TABLE(judge_id TEXT, nos_code INTEGER, total_cases_updated INTEGER) AS $$
DECLARE
  v_judge RECORD;
  v_match_threshold FLOAT DEFAULT 0.6;
  v_start_time TIMESTAMPTZ;
BEGIN
  v_start_time := NOW();

  -- For each active judge, find matching cases from fjc_cases table
  FOR v_judge IN
    SELECT j.id, j.last_name, j.district_id
    FROM judges j
    WHERE j.is_active = true
  LOOP
    -- Find cases matching this judge by similarity of last_name and exact district match
    WITH matched_cases AS (
      SELECT
        fc.id,
        fc.nos_code,
        fc.disposition_code,
        EXTRACT(MONTH FROM AGE(fc.decision_date, fc.filing_date))::INTEGER AS duration_months
      FROM fjc_cases fc
      WHERE
        fc.district_id = v_judge.district_id
        AND fc.judge_last_name IS NOT NULL
        -- Fuzzy match: similarity of last name must exceed threshold
        AND similarity(LOWER(fc.judge_last_name), LOWER(v_judge.last_name)) > v_match_threshold
        AND fc.filing_date IS NOT NULL
    ),
    -- Aggregate statistics by NOS code
    stats_by_nos AS (
      SELECT
        v_judge.id::TEXT AS judge_id,
        fc.nos_code,
        COUNT(*)::INTEGER AS total_cases,
        SUM(CASE
          WHEN fc.disposition_code IN ('P', 'PA', 'PD') THEN 1  -- Plaintiff wins
          ELSE 0
        END)::INTEGER AS plaintiff_wins,
        SUM(CASE
          WHEN fc.disposition_code IN ('D', 'DA', 'DP') THEN 1  -- Defendant wins
          ELSE 0
        END)::INTEGER AS defendant_wins,
        SUM(CASE
          WHEN fc.disposition_code IN ('S', 'SA') THEN 1  -- Settlements
          ELSE 0
        END)::INTEGER AS settlements,
        SUM(CASE
          WHEN fc.disposition_code IN ('DM') THEN 1  -- Dismissals
          ELSE 0
        END)::INTEGER AS dismissals,
        SUM(CASE
          WHEN fc.disposition_code IN ('SJ', 'SD') THEN 1  -- Summary judgments for defense
          ELSE 0
        END)::INTEGER AS summary_judgments_defense,
        SUM(CASE
          WHEN fc.disposition_code IN ('MD') THEN 1  -- Motions to dismiss granted
          ELSE 0
        END)::INTEGER AS motions_to_dismiss_granted,
        ROUND(AVG(CASE WHEN fc.duration_months > 0 THEN fc.duration_months ELSE NULL END))::NUMERIC AS avg_duration_months
      FROM matched_cases fc
      GROUP BY fc.nos_code
    )
    INSERT INTO judge_statistics (
      judge_id, nos_code, total_cases, plaintiff_wins, defendant_wins, settlements,
      dismissals, summary_judgments_defense, motions_to_dismiss_granted, avg_duration_months,
      plaintiff_win_rate, summary_judgment_rate_defense, dismissal_rate, settlement_rate,
      last_calculated
    )
    SELECT
      s.judge_id,
      s.nos_code,
      s.total_cases,
      s.plaintiff_wins,
      s.defendant_wins,
      s.settlements,
      s.dismissals,
      s.summary_judgments_defense,
      s.motions_to_dismiss_granted,
      s.avg_duration_months,
      -- Calculate rates
      ROUND((CASE
        WHEN (s.plaintiff_wins + s.defendant_wins) > 0
        THEN (s.plaintiff_wins::NUMERIC / (s.plaintiff_wins + s.defendant_wins)) * 100
        ELSE 0
      END)::NUMERIC, 1),  -- plaintiff_win_rate
      ROUND((CASE
        WHEN s.total_cases > 0
        THEN (s.summary_judgments_defense::NUMERIC / s.total_cases) * 100
        ELSE 0
      END)::NUMERIC, 1),  -- summary_judgment_rate_defense
      ROUND((CASE
        WHEN s.total_cases > 0
        THEN (s.dismissals::NUMERIC / s.total_cases) * 100
        ELSE 0
      END)::NUMERIC, 1),  -- dismissal_rate
      ROUND((CASE
        WHEN s.total_cases > 0
        THEN (s.settlements::NUMERIC / s.total_cases) * 100
        ELSE 0
      END)::NUMERIC, 1),  -- settlement_rate
      NOW()
    FROM stats_by_nos s
    ON CONFLICT (judge_id, nos_code) DO UPDATE SET
      total_cases = EXCLUDED.total_cases,
      plaintiff_wins = EXCLUDED.plaintiff_wins,
      defendant_wins = EXCLUDED.defendant_wins,
      settlements = EXCLUDED.settlements,
      dismissals = EXCLUDED.dismissals,
      summary_judgments_defense = EXCLUDED.summary_judgments_defense,
      motions_to_dismiss_granted = EXCLUDED.motions_to_dismiss_granted,
      avg_duration_months = EXCLUDED.avg_duration_months,
      plaintiff_win_rate = EXCLUDED.plaintiff_win_rate,
      summary_judgment_rate_defense = EXCLUDED.summary_judgment_rate_defense,
      dismissal_rate = EXCLUDED.dismissal_rate,
      settlement_rate = EXCLUDED.settlement_rate,
      last_calculated = EXCLUDED.last_calculated;
  END LOOP;

  RETURN QUERY
    SELECT
      js.judge_id::TEXT,
      js.nos_code,
      COUNT(*)::INTEGER
    FROM judge_statistics js
    WHERE js.last_calculated >= v_start_time
    GROUP BY js.judge_id, js.nos_code;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate statistics for a single judge by ID
CREATE OR REPLACE FUNCTION calculate_judge_statistics_by_id(p_judge_id TEXT)
RETURNS TABLE(judge_id TEXT, nos_code INTEGER, total_cases INTEGER) AS $$
DECLARE
  v_judge RECORD;
  v_match_threshold FLOAT DEFAULT 0.6;
BEGIN
  -- Get judge details
  SELECT id, last_name, district_id INTO v_judge
  FROM judges
  WHERE id = p_judge_id AND is_active = true;

  IF v_judge.id IS NULL THEN
    RAISE EXCEPTION 'Judge not found or not active: %', p_judge_id;
  END IF;

  -- Match cases and calculate stats for this judge only
  WITH matched_cases AS (
    SELECT
      fc.nos_code,
      fc.disposition_code,
      EXTRACT(MONTH FROM AGE(fc.decision_date, fc.filing_date))::INTEGER AS duration_months
    FROM fjc_cases fc
    WHERE
      fc.district_id = v_judge.district_id
      AND fc.judge_last_name IS NOT NULL
      AND similarity(LOWER(fc.judge_last_name), LOWER(v_judge.last_name)) > v_match_threshold
      AND fc.filing_date IS NOT NULL
  ),
  stats_by_nos AS (
    SELECT
      v_judge.id::TEXT AS judge_id,
      mc.nos_code,
      COUNT(*)::INTEGER AS total_cases,
      SUM(CASE WHEN mc.disposition_code IN ('P', 'PA', 'PD') THEN 1 ELSE 0 END)::INTEGER AS plaintiff_wins,
      SUM(CASE WHEN mc.disposition_code IN ('D', 'DA', 'DP') THEN 1 ELSE 0 END)::INTEGER AS defendant_wins,
      SUM(CASE WHEN mc.disposition_code IN ('S', 'SA') THEN 1 ELSE 0 END)::INTEGER AS settlements,
      SUM(CASE WHEN mc.disposition_code IN ('DM') THEN 1 ELSE 0 END)::INTEGER AS dismissals,
      SUM(CASE WHEN mc.disposition_code IN ('SJ', 'SD') THEN 1 ELSE 0 END)::INTEGER AS summary_judgments_defense,
      SUM(CASE WHEN mc.disposition_code IN ('MD') THEN 1 ELSE 0 END)::INTEGER AS motions_to_dismiss_granted,
      ROUND(AVG(CASE WHEN mc.duration_months > 0 THEN mc.duration_months ELSE NULL END))::NUMERIC AS avg_duration_months
    FROM matched_cases mc
    GROUP BY mc.nos_code
  )
  INSERT INTO judge_statistics (
    judge_id, nos_code, total_cases, plaintiff_wins, defendant_wins, settlements,
    dismissals, summary_judgments_defense, motions_to_dismiss_granted, avg_duration_months,
    plaintiff_win_rate, summary_judgment_rate_defense, dismissal_rate, settlement_rate,
    last_calculated
  )
  SELECT
    s.judge_id,
    s.nos_code,
    s.total_cases,
    s.plaintiff_wins,
    s.defendant_wins,
    s.settlements,
    s.dismissals,
    s.summary_judgments_defense,
    s.motions_to_dismiss_granted,
    s.avg_duration_months,
    ROUND((CASE
      WHEN (s.plaintiff_wins + s.defendant_wins) > 0
      THEN (s.plaintiff_wins::NUMERIC / (s.plaintiff_wins + s.defendant_wins)) * 100
      ELSE 0
    END)::NUMERIC, 1),
    ROUND((CASE
      WHEN s.total_cases > 0
      THEN (s.summary_judgments_defense::NUMERIC / s.total_cases) * 100
      ELSE 0
    END)::NUMERIC, 1),
    ROUND((CASE
      WHEN s.total_cases > 0
      THEN (s.dismissals::NUMERIC / s.total_cases) * 100
      ELSE 0
    END)::NUMERIC, 1),
    ROUND((CASE
      WHEN s.total_cases > 0
      THEN (s.settlements::NUMERIC / s.total_cases) * 100
      ELSE 0
    END)::NUMERIC, 1),
    NOW()
  FROM stats_by_nos s
  ON CONFLICT (judge_id, nos_code) DO UPDATE SET
    total_cases = EXCLUDED.total_cases,
    plaintiff_wins = EXCLUDED.plaintiff_wins,
    defendant_wins = EXCLUDED.defendant_wins,
    settlements = EXCLUDED.settlements,
    dismissals = EXCLUDED.dismissals,
    summary_judgments_defense = EXCLUDED.summary_judgments_defense,
    motions_to_dismiss_granted = EXCLUDED.motions_to_dismiss_granted,
    avg_duration_months = EXCLUDED.avg_duration_months,
    plaintiff_win_rate = EXCLUDED.plaintiff_win_rate,
    summary_judgment_rate_defense = EXCLUDED.summary_judgment_rate_defense,
    dismissal_rate = EXCLUDED.dismissal_rate,
    settlement_rate = EXCLUDED.settlement_rate,
    last_calculated = EXCLUDED.last_calculated;

  -- Return updated rows
  RETURN QUERY
    SELECT
      js.judge_id::TEXT,
      js.nos_code,
      js.total_cases
    FROM judge_statistics js
    WHERE js.judge_id = p_judge_id AND js.last_calculated >= NOW() - INTERVAL '1 minute';
END;
$$ LANGUAGE plpgsql;
