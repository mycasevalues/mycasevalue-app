/**
 * Real case data from CourtListener / FJC Integrated Database
 * Auto-generated from ETL pipeline output
 * 4,168,590+ federal court cases across 20 NOS codes
 */

export const REAL_DATA: Record<string, any> = {
  "190": {
    "nos_code": "190",
    "label": "Contract",
    "category": "money",
    "sub": "breach of contract",
    "total": 552285,
    "mo": 7,
    "wr": 61.0,
    "sp": 47.0,
    "sol": "4-6 years (varies by state)",
    "af": "$250-500/hr",
    "rng": {
      "lo": 59,
      "md": 197,
      "hi": 1147
    },
    "rp": 12.0,
    "ps": {
      "wr": 39.1,
      "total": 28511
    },
    "rr": {
      "wr": 62.2,
      "total": 523774
    },
    "cw": 64.0,
    "ends": [
      {
        "l": "Settlement",
        "p": 47.0,
        "c": "#0D9488",
        "n": 259349
      },
      {
        "l": "Dismissed",
        "p": 17.8,
        "c": "#94A3B8",
        "n": 98432
      },
      {
        "l": "Other",
        "p": 8.7,
        "c": "#475569",
        "n": 48029
      },
      {
        "l": "Summary Judgment",
        "p": 8.6,
        "c": "#D97706",
        "n": 47337
      },
      {
        "l": "Default Judgment",
        "p": 6.6,
        "c": "#DB2777",
        "n": 36395
      },
      {
        "l": "Trial",
        "p": 2.5,
        "c": "#7C3AED",
        "n": 13929
      },
      {
        "l": "Consent",
        "p": 2.4,
        "c": "#2563EB",
        "n": 13474
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 88.0,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 1.8,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 1.5,
      "trial_loss": 1.0,
      "dismiss": 26.4,
      "fav_set": 47.0,
      "set_mo": 9,
      "trial_med": "$200"
    },
    "circuit_rates": {
      "3": 70.7,
      "6": 64.5,
      "4": 62.4,
      "5": 54.0,
      "7": 67.8,
      "8": 63.3,
      "9": 57.2,
      "10": 65.0,
      "11": 55.7,
      "dc": 53.7,
      "1": 61.6,
      "2": 57.2
    },
    "state_rates": {
      "PA": 74.8,
      "MI": 71.4,
      "VI": 41.5,
      "MD": 60.1,
      "NC": 68.3,
      "TX": 52.8,
      "SC": 65.7,
      "VA": 60.3,
      "WV": 57.2,
      "LA": 57.3,
      "KY": 60.0,
      "MS": 55.0,
      "OH": 60.8,
      "TN": 59.9,
      "IL": 69.3,
      "IN": 63.5,
      "WI": 66.8,
      "AR": 61.0,
      "IA": 63.8,
      "MN": 66.0,
      "MO": 61.7,
      "NE": 64.3,
      "ND": 63.6,
      "SD": 63.6,
      "AK": 56.4,
      "AZ": 63.2,
      "CA": 54.4,
      "HI": 62.0,
      "ID": 62.8,
      "MT": 62.7,
      "NV": 54.1,
      "OR": 66.0,
      "WA": 60.8,
      "CO": 63.9,
      "KS": 67.9,
      "NM": 64.2,
      "OK": 64.2,
      "UT": 65.0,
      "WY": 67.0,
      "AL": 52.3,
      "FL": 54.7,
      "GA": 60.4,
      "DC": 53.7,
      "ME": 66.2,
      "MA": 61.3,
      "NH": 61.0,
      "RI": 66.0,
      "PR": 58.0,
      "CT": 68.1,
      "NY": 55.4,
      "VT": 69.3,
      "DE": 58.3,
      "NJ": 67.1,
      "GU": 76.7
    },
    "yearly_trend": {
      "1990": {
        "total": 18870,
        "wr": 65.2
      },
      "1991": {
        "total": 19194,
        "wr": 65.4
      },
      "1992": {
        "total": 17722,
        "wr": 66.0
      },
      "1993": {
        "total": 16459,
        "wr": 66.2
      },
      "1994": {
        "total": 16004,
        "wr": 65.1
      },
      "1995": {
        "total": 16223,
        "wr": 63.7
      },
      "1996": {
        "total": 17407,
        "wr": 62.9
      },
      "1997": {
        "total": 17460,
        "wr": 65.3
      },
      "1998": {
        "total": 15550,
        "wr": 63.8
      },
      "1999": {
        "total": 16249,
        "wr": 65.7
      },
      "2000": {
        "total": 16791,
        "wr": 65.4
      },
      "2001": {
        "total": 17529,
        "wr": 64.6
      },
      "2002": {
        "total": 17062,
        "wr": 63.0
      },
      "2003": {
        "total": 15588,
        "wr": 60.7
      },
      "2004": {
        "total": 14410,
        "wr": 60.5
      },
      "2005": {
        "total": 13621,
        "wr": 59.3
      },
      "2006": {
        "total": 13845,
        "wr": 59.9
      },
      "2007": {
        "total": 13613,
        "wr": 61.2
      },
      "2008": {
        "total": 14302,
        "wr": 63.3
      },
      "2009": {
        "total": 15818,
        "wr": 64.1
      },
      "2010": {
        "total": 14499,
        "wr": 62.4
      },
      "2011": {
        "total": 14047,
        "wr": 61.7
      },
      "2012": {
        "total": 13139,
        "wr": 62.2
      },
      "2013": {
        "total": 12032,
        "wr": 63.2
      },
      "2014": {
        "total": 11463,
        "wr": 62.0
      },
      "2015": {
        "total": 11419,
        "wr": 62.2
      },
      "2016": {
        "total": 10828,
        "wr": 63.3
      },
      "2017": {
        "total": 10964,
        "wr": 61.5
      },
      "2018": {
        "total": 10341,
        "wr": 62.5
      },
      "2019": {
        "total": 9369,
        "wr": 62.2
      },
      "2020": {
        "total": 7297,
        "wr": 60.8
      },
      "2021": {
        "total": 1147,
        "wr": 52.9
      }
    },
    "data_date": "2026-03-19T19:31:50.488884",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 1,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 5,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 7,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "350": {
    "nos_code": "350",
    "label": "Motor Vehicle",
    "category": "injury",
    "sub": "vehicle accident",
    "total": 167420,
    "mo": 10,
    "wr": 66.3,
    "sp": 61.9,
    "sol": "2-3 years (varies by state)",
    "af": "33-40% contingency",
    "rng": {
      "lo": 22,
      "md": 100,
      "hi": 740
    },
    "rp": 4.1,
    "ps": {
      "wr": 37.9,
      "total": 3248
    },
    "rr": {
      "wr": 66.9,
      "total": 164172
    },
    "cw": 69.6,
    "ends": [
      {
        "l": "Settlement",
        "p": 61.9,
        "c": "#0D9488",
        "n": 103702
      },
      {
        "l": "Dismissed",
        "p": 14.4,
        "c": "#94A3B8",
        "n": 24071
      },
      {
        "l": "Other",
        "p": 8.2,
        "c": "#475569",
        "n": 13775
      },
      {
        "l": "Trial",
        "p": 4.2,
        "c": "#7C3AED",
        "n": 7052
      },
      {
        "l": "Summary Judgment",
        "p": 2.9,
        "c": "#D97706",
        "n": 4923
      },
      {
        "l": "Consent",
        "p": 0.7,
        "c": "#2563EB",
        "n": 1092
      },
      {
        "l": "Default Judgment",
        "p": 0.3,
        "c": "#DB2777",
        "n": 495
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 95.9,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 4.1,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 2.8,
      "trial_loss": 1.4,
      "dismiss": 17.3,
      "fav_set": 61.9,
      "set_mo": 10,
      "trial_med": "$126"
    },
    "circuit_rates": {
      "3": 73.7,
      "5": 62.4,
      "4": 68.6,
      "6": 68.2,
      "7": 68.5,
      "8": 69.8,
      "9": 63.1,
      "10": 73.1,
      "11": 63.0,
      "dc": 70.3,
      "1": 68.8,
      "2": 54.9
    },
    "state_rates": {
      "PA": 76.6,
      "TX": 51.5,
      "VI": 43.4,
      "MD": 67.0,
      "NC": 70.5,
      "SC": 72.3,
      "VA": 68.6,
      "WV": 62.6,
      "LA": 67.8,
      "MI": 67.2,
      "MS": 69.8,
      "KY": 68.9,
      "OH": 67.3,
      "TN": 68.8,
      "IL": 65.3,
      "IN": 73.6,
      "WI": 62.3,
      "AR": 75.5,
      "IA": 70.6,
      "MO": 63.4,
      "NE": 76.4,
      "SD": 74.1,
      "AZ": 66.2,
      "CA": 58.2,
      "HI": 72.9,
      "ID": 69.3,
      "OR": 69.8,
      "WA": 65.7,
      "KS": 77.2,
      "NM": 72.2,
      "OK": 70.6,
      "UT": 70.4,
      "WY": 82.7,
      "AL": 58.3,
      "FL": 60.7,
      "GA": 67.6,
      "DC": 70.3,
      "ME": 74.3,
      "MA": 66.1,
      "NH": 68.7,
      "RI": 75.1,
      "PR": 67.4,
      "CT": 72.4,
      "NY": 52.4,
      "NJ": 70.1,
      "NV": 56.9,
      "VT": 79.6,
      "DE": 75.4,
      "ND": 76.3,
      "CO": 70.4,
      "MN": 69.7,
      "AK": 58.1,
      "MT": 78.5,
      "GU": 81.5
    },
    "yearly_trend": {
      "1990": {
        "total": 5844,
        "wr": 71.0
      },
      "1991": {
        "total": 5875,
        "wr": 71.6
      },
      "1992": {
        "total": 5525,
        "wr": 71.0
      },
      "1993": {
        "total": 5209,
        "wr": 71.0
      },
      "1994": {
        "total": 5100,
        "wr": 68.5
      },
      "1995": {
        "total": 5347,
        "wr": 67.9
      },
      "1996": {
        "total": 5235,
        "wr": 67.7
      },
      "1997": {
        "total": 5100,
        "wr": 69.1
      },
      "1998": {
        "total": 4880,
        "wr": 69.5
      },
      "1999": {
        "total": 4858,
        "wr": 69.3
      },
      "2000": {
        "total": 4619,
        "wr": 71.0
      },
      "2001": {
        "total": 4447,
        "wr": 70.2
      },
      "2002": {
        "total": 4489,
        "wr": 69.3
      },
      "2003": {
        "total": 4479,
        "wr": 67.6
      },
      "2004": {
        "total": 4127,
        "wr": 69.1
      },
      "2005": {
        "total": 4039,
        "wr": 68.9
      },
      "2006": {
        "total": 3833,
        "wr": 69.3
      },
      "2007": {
        "total": 3746,
        "wr": 70.5
      },
      "2008": {
        "total": 3576,
        "wr": 69.5
      },
      "2009": {
        "total": 3538,
        "wr": 70.1
      },
      "2010": {
        "total": 3513,
        "wr": 71.5
      },
      "2011": {
        "total": 3544,
        "wr": 70.8
      },
      "2012": {
        "total": 3466,
        "wr": 71.9
      },
      "2013": {
        "total": 3541,
        "wr": 72.8
      },
      "2014": {
        "total": 3800,
        "wr": 72.1
      },
      "2015": {
        "total": 3746,
        "wr": 71.3
      },
      "2016": {
        "total": 4088,
        "wr": 72.9
      },
      "2017": {
        "total": 4529,
        "wr": 72.4
      },
      "2018": {
        "total": 4554,
        "wr": 71.3
      },
      "2019": {
        "total": 4431,
        "wr": 71.9
      },
      "2020": {
        "total": 3036,
        "wr": 65.4
      },
      "2021": {
        "total": 440,
        "wr": 49.5
      }
    },
    "data_date": "2026-03-19T19:31:50.511542",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 8,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 10,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "110": {
    "nos_code": "110",
    "label": "Insurance",
    "category": "work",
    "sub": "insurance bad faith",
    "total": 315499,
    "mo": 8,
    "wr": 61.0,
    "sp": 54.8,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 30,
      "md": 126,
      "hi": 827
    },
    "rp": 2.8,
    "ps": {
      "wr": 45.0,
      "total": 10618
    },
    "rr": {
      "wr": 61.6,
      "total": 304881
    },
    "cw": 64.0,
    "ends": [
      {
        "l": "Settlement",
        "p": 54.8,
        "c": "#0D9488",
        "n": 172830
      },
      {
        "l": "Dismissed",
        "p": 14.6,
        "c": "#94A3B8",
        "n": 45991
      },
      {
        "l": "Summary Judgment",
        "p": 10.2,
        "c": "#D97706",
        "n": 32235
      },
      {
        "l": "Other",
        "p": 8.1,
        "c": "#475569",
        "n": 25680
      },
      {
        "l": "Trial",
        "p": 2.1,
        "c": "#7C3AED",
        "n": 6468
      },
      {
        "l": "Default Judgment",
        "p": 1.3,
        "c": "#DB2777",
        "n": 4094
      },
      {
        "l": "Consent",
        "p": 0.9,
        "c": "#2563EB",
        "n": 2724
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 97.2,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 2.8,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 1.3,
      "trial_loss": 0.8,
      "dismiss": 24.8,
      "fav_set": 54.8,
      "set_mo": 9,
      "trial_med": "$190"
    },
    "circuit_rates": {
      "3": 68.0,
      "9": 60.0,
      "4": 63.7,
      "6": 59.8,
      "5": 59.7,
      "7": 64.7,
      "8": 62.2,
      "10": 65.4,
      "11": 55.7,
      "dc": 58.6,
      "1": 62.8,
      "2": 59.4
    },
    "state_rates": {
      "PA": 67.9,
      "CA": 58.2,
      "MD": 58.6,
      "NC": 66.7,
      "MI": 62.7,
      "SC": 69.9,
      "VA": 61.7,
      "WV": 56.8,
      "KY": 59.7,
      "LA": 61.8,
      "MS": 63.5,
      "TX": 56.6,
      "OH": 58.6,
      "TN": 57.1,
      "IL": 64.5,
      "IN": 66.2,
      "WI": 61.9,
      "AR": 64.7,
      "MN": 62.4,
      "MO": 58.9,
      "AK": 59.4,
      "AZ": 64.0,
      "HI": 71.1,
      "MT": 64.1,
      "NV": 55.7,
      "OR": 63.2,
      "WA": 63.3,
      "CO": 65.5,
      "OK": 64.2,
      "KS": 66.3,
      "NM": 67.9,
      "UT": 62.3,
      "WY": 73.8,
      "AL": 48.5,
      "FL": 56.9,
      "GA": 61.1,
      "DC": 58.6,
      "MA": 63.1,
      "NH": 58.1,
      "RI": 66.6,
      "PR": 55.3,
      "CT": 69.0,
      "NY": 56.9,
      "VT": 71.9,
      "DE": 58.9,
      "NJ": 69.7,
      "VI": 51.6,
      "IA": 63.3,
      "SD": 69.7,
      "ME": 65.8,
      "NE": 67.8,
      "ID": 65.6,
      "GU": 80.8,
      "ND": 63.8
    },
    "yearly_trend": {
      "1990": {
        "total": 7044,
        "wr": 64.6
      },
      "1991": {
        "total": 7313,
        "wr": 63.6
      },
      "1992": {
        "total": 7378,
        "wr": 63.3
      },
      "1993": {
        "total": 7231,
        "wr": 64.2
      },
      "1994": {
        "total": 7323,
        "wr": 62.4
      },
      "1995": {
        "total": 7486,
        "wr": 60.7
      },
      "1996": {
        "total": 7962,
        "wr": 60.0
      },
      "1997": {
        "total": 7808,
        "wr": 59.3
      },
      "1998": {
        "total": 7197,
        "wr": 62.3
      },
      "1999": {
        "total": 7198,
        "wr": 62.2
      },
      "2000": {
        "total": 7560,
        "wr": 60.3
      },
      "2001": {
        "total": 7912,
        "wr": 61.0
      },
      "2002": {
        "total": 8802,
        "wr": 62.2
      },
      "2003": {
        "total": 8706,
        "wr": 60.3
      },
      "2004": {
        "total": 8020,
        "wr": 61.4
      },
      "2005": {
        "total": 7711,
        "wr": 60.1
      },
      "2006": {
        "total": 12630,
        "wr": 66.1
      },
      "2007": {
        "total": 13671,
        "wr": 70.8
      },
      "2008": {
        "total": 10055,
        "wr": 65.1
      },
      "2009": {
        "total": 11182,
        "wr": 68.6
      },
      "2010": {
        "total": 9959,
        "wr": 64.5
      },
      "2011": {
        "total": 8518,
        "wr": 64.1
      },
      "2012": {
        "total": 8913,
        "wr": 64.3
      },
      "2013": {
        "total": 11386,
        "wr": 60.1
      },
      "2014": {
        "total": 11249,
        "wr": 71.5
      },
      "2015": {
        "total": 9239,
        "wr": 69.2
      },
      "2016": {
        "total": 8668,
        "wr": 67.1
      },
      "2017": {
        "total": 9670,
        "wr": 68.9
      },
      "2018": {
        "total": 10157,
        "wr": 69.0
      },
      "2019": {
        "total": 9313,
        "wr": 67.7
      },
      "2020": {
        "total": 7333,
        "wr": 65.1
      },
      "2021": {
        "total": 1090,
        "wr": 58.3
      }
    },
    "data_date": "2026-03-19T19:31:50.541692",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 6,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 8,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "790": {
    "nos_code": "790",
    "label": "ERISA",
    "category": "work",
    "sub": "ERISA",
    "total": 48011,
    "mo": 9,
    "wr": 56.3,
    "sp": 47.8,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 9,
      "md": 34,
      "hi": 296
    },
    "rp": 6.4,
    "ps": {
      "wr": 27.7,
      "total": 2583
    },
    "rr": {
      "wr": 58.0,
      "total": 45428
    },
    "cw": 59.1,
    "ends": [
      {
        "l": "Settlement",
        "p": 47.8,
        "c": "#0D9488",
        "n": 22969
      },
      {
        "l": "Dismissed",
        "p": 16.0,
        "c": "#94A3B8",
        "n": 7690
      },
      {
        "l": "Summary Judgment",
        "p": 12.4,
        "c": "#D97706",
        "n": 5934
      },
      {
        "l": "Other",
        "p": 8.6,
        "c": "#475569",
        "n": 4141
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 1639
      },
      {
        "l": "Trial",
        "p": 2.0,
        "c": "#7C3AED",
        "n": 962
      },
      {
        "l": "Consent",
        "p": 1.9,
        "c": "#2563EB",
        "n": 891
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 93.6,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 6.4,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 1.1,
      "trial_loss": 0.9,
      "dismiss": 28.4,
      "fav_set": 47.8,
      "set_mo": 9,
      "trial_med": "$165"
    },
    "circuit_rates": {
      "3": 62.4,
      "6": 55.9,
      "4": 59.5,
      "5": 50.6,
      "7": 65.4,
      "8": 58.0,
      "9": 54.2,
      "10": 60.6,
      "11": 58.2,
      "1": 54.6,
      "2": 56.1,
      "dc": 39.0
    },
    "state_rates": {
      "PA": 66.6,
      "MI": 57.7,
      "WV": 60.8,
      "LA": 49.8,
      "MS": 54.6,
      "TX": 50.4,
      "OH": 55.1,
      "TN": 56.8,
      "IL": 67.0,
      "IN": 62.3,
      "WI": 61.0,
      "AR": 70.8,
      "MN": 53.5,
      "MO": 53.8,
      "CA": 53.5,
      "NV": 45.4,
      "OK": 62.4,
      "UT": 57.4,
      "AL": 47.3,
      "MA": 56.0,
      "CT": 67.4,
      "NY": 53.4,
      "DE": 43.6,
      "VI": 34.1,
      "NC": 62.3,
      "KY": 51.4,
      "MT": 62.0,
      "OR": 61.7,
      "WA": 53.9,
      "CO": 61.4,
      "FL": 60.9,
      "NJ": 61.8,
      "SC": 67.3,
      "VA": 54.9,
      "IA": 57.7,
      "AK": 45.1,
      "AZ": 60.0,
      "ID": 66.4,
      "KS": 62.9,
      "GA": 49.5,
      "MD": 54.6,
      "SD": 52.8,
      "DC": 39.0,
      "PR": 52.5,
      "VT": 62.0,
      "NE": 60.3,
      "HI": 53.7,
      "NM": 53.8,
      "RI": 59.1,
      "ME": 58.9,
      "NH": 52.3,
      "ND": 50.0,
      "WY": 51.4
    },
    "yearly_trend": {
      "1990": {
        "total": 1392,
        "wr": 65.2
      },
      "1991": {
        "total": 1376,
        "wr": 65.0
      },
      "1992": {
        "total": 1471,
        "wr": 64.3
      },
      "1993": {
        "total": 1450,
        "wr": 64.9
      },
      "1994": {
        "total": 1420,
        "wr": 60.4
      },
      "1995": {
        "total": 1573,
        "wr": 59.9
      },
      "1996": {
        "total": 1582,
        "wr": 59.6
      },
      "1997": {
        "total": 1553,
        "wr": 58.1
      },
      "1998": {
        "total": 1370,
        "wr": 61.2
      },
      "1999": {
        "total": 1326,
        "wr": 59.7
      },
      "2000": {
        "total": 1259,
        "wr": 60.6
      },
      "2001": {
        "total": 1303,
        "wr": 59.2
      },
      "2002": {
        "total": 1379,
        "wr": 61.3
      },
      "2003": {
        "total": 1481,
        "wr": 58.1
      },
      "2004": {
        "total": 1354,
        "wr": 58.1
      },
      "2005": {
        "total": 1271,
        "wr": 57.7
      },
      "2006": {
        "total": 1207,
        "wr": 56.8
      },
      "2007": {
        "total": 1133,
        "wr": 57.2
      },
      "2008": {
        "total": 1266,
        "wr": 54.1
      },
      "2009": {
        "total": 1300,
        "wr": 58.2
      },
      "2010": {
        "total": 1395,
        "wr": 59.2
      },
      "2011": {
        "total": 1457,
        "wr": 54.3
      },
      "2012": {
        "total": 1288,
        "wr": 62.1
      },
      "2013": {
        "total": 1102,
        "wr": 54.0
      },
      "2014": {
        "total": 1394,
        "wr": 58.8
      },
      "2015": {
        "total": 1442,
        "wr": 58.5
      },
      "2016": {
        "total": 1362,
        "wr": 58.1
      },
      "2017": {
        "total": 1242,
        "wr": 58.4
      },
      "2018": {
        "total": 1286,
        "wr": 58.0
      },
      "2019": {
        "total": 1223,
        "wr": 58.5
      },
      "2020": {
        "total": 835,
        "wr": 56.8
      },
      "2021": {
        "total": 113,
        "wr": 41.6
      }
    },
    "data_date": "2026-03-19T19:31:50.558046",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 9,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "360": {
    "nos_code": "360",
    "label": "Personal Injury",
    "category": "injury",
    "sub": "slip and fall",
    "total": 308416,
    "mo": 9,
    "wr": 51.3,
    "sp": 48.4,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 19,
      "md": 82,
      "hi": 638
    },
    "rp": 2.6,
    "ps": {
      "wr": 18.5,
      "total": 19762
    },
    "rr": {
      "wr": 53.5,
      "total": 288654
    },
    "cw": 53.9,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.4,
        "c": "#0D9488",
        "n": 149264
      },
      {
        "l": "Dismissed",
        "p": 16.6,
        "c": "#94A3B8",
        "n": 51089
      },
      {
        "l": "Other",
        "p": 10.0,
        "c": "#475569",
        "n": 30933
      },
      {
        "l": "Summary Judgment",
        "p": 7.1,
        "c": "#D97706",
        "n": 21895
      },
      {
        "l": "Trial",
        "p": 5.7,
        "c": "#7C3AED",
        "n": 17506
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 1878
      },
      {
        "l": "Default Judgment",
        "p": 0.3,
        "c": "#DB2777",
        "n": 812
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 97.4,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 2.6,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 2.9,
      "trial_loss": 2.8,
      "dismiss": 23.7,
      "fav_set": 48.4,
      "set_mo": 11,
      "trial_med": "$136"
    },
    "circuit_rates": {
      "3": 61.4,
      "4": 46.3,
      "5": 39.8,
      "2": 61.4,
      "6": 59.6,
      "7": 54.3,
      "8": 47.0,
      "9": 47.1,
      "10": 61.1,
      "11": 49.5,
      "dc": 43.1,
      "1": 56.5
    },
    "state_rates": {
      "PA": 65.7,
      "VI": 40.4,
      "MD": 50.3,
      "TX": 46.3,
      "NC": 49.9,
      "SC": 56.9,
      "VA": 55.0,
      "NY": 61.7,
      "KY": 54.5,
      "WV": 26.0,
      "LA": 32.8,
      "MS": 49.1,
      "MI": 54.1,
      "OH": 66.0,
      "TN": 60.2,
      "IL": 54.1,
      "IN": 54.8,
      "WI": 53.5,
      "AR": 60.0,
      "IA": 59.2,
      "MN": 51.9,
      "MO": 36.2,
      "ND": 59.3,
      "AK": 49.7,
      "AZ": 47.6,
      "CA": 41.0,
      "HI": 61.9,
      "ID": 54.1,
      "MT": 60.8,
      "NV": 48.1,
      "OR": 55.5,
      "WA": 54.5,
      "CO": 63.7,
      "KS": 61.6,
      "NM": 61.8,
      "OK": 58.2,
      "UT": 54.6,
      "AL": 42.6,
      "FL": 50.5,
      "GA": 52.8,
      "NJ": 60.8,
      "DC": 43.1,
      "MA": 52.9,
      "NH": 55.1,
      "RI": 71.4,
      "PR": 55.6,
      "CT": 55.5,
      "VT": 68.7,
      "NE": 60.7,
      "SD": 55.2,
      "WY": 71.6,
      "ME": 60.4,
      "DE": 45.8,
      "GU": 23.7
    },
    "yearly_trend": {
      "1990": {
        "total": 7220,
        "wr": 58.9
      },
      "1991": {
        "total": 7546,
        "wr": 58.4
      },
      "1992": {
        "total": 7887,
        "wr": 57.2
      },
      "1993": {
        "total": 8126,
        "wr": 55.7
      },
      "1994": {
        "total": 10764,
        "wr": 42.8
      },
      "1995": {
        "total": 9787,
        "wr": 48.7
      },
      "1996": {
        "total": 15297,
        "wr": 31.3
      },
      "1997": {
        "total": 8555,
        "wr": 54.1
      },
      "1998": {
        "total": 7822,
        "wr": 54.2
      },
      "1999": {
        "total": 7520,
        "wr": 55.6
      },
      "2000": {
        "total": 7168,
        "wr": 56.0
      },
      "2001": {
        "total": 6868,
        "wr": 55.5
      },
      "2002": {
        "total": 7418,
        "wr": 54.4
      },
      "2003": {
        "total": 7378,
        "wr": 52.7
      },
      "2004": {
        "total": 7164,
        "wr": 56.1
      },
      "2005": {
        "total": 8887,
        "wr": 49.4
      },
      "2006": {
        "total": 12523,
        "wr": 74.9
      },
      "2007": {
        "total": 8256,
        "wr": 64.8
      },
      "2008": {
        "total": 7323,
        "wr": 60.6
      },
      "2009": {
        "total": 7167,
        "wr": 57.7
      },
      "2010": {
        "total": 6812,
        "wr": 57.0
      },
      "2011": {
        "total": 6719,
        "wr": 55.8
      },
      "2012": {
        "total": 6792,
        "wr": 54.6
      },
      "2013": {
        "total": 6859,
        "wr": 56.3
      },
      "2014": {
        "total": 10597,
        "wr": 52.2
      },
      "2015": {
        "total": 10519,
        "wr": 56.9
      },
      "2016": {
        "total": 7598,
        "wr": 56.8
      },
      "2017": {
        "total": 8679,
        "wr": 51.9
      },
      "2018": {
        "total": 10019,
        "wr": 56.9
      },
      "2019": {
        "total": 13441,
        "wr": 47.2
      },
      "2020": {
        "total": 5061,
        "wr": 47.2
      },
      "2021": {
        "total": 804,
        "wr": 33.3
      }
    },
    "data_date": "2026-03-19T19:31:50.587126",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 9,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "365": {
    "nos_code": "365",
    "label": "Product Liability",
    "category": "injury",
    "sub": "product liability",
    "total": 878932,
    "mo": 11,
    "wr": 32.5,
    "sp": 32.1,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 50,
      "md": 250,
      "hi": 1500
    },
    "rp": 0.3,
    "ps": {
      "wr": 4.1,
      "total": 259471
    },
    "rr": {
      "wr": 44.4,
      "total": 619461
    },
    "cw": 34.1,
    "ends": [
      {
        "l": "Other",
        "p": 36.4,
        "c": "#475569",
        "n": 319800
      },
      {
        "l": "Settlement",
        "p": 32.1,
        "c": "#0D9488",
        "n": 282227
      },
      {
        "l": "Dismissed",
        "p": 16.3,
        "c": "#94A3B8",
        "n": 143564
      },
      {
        "l": "Summary Judgment",
        "p": 1.6,
        "c": "#D97706",
        "n": 13964
      },
      {
        "l": "Trial",
        "p": 0.5,
        "c": "#7C3AED",
        "n": 4232
      },
      {
        "l": "Consent",
        "p": 0.1,
        "c": "#2563EB",
        "n": 621
      },
      {
        "l": "Default Judgment",
        "p": 0.0,
        "c": "#DB2777",
        "n": 303
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 99.7,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 0.3,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 0.2,
      "trial_loss": 0.3,
      "dismiss": 17.9,
      "fav_set": 32.1,
      "set_mo": 16,
      "trial_med": "$475"
    },
    "circuit_rates": {
      "3": 47.1,
      "4": 66.8,
      "2": 34.8,
      "5": 35.3,
      "6": 29.9,
      "7": 60.2,
      "8": 47.7,
      "9": 32.0,
      "10": 38.8,
      "11": 7.4,
      "dc": 27.1,
      "1": 34.2
    },
    "state_rates": {
      "PA": 50.3,
      "MD": 30.2,
      "NC": 24.3,
      "SC": 32.8,
      "VA": 41.2,
      "WV": 71.0,
      "NY": 34.8,
      "LA": 59.3,
      "MS": 25.1,
      "TX": 20.5,
      "KY": 50.4,
      "MI": 14.2,
      "OH": 38.1,
      "TN": 32.1,
      "IL": 69.3,
      "IN": 38.2,
      "WI": 40.2,
      "AR": 77.0,
      "IA": 44.1,
      "MN": 40.9,
      "MO": 32.6,
      "NE": 28.5,
      "AK": 39.6,
      "CA": 23.4,
      "HI": 28.3,
      "NV": 26.7,
      "OR": 31.7,
      "WA": 25.6,
      "CO": 39.1,
      "KS": 39.3,
      "NM": 34.9,
      "OK": 39.8,
      "WY": 71.1,
      "AL": 8.4,
      "FL": 6.6,
      "GA": 34.9,
      "DC": 27.1,
      "ME": 44.5,
      "MA": 41.2,
      "CT": 32.7,
      "NJ": 27.9,
      "VI": 59.9,
      "ND": 36.7,
      "AZ": 54.4,
      "MT": 48.4,
      "UT": 31.1,
      "NH": 19.6,
      "RI": 24.2,
      "PR": 43.1,
      "VT": 58.2,
      "SD": 49.6,
      "ID": 34.5,
      "DE": 15.8
    },
    "yearly_trend": {
      "1990": {
        "total": 3997,
        "wr": 59.9
      },
      "1991": {
        "total": 4897,
        "wr": 49.6
      },
      "1992": {
        "total": 8140,
        "wr": 30.6
      },
      "1993": {
        "total": 13428,
        "wr": 19.1
      },
      "1994": {
        "total": 13061,
        "wr": 20.5
      },
      "1995": {
        "total": 29250,
        "wr": 11.9
      },
      "1996": {
        "total": 13226,
        "wr": 32.3
      },
      "1997": {
        "total": 27341,
        "wr": 19.7
      },
      "1998": {
        "total": 12237,
        "wr": 34.5
      },
      "1999": {
        "total": 9670,
        "wr": 45.7
      },
      "2000": {
        "total": 6148,
        "wr": 49.7
      },
      "2001": {
        "total": 7009,
        "wr": 39.1
      },
      "2002": {
        "total": 14685,
        "wr": 30.2
      },
      "2003": {
        "total": 23058,
        "wr": 27.9
      },
      "2004": {
        "total": 30552,
        "wr": 33.4
      },
      "2005": {
        "total": 24403,
        "wr": 42.9
      },
      "2006": {
        "total": 38745,
        "wr": 68.2
      },
      "2007": {
        "total": 15400,
        "wr": 55.5
      },
      "2008": {
        "total": 23303,
        "wr": 37.5
      },
      "2009": {
        "total": 14835,
        "wr": 34.0
      },
      "2010": {
        "total": 20622,
        "wr": 47.1
      },
      "2011": {
        "total": 18507,
        "wr": 45.7
      },
      "2012": {
        "total": 23754,
        "wr": 61.0
      },
      "2013": {
        "total": 48617,
        "wr": 78.1
      },
      "2014": {
        "total": 41624,
        "wr": 76.1
      },
      "2015": {
        "total": 23422,
        "wr": 72.8
      },
      "2016": {
        "total": 17733,
        "wr": 70.6
      },
      "2017": {
        "total": 9883,
        "wr": 60.9
      },
      "2018": {
        "total": 6382,
        "wr": 53.9
      },
      "2019": {
        "total": 9855,
        "wr": 43.6
      },
      "2020": {
        "total": 20101,
        "wr": 49.0
      },
      "2021": {
        "total": 1379,
        "wr": 24.8
      }
    },
    "data_date": "2026-03-19T19:31:50.600346",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 6,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 8,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 11,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "440": {
    "nos_code": "440",
    "label": "TCPA/Telecom",
    "category": "consumer",
    "sub": "TCPA violation",
    "total": 531796,
    "mo": 8,
    "wr": 37.7,
    "sp": 35.1,
    "sol": "4 years (TCPA)",
    "af": "Varies",
    "rng": {
      "lo": 9,
      "md": 45,
      "hi": 377
    },
    "rp": 1.8,
    "ps": {
      "wr": 11.6,
      "total": 161442
    },
    "rr": {
      "wr": 49.1,
      "total": 370354
    },
    "cw": 39.6,
    "ends": [
      {
        "l": "Settlement",
        "p": 35.1,
        "c": "#0D9488",
        "n": 186513
      },
      {
        "l": "Dismissed",
        "p": 25.8,
        "c": "#94A3B8",
        "n": 137241
      },
      {
        "l": "Summary Judgment",
        "p": 16.7,
        "c": "#D97706",
        "n": 89040
      },
      {
        "l": "Other",
        "p": 10.6,
        "c": "#475569",
        "n": 56160
      },
      {
        "l": "Trial",
        "p": 3.6,
        "c": "#7C3AED",
        "n": 18890
      },
      {
        "l": "Consent",
        "p": 0.7,
        "c": "#2563EB",
        "n": 3922
      },
      {
        "l": "Default Judgment",
        "p": 0.2,
        "c": "#DB2777",
        "n": 1280
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 98.2,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 1.8,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 1.3,
      "trial_loss": 2.2,
      "dismiss": 42.6,
      "fav_set": 35.1,
      "set_mo": 10,
      "trial_med": "$100"
    },
    "circuit_rates": {
      "3": 49.8,
      "9": 38.2,
      "4": 27.3,
      "6": 36.2,
      "5": 33.9,
      "7": 42.3,
      "8": 34.1,
      "10": 40.6,
      "11": 31.2,
      "2": 40.8,
      "dc": 18.5,
      "1": 35.9
    },
    "state_rates": {
      "PA": 56.3,
      "CA": 41.0,
      "MD": 25.9,
      "NC": 28.0,
      "SC": 30.9,
      "VA": 23.8,
      "KY": 30.2,
      "WV": 30.6,
      "LA": 37.5,
      "MS": 44.5,
      "TX": 29.5,
      "MI": 41.8,
      "OH": 34.7,
      "TN": 33.8,
      "IL": 49.7,
      "IN": 36.1,
      "WI": 23.3,
      "AR": 39.4,
      "IA": 34.2,
      "MO": 33.6,
      "NE": 25.0,
      "ND": 23.4,
      "AZ": 27.6,
      "HI": 63.3,
      "MT": 26.9,
      "NV": 23.9,
      "OR": 34.4,
      "WA": 32.9,
      "CO": 32.0,
      "NM": 51.4,
      "OK": 41.7,
      "UT": 32.4,
      "WY": 47.8,
      "AL": 27.4,
      "FL": 34.1,
      "GA": 28.3,
      "NY": 41.2,
      "DC": 18.5,
      "ME": 34.6,
      "MA": 34.7,
      "NH": 31.1,
      "RI": 38.5,
      "PR": 40.4,
      "CT": 38.3,
      "VT": 37.4,
      "DE": 24.2,
      "NJ": 38.8,
      "MN": 36.2,
      "AK": 20.6,
      "ID": 34.9,
      "KS": 41.4,
      "SD": 26.9,
      "VI": 31.3,
      "GU": 30.9
    },
    "yearly_trend": {
      "1990": {
        "total": 9990,
        "wr": 40.1
      },
      "1991": {
        "total": 11014,
        "wr": 41.1
      },
      "1992": {
        "total": 12661,
        "wr": 39.9
      },
      "1993": {
        "total": 13962,
        "wr": 39.9
      },
      "1994": {
        "total": 15882,
        "wr": 39.3
      },
      "1995": {
        "total": 16395,
        "wr": 39.2
      },
      "1996": {
        "total": 17863,
        "wr": 40.0
      },
      "1997": {
        "total": 18031,
        "wr": 41.8
      },
      "1998": {
        "total": 17419,
        "wr": 42.8
      },
      "1999": {
        "total": 17711,
        "wr": 42.6
      },
      "2000": {
        "total": 18256,
        "wr": 44.1
      },
      "2001": {
        "total": 17806,
        "wr": 44.0
      },
      "2002": {
        "total": 17875,
        "wr": 42.4
      },
      "2003": {
        "total": 18552,
        "wr": 44.1
      },
      "2004": {
        "total": 18332,
        "wr": 43.2
      },
      "2005": {
        "total": 15708,
        "wr": 39.9
      },
      "2006": {
        "total": 15310,
        "wr": 39.8
      },
      "2007": {
        "total": 15094,
        "wr": 39.9
      },
      "2008": {
        "total": 15215,
        "wr": 39.8
      },
      "2009": {
        "total": 15527,
        "wr": 39.7
      },
      "2010": {
        "total": 15580,
        "wr": 39.8
      },
      "2011": {
        "total": 16237,
        "wr": 37.8
      },
      "2012": {
        "total": 16474,
        "wr": 39.0
      },
      "2013": {
        "total": 15500,
        "wr": 38.8
      },
      "2014": {
        "total": 15826,
        "wr": 37.8
      },
      "2015": {
        "total": 16021,
        "wr": 36.6
      },
      "2016": {
        "total": 14553,
        "wr": 34.4
      },
      "2017": {
        "total": 14375,
        "wr": 31.8
      },
      "2018": {
        "total": 13326,
        "wr": 30.4
      },
      "2019": {
        "total": 11782,
        "wr": 27.2
      },
      "2020": {
        "total": 8390,
        "wr": 26.0
      },
      "2021": {
        "total": 1799,
        "wr": 17.6
      }
    },
    "data_date": "2026-03-19T19:31:50.629389",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 6,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 8,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "863": {
    "nos_code": "863",
    "label": "Social Security",
    "category": "gov",
    "sub": "disability benefits",
    "total": 268353,
    "mo": 11,
    "wr": 9.8,
    "sp": 3.2,
    "sol": "60 days (Social Security)",
    "af": "Varies",
    "rng": {
      "lo": 1,
      "md": 4,
      "hi": 203
    },
    "rp": 0.1,
    "ps": {
      "wr": 7.4,
      "total": 14528
    },
    "rr": {
      "wr": 9.9,
      "total": 253825
    },
    "cw": 10.3,
    "ends": [
      {
        "l": "Other",
        "p": 36.7,
        "c": "#475569",
        "n": 98440
      },
      {
        "l": "Summary Judgment",
        "p": 19.1,
        "c": "#D97706",
        "n": 51152
      },
      {
        "l": "Dismissed",
        "p": 8.2,
        "c": "#94A3B8",
        "n": 22139
      },
      {
        "l": "Settlement",
        "p": 3.2,
        "c": "#0D9488",
        "n": 8471
      },
      {
        "l": "Consent",
        "p": 0.3,
        "c": "#2563EB",
        "n": 712
      },
      {
        "l": "Trial",
        "p": 0.1,
        "c": "#7C3AED",
        "n": 371
      },
      {
        "l": "Default Judgment",
        "p": 0.1,
        "c": "#DB2777",
        "n": 236
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 99.9,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 0.1,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 0.0,
      "trial_loss": 0.1,
      "dismiss": 27.3,
      "fav_set": 3.2,
      "set_mo": 6,
      "trial_med": "$24"
    },
    "circuit_rates": {
      "5": 7.6,
      "3": 12.5,
      "4": 9.0,
      "6": 8.1,
      "2": 10.3,
      "7": 9.0,
      "8": 11.7,
      "9": 11.6,
      "10": 9.4,
      "11": 8.3,
      "1": 9.1,
      "dc": 10.7
    },
    "state_rates": {
      "TX": 6.6,
      "PA": 16.5,
      "MD": 6.2,
      "NC": 9.3,
      "SC": 14.4,
      "VA": 6.0,
      "WV": 7.6,
      "LA": 7.8,
      "KY": 6.3,
      "MS": 10.8,
      "MI": 11.2,
      "NY": 10.2,
      "OH": 7.7,
      "TN": 6.0,
      "IL": 11.3,
      "IN": 5.3,
      "WI": 11.6,
      "AR": 10.2,
      "IA": 35.8,
      "MN": 9.2,
      "MO": 7.8,
      "NE": 10.6,
      "SD": 12.4,
      "CA": 10.7,
      "ID": 4.2,
      "WA": 18.9,
      "KS": 11.6,
      "NM": 14.0,
      "OK": 4.5,
      "AL": 3.3,
      "FL": 8.7,
      "GA": 12.2,
      "MA": 11.8,
      "PR": 4.0,
      "NJ": 4.5,
      "MT": 14.0,
      "OR": 8.2,
      "CO": 16.6,
      "DE": 16.8,
      "RI": 14.8,
      "CT": 13.9,
      "VT": 7.2,
      "ND": 8.9,
      "ME": 13.9,
      "NH": 13.0,
      "AZ": 7.3,
      "DC": 10.7,
      "UT": 6.7,
      "NV": 8.5,
      "AK": 12.2,
      "WY": 15.1,
      "HI": 7.3
    },
    "yearly_trend": {
      "1990": {
        "total": 4575,
        "wr": 11.6
      },
      "1991": {
        "total": 5924,
        "wr": 11.5
      },
      "1992": {
        "total": 6286,
        "wr": 10.4
      },
      "1993": {
        "total": 7493,
        "wr": 9.2
      },
      "1994": {
        "total": 6552,
        "wr": 9.1
      },
      "1995": {
        "total": 4884,
        "wr": 9.9
      },
      "1996": {
        "total": 5796,
        "wr": 10.0
      },
      "1997": {
        "total": 7531,
        "wr": 10.7
      },
      "1998": {
        "total": 7966,
        "wr": 9.8
      },
      "1999": {
        "total": 6976,
        "wr": 10.0
      },
      "2000": {
        "total": 8914,
        "wr": 10.3
      },
      "2001": {
        "total": 8405,
        "wr": 11.2
      },
      "2002": {
        "total": 8670,
        "wr": 10.8
      },
      "2003": {
        "total": 7580,
        "wr": 10.7
      },
      "2004": {
        "total": 7131,
        "wr": 11.7
      },
      "2005": {
        "total": 6773,
        "wr": 11.8
      },
      "2006": {
        "total": 6321,
        "wr": 11.8
      },
      "2007": {
        "total": 6287,
        "wr": 10.3
      },
      "2008": {
        "total": 5994,
        "wr": 9.6
      },
      "2009": {
        "total": 6263,
        "wr": 9.6
      },
      "2010": {
        "total": 6437,
        "wr": 10.0
      },
      "2011": {
        "total": 6719,
        "wr": 8.8
      },
      "2012": {
        "total": 7719,
        "wr": 9.1
      },
      "2013": {
        "total": 8395,
        "wr": 8.3
      },
      "2014": {
        "total": 8718,
        "wr": 8.5
      },
      "2015": {
        "total": 8407,
        "wr": 8.7
      },
      "2016": {
        "total": 8763,
        "wr": 8.8
      },
      "2017": {
        "total": 9307,
        "wr": 8.8
      },
      "2018": {
        "total": 9460,
        "wr": 8.7
      },
      "2019": {
        "total": 8858,
        "wr": 8.4
      },
      "2020": {
        "total": 4268,
        "wr": 10.7
      },
      "2021": {
        "total": 218,
        "wr": 16.5
      }
    },
    "data_date": "2026-03-19T19:31:50.642158",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 6,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 8,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 11,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "220": {
    "nos_code": "220",
    "label": "Foreclosure",
    "category": "housing",
    "sub": "foreclosure",
    "total": 168632,
    "mo": 5,
    "wr": 70.3,
    "sp": 22.3,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 31,
      "md": 53,
      "hi": 565
    },
    "rp": 14.3,
    "ps": {
      "wr": 26.8,
      "total": 23206
    },
    "rr": {
      "wr": 77.2,
      "total": 145426
    },
    "cw": 73.8,
    "ends": [
      {
        "l": "Default Judgment",
        "p": 39.3,
        "c": "#DB2777",
        "n": 66346
      },
      {
        "l": "Settlement",
        "p": 22.3,
        "c": "#0D9488",
        "n": 37553
      },
      {
        "l": "Dismissed",
        "p": 12.8,
        "c": "#94A3B8",
        "n": 21553
      },
      {
        "l": "Summary Judgment",
        "p": 11.0,
        "c": "#D97706",
        "n": 18607
      },
      {
        "l": "Other",
        "p": 5.6,
        "c": "#475569",
        "n": 9456
      },
      {
        "l": "Consent",
        "p": 1.9,
        "c": "#2563EB",
        "n": 3235
      },
      {
        "l": "Trial",
        "p": 0.2,
        "c": "#7C3AED",
        "n": 371
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 85.7,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 5.9,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 0.2,
      "trial_loss": 0.1,
      "dismiss": 23.8,
      "fav_set": 22.3,
      "set_mo": 5,
      "trial_med": "$365"
    },
    "circuit_rates": {
      "3": 78.1,
      "4": 70.1,
      "5": 58.4,
      "6": 70.4,
      "7": 87.1,
      "8": 84.8,
      "9": 33.5,
      "10": 81.3,
      "11": 46.4,
      "1": 74.7,
      "2": 70.1,
      "dc": 19.2
    },
    "state_rates": {
      "PA": 84.3,
      "VI": 63.2,
      "MD": 40.0,
      "SC": 76.2,
      "LA": 88.0,
      "TX": 37.8,
      "KY": 85.8,
      "MI": 38.5,
      "OH": 68.5,
      "IL": 88.8,
      "IN": 78.1,
      "WI": 85.5,
      "AR": 89.6,
      "IA": 85.9,
      "MN": 49.5,
      "NE": 83.7,
      "ND": 92.6,
      "AZ": 33.6,
      "CA": 23.2,
      "ID": 70.7,
      "MT": 74.0,
      "NV": 31.2,
      "WA": 48.5,
      "CO": 36.4,
      "KS": 85.2,
      "NM": 75.5,
      "OK": 84.1,
      "FL": 67.1,
      "GA": 26.0,
      "ME": 80.4,
      "MA": 43.4,
      "PR": 80.9,
      "CT": 74.3,
      "NY": 66.8,
      "DE": 78.5,
      "NJ": 59.4,
      "NC": 24.1,
      "MS": 47.9,
      "TN": 21.7,
      "AK": 59.9,
      "HI": 51.6,
      "UT": 58.7,
      "AL": 42.5,
      "DC": 19.2,
      "VT": 87.1,
      "VA": 31.2,
      "SD": 75.9,
      "OR": 61.7,
      "WV": 43.8,
      "WY": 67.7,
      "MO": 38.2,
      "NH": 39.0,
      "RI": 62.2
    },
    "yearly_trend": {
      "1990": {
        "total": 7057,
        "wr": 87.9
      },
      "1991": {
        "total": 7726,
        "wr": 86.1
      },
      "1992": {
        "total": 7325,
        "wr": 85.9
      },
      "1993": {
        "total": 5477,
        "wr": 83.9
      },
      "1994": {
        "total": 5563,
        "wr": 83.4
      },
      "1995": {
        "total": 4645,
        "wr": 83.3
      },
      "1996": {
        "total": 4456,
        "wr": 83.5
      },
      "1997": {
        "total": 3562,
        "wr": 83.6
      },
      "1998": {
        "total": 3842,
        "wr": 85.8
      },
      "1999": {
        "total": 4411,
        "wr": 86.7
      },
      "2000": {
        "total": 4121,
        "wr": 84.4
      },
      "2001": {
        "total": 4657,
        "wr": 84.9
      },
      "2002": {
        "total": 5731,
        "wr": 83.8
      },
      "2003": {
        "total": 5122,
        "wr": 81.4
      },
      "2004": {
        "total": 3909,
        "wr": 70.4
      },
      "2005": {
        "total": 2833,
        "wr": 63.3
      },
      "2006": {
        "total": 2314,
        "wr": 66.4
      },
      "2007": {
        "total": 3312,
        "wr": 60.9
      },
      "2008": {
        "total": 2020,
        "wr": 54.4
      },
      "2009": {
        "total": 3301,
        "wr": 43.0
      },
      "2010": {
        "total": 4959,
        "wr": 40.1
      },
      "2011": {
        "total": 7626,
        "wr": 46.6
      },
      "2012": {
        "total": 7785,
        "wr": 46.4
      },
      "2013": {
        "total": 5586,
        "wr": 46.5
      },
      "2014": {
        "total": 3900,
        "wr": 46.0
      },
      "2015": {
        "total": 4508,
        "wr": 52.7
      },
      "2016": {
        "total": 4518,
        "wr": 56.0
      },
      "2017": {
        "total": 3534,
        "wr": 52.9
      },
      "2018": {
        "total": 2926,
        "wr": 51.2
      },
      "2019": {
        "total": 2522,
        "wr": 48.6
      },
      "2020": {
        "total": 983,
        "wr": 45.2
      },
      "2021": {
        "total": 126,
        "wr": 38.1
      }
    },
    "data_date": "2026-03-19T19:31:50.669080",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 1,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 2,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 4,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 5,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "442": {
    "nos_code": "442",
    "label": "Employment",
    "category": "work",
    "sub": "employment discrimination",
    "total": 525264,
    "mo": 11,
    "wr": 52.2,
    "sp": 49.6,
    "sol": "300 days (EEOC) + 90 days",
    "af": "33-40% contingency",
    "rng": {
      "lo": 20,
      "md": 79,
      "hi": 350
    },
    "rp": 2.0,
    "ps": {
      "wr": 25.1,
      "total": 81151
    },
    "rr": {
      "wr": 57.1,
      "total": 444113
    },
    "cw": 54.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 49.6,
        "c": "#0D9488",
        "n": 260576
      },
      {
        "l": "Dismissed",
        "p": 16.9,
        "c": "#94A3B8",
        "n": 88638
      },
      {
        "l": "Summary Judgment",
        "p": 15.9,
        "c": "#D97706",
        "n": 83487
      },
      {
        "l": "Other",
        "p": 7.2,
        "c": "#475569",
        "n": 38007
      },
      {
        "l": "Trial",
        "p": 3.8,
        "c": "#7C3AED",
        "n": 20073
      },
      {
        "l": "Consent",
        "p": 1.0,
        "c": "#2563EB",
        "n": 5327
      },
      {
        "l": "Default Judgment",
        "p": 0.3,
        "c": "#DB2777",
        "n": 1525
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 98.0,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 1.9,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 2.0,
      "trial_loss": 1.8,
      "dismiss": 32.8,
      "fav_set": 49.6,
      "set_mo": 11,
      "trial_med": "$130"
    },
    "circuit_rates": {
      "3": 64.7,
      "5": 45.8,
      "4": 47.4,
      "9": 52.1,
      "6": 50.2,
      "7": 56.6,
      "8": 55.2,
      "10": 61.6,
      "11": 50.6,
      "dc": 35.3,
      "1": 56.3,
      "2": 44.2
    },
    "state_rates": {
      "PA": 68.8,
      "TX": 44.0,
      "MD": 38.8,
      "NC": 51.6,
      "SC": 59.1,
      "VA": 42.9,
      "CA": 49.7,
      "WV": 44.0,
      "KY": 47.6,
      "LA": 47.9,
      "MI": 55.9,
      "MS": 51.3,
      "OH": 50.1,
      "TN": 46.9,
      "IL": 55.7,
      "IN": 60.7,
      "WI": 47.5,
      "AR": 48.4,
      "IA": 63.3,
      "MN": 60.5,
      "MO": 53.1,
      "NE": 58.4,
      "HI": 54.7,
      "ID": 62.2,
      "MT": 55.6,
      "NV": 52.9,
      "OR": 61.8,
      "WA": 53.3,
      "CO": 62.4,
      "KS": 60.7,
      "NM": 63.9,
      "OK": 62.1,
      "UT": 53.5,
      "AL": 46.4,
      "FL": 55.9,
      "GA": 47.4,
      "DC": 35.3,
      "MA": 52.2,
      "RI": 67.5,
      "PR": 52.9,
      "CT": 57.3,
      "NY": 41.6,
      "DE": 47.9,
      "NJ": 57.6,
      "AK": 39.1,
      "AZ": 52.3,
      "WY": 64.5,
      "ME": 68.5,
      "VT": 70.3,
      "SD": 59.1,
      "NH": 61.1,
      "GU": 51.6,
      "ND": 49.0,
      "VI": 40.2
    },
    "yearly_trend": {
      "1990": {
        "total": 8107,
        "wr": 50.2
      },
      "1991": {
        "total": 9121,
        "wr": 50.6
      },
      "1992": {
        "total": 11237,
        "wr": 51.1
      },
      "1993": {
        "total": 13498,
        "wr": 53.4
      },
      "1994": {
        "total": 16523,
        "wr": 53.6
      },
      "1995": {
        "total": 20436,
        "wr": 53.6
      },
      "1996": {
        "total": 22900,
        "wr": 52.9
      },
      "1997": {
        "total": 24101,
        "wr": 53.5
      },
      "1998": {
        "total": 23217,
        "wr": 54.2
      },
      "1999": {
        "total": 22317,
        "wr": 54.8
      },
      "2000": {
        "total": 21083,
        "wr": 55.0
      },
      "2001": {
        "total": 20937,
        "wr": 54.8
      },
      "2002": {
        "total": 20774,
        "wr": 53.3
      },
      "2003": {
        "total": 19897,
        "wr": 53.0
      },
      "2004": {
        "total": 19167,
        "wr": 52.2
      },
      "2005": {
        "total": 15941,
        "wr": 52.5
      },
      "2006": {
        "total": 13969,
        "wr": 53.5
      },
      "2007": {
        "total": 13022,
        "wr": 54.3
      },
      "2008": {
        "total": 13342,
        "wr": 54.2
      },
      "2009": {
        "total": 14042,
        "wr": 55.9
      },
      "2010": {
        "total": 14966,
        "wr": 55.2
      },
      "2011": {
        "total": 15190,
        "wr": 55.6
      },
      "2012": {
        "total": 14623,
        "wr": 55.8
      },
      "2013": {
        "total": 12611,
        "wr": 56.6
      },
      "2014": {
        "total": 12126,
        "wr": 56.3
      },
      "2015": {
        "total": 11780,
        "wr": 57.2
      },
      "2016": {
        "total": 11743,
        "wr": 58.1
      },
      "2017": {
        "total": 12017,
        "wr": 58.8
      },
      "2018": {
        "total": 11973,
        "wr": 59.0
      },
      "2019": {
        "total": 10106,
        "wr": 60.5
      },
      "2020": {
        "total": 5994,
        "wr": 60.3
      },
      "2021": {
        "total": 681,
        "wr": 49.8
      }
    },
    "data_date": "2026-03-19T19:31:50.699433",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 6,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 8,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 11,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "370": {
    "nos_code": "370",
    "label": "Fraud/Truth in Lending",
    "category": "injury",
    "sub": "fraud",
    "total": 64755,
    "mo": 8,
    "wr": 46.5,
    "sp": 39.5,
    "sol": "2-4 years",
    "af": "Contingency or hourly",
    "rng": {
      "lo": 50,
      "md": 252,
      "hi": 1758
    },
    "rp": 5.4,
    "ps": {
      "wr": 23.0,
      "total": 9703
    },
    "rr": {
      "wr": 50.6,
      "total": 55052
    },
    "cw": 48.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 39.5,
        "c": "#0D9488",
        "n": 25576
      },
      {
        "l": "Dismissed",
        "p": 21.4,
        "c": "#94A3B8",
        "n": 13886
      },
      {
        "l": "Other",
        "p": 12.0,
        "c": "#475569",
        "n": 7771
      },
      {
        "l": "Summary Judgment",
        "p": 9.7,
        "c": "#D97706",
        "n": 6298
      },
      {
        "l": "Default Judgment",
        "p": 2.7,
        "c": "#DB2777",
        "n": 1721
      },
      {
        "l": "Trial",
        "p": 2.0,
        "c": "#7C3AED",
        "n": 1267
      },
      {
        "l": "Consent",
        "p": 1.5,
        "c": "#2563EB",
        "n": 968
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 94.6,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 5.4,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 0.9,
      "trial_loss": 1.0,
      "dismiss": 31.2,
      "fav_set": 39.5,
      "set_mo": 9,
      "trial_med": "$365"
    },
    "circuit_rates": {
      "3": 52.1,
      "4": 55.3,
      "5": 42.6,
      "6": 45.7,
      "7": 47.5,
      "8": 55.5,
      "9": 40.6,
      "10": 50.3,
      "11": 44.9,
      "dc": 35.8,
      "1": 43.8,
      "2": 44.1
    },
    "state_rates": {
      "PA": 60.8,
      "VI": 32.5,
      "MD": 39.1,
      "NC": 44.4,
      "WV": 69.2,
      "MS": 46.8,
      "TX": 41.6,
      "KY": 45.0,
      "MI": 47.2,
      "OH": 43.4,
      "TN": 47.9,
      "IL": 47.8,
      "WI": 37.6,
      "AR": 40.0,
      "MO": 50.1,
      "NE": 54.3,
      "AZ": 40.6,
      "CA": 39.2,
      "HI": 55.2,
      "ID": 45.1,
      "NV": 38.7,
      "OR": 50.0,
      "KS": 56.5,
      "AL": 33.3,
      "FL": 38.7,
      "GA": 60.0,
      "DC": 35.8,
      "MA": 40.6,
      "CT": 55.9,
      "NY": 42.2,
      "NJ": 46.6,
      "SC": 66.5,
      "LA": 43.4,
      "IN": 54.1,
      "IA": 47.7,
      "MN": 63.2,
      "WA": 43.5,
      "OK": 52.3,
      "UT": 45.1,
      "WY": 38.7,
      "RI": 50.0,
      "VT": 48.9,
      "VA": 47.4,
      "ND": 45.6,
      "MT": 50.8,
      "CO": 47.1,
      "NM": 50.5,
      "SD": 58.9,
      "NH": 55.6,
      "DE": 42.6,
      "AK": 30.7,
      "ME": 52.1,
      "PR": 42.4
    },
    "yearly_trend": {
      "1990": {
        "total": 1359,
        "wr": 55.6
      },
      "1991": {
        "total": 1381,
        "wr": 55.5
      },
      "1992": {
        "total": 1484,
        "wr": 56.7
      },
      "1993": {
        "total": 1425,
        "wr": 54.4
      },
      "1994": {
        "total": 1402,
        "wr": 51.1
      },
      "1995": {
        "total": 1557,
        "wr": 51.6
      },
      "1996": {
        "total": 1971,
        "wr": 51.2
      },
      "1997": {
        "total": 2075,
        "wr": 48.9
      },
      "1998": {
        "total": 1802,
        "wr": 49.0
      },
      "1999": {
        "total": 1673,
        "wr": 49.7
      },
      "2000": {
        "total": 1708,
        "wr": 50.2
      },
      "2001": {
        "total": 1615,
        "wr": 53.3
      },
      "2002": {
        "total": 1748,
        "wr": 50.2
      },
      "2003": {
        "total": 3854,
        "wr": 65.6
      },
      "2004": {
        "total": 1859,
        "wr": 52.8
      },
      "2005": {
        "total": 1837,
        "wr": 42.5
      },
      "2006": {
        "total": 1441,
        "wr": 47.2
      },
      "2007": {
        "total": 1410,
        "wr": 47.3
      },
      "2008": {
        "total": 1560,
        "wr": 47.0
      },
      "2009": {
        "total": 2089,
        "wr": 45.5
      },
      "2010": {
        "total": 1866,
        "wr": 43.6
      },
      "2011": {
        "total": 1954,
        "wr": 42.7
      },
      "2012": {
        "total": 1838,
        "wr": 42.0
      },
      "2013": {
        "total": 1705,
        "wr": 46.3
      },
      "2014": {
        "total": 1730,
        "wr": 45.1
      },
      "2015": {
        "total": 2504,
        "wr": 38.7
      },
      "2016": {
        "total": 2453,
        "wr": 40.2
      },
      "2017": {
        "total": 2125,
        "wr": 43.6
      },
      "2018": {
        "total": 1784,
        "wr": 44.5
      },
      "2019": {
        "total": 1660,
        "wr": 46.3
      },
      "2020": {
        "total": 1295,
        "wr": 48.5
      },
      "2021": {
        "total": 272,
        "wr": 44.5
      }
    },
    "data_date": "2026-03-19T19:31:50.718961",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 6,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 8,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "195": {
    "nos_code": "195",
    "label": "Construction",
    "category": "housing",
    "sub": "construction defect",
    "total": 12227,
    "mo": 10,
    "wr": 53.0,
    "sp": 47.5,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 44,
      "md": 166,
      "hi": 1054
    },
    "rp": 5.0,
    "ps": {
      "wr": 28.3,
      "total": 325
    },
    "rr": {
      "wr": 53.6,
      "total": 11902
    },
    "cw": 55.7,
    "ends": [
      {
        "l": "Settlement",
        "p": 47.5,
        "c": "#0D9488",
        "n": 5808
      },
      {
        "l": "Dismissed",
        "p": 16.5,
        "c": "#94A3B8",
        "n": 2013
      },
      {
        "l": "Other",
        "p": 10.7,
        "c": "#475569",
        "n": 1313
      },
      {
        "l": "Summary Judgment",
        "p": 5.5,
        "c": "#D97706",
        "n": 668
      },
      {
        "l": "Trial",
        "p": 2.5,
        "c": "#7C3AED",
        "n": 304
      },
      {
        "l": "Default Judgment",
        "p": 1.9,
        "c": "#DB2777",
        "n": 228
      },
      {
        "l": "Consent",
        "p": 1.1,
        "c": "#2563EB",
        "n": 133
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 95.0,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 5.0,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 1.3,
      "trial_loss": 1.2,
      "dismiss": 21.9,
      "fav_set": 47.5,
      "set_mo": 13,
      "trial_med": "$298"
    },
    "circuit_rates": {
      "3": 63.4,
      "4": 57.6,
      "5": 48.8,
      "6": 56.8,
      "7": 54.4,
      "8": 59.7,
      "9": 49.1,
      "10": 61.1,
      "11": 47.5,
      "1": 53.1,
      "2": 48.7,
      "dc": 37.8
    },
    "state_rates": {
      "PA": 66.7,
      "MD": 45.0,
      "SC": 67.7,
      "VA": 57.3,
      "WV": 50.9,
      "LA": 54.7,
      "MS": 53.1,
      "TX": 43.6,
      "MI": 58.0,
      "OH": 57.6,
      "TN": 54.1,
      "IL": 51.9,
      "IN": 59.8,
      "WI": 55.8,
      "MN": 53.5,
      "CA": 48.8,
      "OK": 58.4,
      "GA": 58.0,
      "MA": 47.8,
      "NY": 45.6,
      "AZ": 58.9,
      "KS": 58.5,
      "AL": 44.4,
      "FL": 46.2,
      "NJ": 60.8,
      "VI": 43.3,
      "NC": 59.0,
      "KY": 54.6,
      "IA": 52.7,
      "SD": 68.0,
      "NV": 50.0,
      "WA": 42.9,
      "CO": 65.1,
      "UT": 60.9,
      "AK": 52.6,
      "MO": 60.3,
      "VT": 55.6,
      "AR": 63.1,
      "OR": 55.7,
      "NM": 65.2,
      "DC": 37.8,
      "RI": 62.5,
      "CT": 71.8,
      "PR": 61.1,
      "HI": 48.9,
      "MT": 71.4,
      "ND": 66.7,
      "DE": 48.3,
      "ME": 69.7,
      "ID": 50.9,
      "NE": 64.3,
      "NH": 55.6
    },
    "yearly_trend": {
      "1990": {
        "total": 363,
        "wr": 59.2
      },
      "1991": {
        "total": 299,
        "wr": 66.2
      },
      "1992": {
        "total": 293,
        "wr": 62.1
      },
      "1993": {
        "total": 283,
        "wr": 58.3
      },
      "1994": {
        "total": 230,
        "wr": 64.3
      },
      "1995": {
        "total": 247,
        "wr": 62.8
      },
      "1996": {
        "total": 283,
        "wr": 54.8
      },
      "1997": {
        "total": 296,
        "wr": 59.1
      },
      "1998": {
        "total": 304,
        "wr": 56.9
      },
      "1999": {
        "total": 292,
        "wr": 59.6
      },
      "2000": {
        "total": 347,
        "wr": 54.5
      },
      "2001": {
        "total": 284,
        "wr": 57.4
      },
      "2002": {
        "total": 287,
        "wr": 64.5
      },
      "2003": {
        "total": 297,
        "wr": 52.5
      },
      "2004": {
        "total": 250,
        "wr": 56.4
      },
      "2005": {
        "total": 226,
        "wr": 60.2
      },
      "2006": {
        "total": 259,
        "wr": 58.3
      },
      "2007": {
        "total": 253,
        "wr": 51.0
      },
      "2008": {
        "total": 207,
        "wr": 58.5
      },
      "2009": {
        "total": 255,
        "wr": 59.2
      },
      "2010": {
        "total": 287,
        "wr": 46.0
      },
      "2011": {
        "total": 224,
        "wr": 62.9
      },
      "2012": {
        "total": 243,
        "wr": 54.7
      },
      "2013": {
        "total": 204,
        "wr": 55.4
      },
      "2014": {
        "total": 244,
        "wr": 57.0
      },
      "2015": {
        "total": 422,
        "wr": 40.8
      },
      "2016": {
        "total": 230,
        "wr": 52.6
      },
      "2017": {
        "total": 296,
        "wr": 38.9
      },
      "2018": {
        "total": 1401,
        "wr": 63.3
      },
      "2019": {
        "total": 358,
        "wr": 43.6
      },
      "2020": {
        "total": 336,
        "wr": 45.8
      },
      "2021": {
        "total": 40,
        "wr": 35.0
      }
    },
    "data_date": "2026-03-19T19:31:50.724386",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 8,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 10,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "230": {
    "nos_code": "230",
    "label": "Rent/Lease",
    "category": "housing",
    "sub": "landlord dispute",
    "total": 14493,
    "mo": 2,
    "wr": 31.2,
    "sp": 21.8,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 5,
      "md": 82,
      "hi": 401
    },
    "rp": 5.1,
    "ps": {
      "wr": 2.5,
      "total": 7505
    },
    "rr": {
      "wr": 62.1,
      "total": 6988
    },
    "cw": 32.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 21.8,
        "c": "#0D9488",
        "n": 3166
      },
      {
        "l": "Dismissed",
        "p": 13.4,
        "c": "#94A3B8",
        "n": 1935
      },
      {
        "l": "Other",
        "p": 5.1,
        "c": "#475569",
        "n": 736
      },
      {
        "l": "Default Judgment",
        "p": 5.0,
        "c": "#DB2777",
        "n": 725
      },
      {
        "l": "Summary Judgment",
        "p": 4.8,
        "c": "#D97706",
        "n": 694
      },
      {
        "l": "Consent",
        "p": 1.3,
        "c": "#2563EB",
        "n": 187
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 171
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 94.9,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 5.1,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 0.4,
      "trial_loss": 0.8,
      "dismiss": 18.1,
      "fav_set": 21.8,
      "set_mo": 6,
      "trial_med": "$201"
    },
    "circuit_rates": {
      "3": 63.0,
      "4": 51.1,
      "5": 46.7,
      "6": 47.8,
      "8": 66.4,
      "9": 19.4,
      "10": 53.6,
      "11": 12.5,
      "1": 55.4,
      "7": 62.7,
      "dc": 44.0,
      "2": 47.3
    },
    "state_rates": {
      "PA": 69.2,
      "MD": 48.5,
      "VA": 51.9,
      "MS": 77.0,
      "KY": 44.0,
      "MI": 51.7,
      "TN": 42.0,
      "NE": 65.7,
      "ND": 78.0,
      "CA": 16.3,
      "OK": 48.3,
      "AL": 67.7,
      "GA": 5.0,
      "MA": 58.3,
      "NJ": 54.6,
      "WV": 59.6,
      "LA": 57.5,
      "TX": 29.2,
      "OH": 49.7,
      "IL": 62.2,
      "FL": 33.1,
      "DC": 44.0,
      "CT": 60.6,
      "NY": 44.1,
      "SC": 48.6,
      "AR": 51.3,
      "IN": 62.6,
      "AZ": 41.3,
      "OR": 45.8,
      "NC": 53.3,
      "RI": 46.2,
      "SD": 52.2,
      "HI": 48.8,
      "KS": 53.2,
      "MN": 68.4,
      "UT": 46.1,
      "CO": 56.8,
      "MO": 73.5,
      "VI": 36.1,
      "ME": 64.0,
      "WI": 65.9,
      "WA": 46.6,
      "ID": 51.3,
      "NV": 40.8,
      "MT": 51.4,
      "NM": 62.5,
      "IA": 55.6,
      "NH": 43.8,
      "PR": 54.3,
      "AK": 65.6,
      "DE": 50.0
    },
    "yearly_trend": {
      "1990": {
        "total": 348,
        "wr": 63.8
      },
      "1991": {
        "total": 412,
        "wr": 69.7
      },
      "1992": {
        "total": 381,
        "wr": 65.6
      },
      "1993": {
        "total": 317,
        "wr": 69.4
      },
      "1994": {
        "total": 293,
        "wr": 61.4
      },
      "1995": {
        "total": 291,
        "wr": 64.3
      },
      "1996": {
        "total": 300,
        "wr": 62.0
      },
      "1997": {
        "total": 235,
        "wr": 67.2
      },
      "1998": {
        "total": 208,
        "wr": 64.4
      },
      "1999": {
        "total": 191,
        "wr": 59.2
      },
      "2000": {
        "total": 181,
        "wr": 62.4
      },
      "2001": {
        "total": 194,
        "wr": 55.2
      },
      "2002": {
        "total": 201,
        "wr": 52.2
      },
      "2003": {
        "total": 192,
        "wr": 52.1
      },
      "2004": {
        "total": 132,
        "wr": 56.1
      },
      "2005": {
        "total": 154,
        "wr": 46.1
      },
      "2006": {
        "total": 133,
        "wr": 49.6
      },
      "2007": {
        "total": 141,
        "wr": 44.7
      },
      "2008": {
        "total": 166,
        "wr": 63.3
      },
      "2009": {
        "total": 199,
        "wr": 53.3
      },
      "2010": {
        "total": 284,
        "wr": 27.8
      },
      "2011": {
        "total": 374,
        "wr": 19.8
      },
      "2012": {
        "total": 673,
        "wr": 11.7
      },
      "2013": {
        "total": 536,
        "wr": 13.2
      },
      "2014": {
        "total": 774,
        "wr": 8.3
      },
      "2015": {
        "total": 757,
        "wr": 10.0
      },
      "2016": {
        "total": 1024,
        "wr": 4.5
      },
      "2017": {
        "total": 1023,
        "wr": 7.4
      },
      "2018": {
        "total": 1075,
        "wr": 7.1
      },
      "2019": {
        "total": 1086,
        "wr": 8.3
      },
      "2020": {
        "total": 504,
        "wr": 19.6
      },
      "2021": {
        "total": 135,
        "wr": 11.1
      }
    },
    "data_date": "2026-03-19T19:31:50.729507",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 0,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 1,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 2,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 2,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "710": {
    "nos_code": "710",
    "label": "FLSA",
    "category": "work",
    "sub": "unpaid wages",
    "total": 148241,
    "mo": 8,
    "wr": 70.7,
    "sp": 61.8,
    "sol": "2-3 years (FLSA)",
    "af": "33% contingency (fee-shifting under FLSA)",
    "rng": {
      "lo": 12,
      "md": 39,
      "hi": 217
    },
    "rp": 5.8,
    "ps": {
      "wr": 51.7,
      "total": 7371
    },
    "rr": {
      "wr": 71.7,
      "total": 140870
    },
    "cw": 74.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 61.8,
        "c": "#0D9488",
        "n": 91651
      },
      {
        "l": "Dismissed",
        "p": 13.3,
        "c": "#94A3B8",
        "n": 19695
      },
      {
        "l": "Other",
        "p": 10.2,
        "c": "#475569",
        "n": 15168
      },
      {
        "l": "Summary Judgment",
        "p": 4.3,
        "c": "#D97706",
        "n": 6429
      },
      {
        "l": "Consent",
        "p": 3.3,
        "c": "#2563EB",
        "n": 4926
      },
      {
        "l": "Default Judgment",
        "p": 2.7,
        "c": "#DB2777",
        "n": 4075
      },
      {
        "l": "Trial",
        "p": 1.4,
        "c": "#7C3AED",
        "n": 2101
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 94.2,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 5.8,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 1.0,
      "trial_loss": 0.4,
      "dismiss": 17.6,
      "fav_set": 61.8,
      "set_mo": 7,
      "trial_med": "$58"
    },
    "circuit_rates": {
      "3": 74.1,
      "4": 73.7,
      "5": 66.1,
      "6": 66.0,
      "7": 75.7,
      "8": 70.9,
      "9": 66.7,
      "10": 72.1,
      "11": 73.0,
      "2": 69.9,
      "1": 68.0,
      "dc": 71.2
    },
    "state_rates": {
      "PA": 73.5,
      "NC": 68.6,
      "SC": 75.0,
      "VA": 72.6,
      "LA": 60.3,
      "MS": 78.5,
      "TX": 64.3,
      "MI": 71.8,
      "OH": 69.3,
      "TN": 57.5,
      "IL": 77.9,
      "WI": 68.9,
      "MO": 68.5,
      "AZ": 75.1,
      "CA": 65.2,
      "WA": 62.4,
      "CO": 70.0,
      "KS": 80.1,
      "OK": 69.3,
      "AL": 46.1,
      "FL": 76.8,
      "GA": 77.1,
      "CT": 74.0,
      "NY": 69.6,
      "NJ": 76.1,
      "MD": 78.7,
      "WV": 64.2,
      "IN": 71.8,
      "IA": 76.4,
      "NE": 81.3,
      "ND": 69.7,
      "HI": 64.4,
      "NV": 60.3,
      "OR": 70.4,
      "UT": 72.3,
      "WY": 69.3,
      "ME": 75.4,
      "KY": 63.8,
      "NM": 71.1,
      "NH": 67.7,
      "DC": 71.2,
      "MA": 68.5,
      "PR": 57.4,
      "SD": 67.9,
      "AR": 66.6,
      "RI": 68.7,
      "VI": 53.1,
      "AK": 54.0,
      "ID": 72.8,
      "MT": 62.9,
      "MN": 74.2,
      "VT": 84.2,
      "GU": 65.4,
      "DE": 62.8
    },
    "yearly_trend": {
      "1990": {
        "total": 1245,
        "wr": 73.3
      },
      "1991": {
        "total": 1394,
        "wr": 74.2
      },
      "1992": {
        "total": 1450,
        "wr": 72.6
      },
      "1993": {
        "total": 1435,
        "wr": 70.6
      },
      "1994": {
        "total": 1524,
        "wr": 67.2
      },
      "1995": {
        "total": 1596,
        "wr": 66.9
      },
      "1996": {
        "total": 1561,
        "wr": 68.6
      },
      "1997": {
        "total": 1614,
        "wr": 67.3
      },
      "1998": {
        "total": 1547,
        "wr": 69.2
      },
      "1999": {
        "total": 1811,
        "wr": 72.1
      },
      "2000": {
        "total": 1905,
        "wr": 71.8
      },
      "2001": {
        "total": 1997,
        "wr": 72.7
      },
      "2002": {
        "total": 3923,
        "wr": 81.7
      },
      "2003": {
        "total": 2873,
        "wr": 70.8
      },
      "2004": {
        "total": 3574,
        "wr": 69.5
      },
      "2005": {
        "total": 4097,
        "wr": 64.6
      },
      "2006": {
        "total": 6682,
        "wr": 52.3
      },
      "2007": {
        "total": 5114,
        "wr": 71.9
      },
      "2008": {
        "total": 5338,
        "wr": 74.1
      },
      "2009": {
        "total": 6253,
        "wr": 77.3
      },
      "2010": {
        "total": 6850,
        "wr": 77.7
      },
      "2011": {
        "total": 6838,
        "wr": 74.6
      },
      "2012": {
        "total": 7650,
        "wr": 75.6
      },
      "2013": {
        "total": 7910,
        "wr": 77.0
      },
      "2014": {
        "total": 8024,
        "wr": 78.1
      },
      "2015": {
        "total": 8950,
        "wr": 80.5
      },
      "2016": {
        "total": 8089,
        "wr": 80.3
      },
      "2017": {
        "total": 7478,
        "wr": 78.7
      },
      "2018": {
        "total": 7165,
        "wr": 79.8
      },
      "2019": {
        "total": 5869,
        "wr": 78.7
      },
      "2020": {
        "total": 3923,
        "wr": 77.2
      },
      "2021": {
        "total": 492,
        "wr": 76.0
      }
    },
    "data_date": "2026-03-19T19:31:50.757981",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 6,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 8,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "870": {
    "nos_code": "870",
    "label": "FDCPA",
    "category": "consumer",
    "sub": "debt collection",
    "total": 49662,
    "mo": 8,
    "wr": 48.9,
    "sp": 32.3,
    "sol": "1 year (FDCPA)",
    "af": "Contingency + statutory fees",
    "rng": {
      "lo": 40,
      "md": 160,
      "hi": 864
    },
    "rp": 11.6,
    "ps": {
      "wr": 36.9,
      "total": 7600
    },
    "rr": {
      "wr": 51.0,
      "total": 42062
    },
    "cw": 51.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 32.3,
        "c": "#0D9488",
        "n": 16023
      },
      {
        "l": "Dismissed",
        "p": 28.5,
        "c": "#94A3B8",
        "n": 14133
      },
      {
        "l": "Summary Judgment",
        "p": 16.3,
        "c": "#D97706",
        "n": 8072
      },
      {
        "l": "Other",
        "p": 8.0,
        "c": "#475569",
        "n": 3995
      },
      {
        "l": "Consent",
        "p": 4.7,
        "c": "#2563EB",
        "n": 2325
      },
      {
        "l": "Default Judgment",
        "p": 4.3,
        "c": "#DB2777",
        "n": 2124
      },
      {
        "l": "Trial",
        "p": 2.8,
        "c": "#7C3AED",
        "n": 1381
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 88.4,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 11.6,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 1.4,
      "trial_loss": 1.4,
      "dismiss": 44.7,
      "fav_set": 32.3,
      "set_mo": 9,
      "trial_med": "$122"
    },
    "circuit_rates": {
      "3": 58.2,
      "4": 50.6,
      "5": 50.8,
      "9": 39.3,
      "6": 56.7,
      "7": 54.6,
      "8": 57.0,
      "10": 54.8,
      "11": 48.8,
      "1": 51.7,
      "2": 45.1,
      "dc": 28.7
    },
    "state_rates": {
      "VI": 21.3,
      "MD": 48.3,
      "TX": 48.9,
      "NC": 53.5,
      "CA": 36.8,
      "VA": 47.2,
      "LA": 59.3,
      "KY": 54.3,
      "MI": 61.6,
      "OH": 53.7,
      "TN": 55.8,
      "IL": 56.5,
      "IN": 53.0,
      "MO": 50.7,
      "NE": 57.5,
      "AK": 47.7,
      "AZ": 43.9,
      "ID": 45.9,
      "MT": 51.3,
      "NV": 37.5,
      "WA": 43.1,
      "OK": 48.8,
      "UT": 59.2,
      "AL": 48.9,
      "FL": 48.3,
      "GA": 50.4,
      "MA": 52.0,
      "PR": 47.4,
      "CT": 57.0,
      "NY": 42.2,
      "NJ": 64.7,
      "PA": 58.9,
      "SC": 60.6,
      "ND": 55.9,
      "DC": 28.7,
      "MS": 53.4,
      "WI": 51.8,
      "IA": 61.0,
      "MN": 58.9,
      "OR": 53.1,
      "GU": 41.9,
      "CO": 55.7,
      "KS": 56.6,
      "NM": 51.4,
      "WY": 55.0,
      "AR": 60.8,
      "NH": 45.6,
      "WV": 54.1,
      "HI": 54.1,
      "VT": 62.5,
      "ME": 61.8,
      "DE": 60.2,
      "SD": 61.3,
      "RI": 56.8
    },
    "yearly_trend": {
      "1990": {
        "total": 2432,
        "wr": 51.7
      },
      "1991": {
        "total": 2250,
        "wr": 49.5
      },
      "1992": {
        "total": 2141,
        "wr": 49.2
      },
      "1993": {
        "total": 2089,
        "wr": 47.9
      },
      "1994": {
        "total": 1972,
        "wr": 42.7
      },
      "1995": {
        "total": 2050,
        "wr": 39.8
      },
      "1996": {
        "total": 2058,
        "wr": 40.3
      },
      "1997": {
        "total": 1936,
        "wr": 38.8
      },
      "1998": {
        "total": 1336,
        "wr": 47.0
      },
      "1999": {
        "total": 958,
        "wr": 49.3
      },
      "2000": {
        "total": 876,
        "wr": 51.3
      },
      "2001": {
        "total": 963,
        "wr": 42.9
      },
      "2002": {
        "total": 1119,
        "wr": 41.8
      },
      "2003": {
        "total": 1135,
        "wr": 43.1
      },
      "2004": {
        "total": 1231,
        "wr": 43.7
      },
      "2005": {
        "total": 1237,
        "wr": 45.1
      },
      "2006": {
        "total": 1440,
        "wr": 47.0
      },
      "2007": {
        "total": 1354,
        "wr": 51.1
      },
      "2008": {
        "total": 1389,
        "wr": 58.2
      },
      "2009": {
        "total": 1204,
        "wr": 56.9
      },
      "2010": {
        "total": 1078,
        "wr": 62.5
      },
      "2011": {
        "total": 1124,
        "wr": 59.4
      },
      "2012": {
        "total": 1074,
        "wr": 60.1
      },
      "2013": {
        "total": 969,
        "wr": 58.3
      },
      "2014": {
        "total": 909,
        "wr": 61.7
      },
      "2015": {
        "total": 945,
        "wr": 63.1
      },
      "2016": {
        "total": 888,
        "wr": 61.7
      },
      "2017": {
        "total": 912,
        "wr": 61.6
      },
      "2018": {
        "total": 761,
        "wr": 64.4
      },
      "2019": {
        "total": 538,
        "wr": 61.0
      },
      "2020": {
        "total": 285,
        "wr": 61.4
      },
      "2021": {
        "total": 42,
        "wr": 57.1
      }
    },
    "data_date": "2026-03-19T19:31:50.780597",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 6,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 8,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "362": {
    "nos_code": "362",
    "label": "Medical Malpractice",
    "category": "injury",
    "sub": "medical malpractice",
    "total": 45814,
    "mo": 12,
    "wr": 52.4,
    "sp": 48.5,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 75,
      "md": 300,
      "hi": 1350
    },
    "rp": 3.8,
    "ps": {
      "wr": 15.2,
      "total": 4007
    },
    "rr": {
      "wr": 55.9,
      "total": 41807
    },
    "cw": 55.0,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.5,
        "c": "#0D9488",
        "n": 22222
      },
      {
        "l": "Dismissed",
        "p": 18.3,
        "c": "#94A3B8",
        "n": 8381
      },
      {
        "l": "Other",
        "p": 8.5,
        "c": "#475569",
        "n": 3914
      },
      {
        "l": "Summary Judgment",
        "p": 7.6,
        "c": "#D97706",
        "n": 3494
      },
      {
        "l": "Trial",
        "p": 7.1,
        "c": "#7C3AED",
        "n": 3259
      },
      {
        "l": "Consent",
        "p": 1.0,
        "c": "#2563EB",
        "n": 443
      },
      {
        "l": "Default Judgment",
        "p": 0.1,
        "c": "#DB2777",
        "n": 58
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 96.2,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 3.8,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 3.7,
      "trial_loss": 3.4,
      "dismiss": 25.9,
      "fav_set": 48.5,
      "set_mo": 14,
      "trial_med": "$532"
    },
    "circuit_rates": {
      "4": 53.4,
      "5": 50.8,
      "6": 48.3,
      "7": 48.9,
      "8": 54.2,
      "9": 50.4,
      "10": 63.1,
      "11": 49.8,
      "dc": 53.6,
      "1": 55.8,
      "2": 45.6,
      "3": 55.8
    },
    "state_rates": {
      "MD": 51.0,
      "SC": 58.6,
      "VA": 59.1,
      "WV": 44.3,
      "LA": 49.2,
      "MS": 48.6,
      "TX": 52.6,
      "MI": 58.4,
      "OH": 37.4,
      "TN": 51.8,
      "IL": 48.4,
      "WI": 46.1,
      "AR": 56.8,
      "MO": 50.0,
      "NE": 61.0,
      "SD": 59.4,
      "CA": 46.6,
      "MT": 64.6,
      "NV": 39.5,
      "KS": 59.7,
      "NM": 68.2,
      "OK": 60.4,
      "WY": 72.3,
      "AL": 38.2,
      "FL": 52.4,
      "GA": 51.9,
      "DC": 53.6,
      "NH": 60.1,
      "PR": 62.1,
      "CT": 57.1,
      "NY": 43.0,
      "NJ": 51.4,
      "PA": 60.0,
      "NC": 52.3,
      "KY": 50.0,
      "IN": 51.6,
      "IA": 59.8,
      "AZ": 49.7,
      "ID": 62.7,
      "OR": 54.1,
      "UT": 59.8,
      "RI": 55.7,
      "DE": 47.2,
      "WA": 56.2,
      "CO": 65.5,
      "HI": 64.1,
      "VI": 26.2,
      "MN": 47.6,
      "MA": 42.7,
      "AK": 57.8,
      "ND": 59.4,
      "VT": 66.7,
      "ME": 56.1,
      "GU": 13.6
    },
    "yearly_trend": {
      "1990": {
        "total": 1351,
        "wr": 57.9
      },
      "1991": {
        "total": 1322,
        "wr": 58.2
      },
      "1992": {
        "total": 1390,
        "wr": 58.2
      },
      "1993": {
        "total": 1289,
        "wr": 58.0
      },
      "1994": {
        "total": 1295,
        "wr": 57.4
      },
      "1995": {
        "total": 1336,
        "wr": 58.2
      },
      "1996": {
        "total": 1326,
        "wr": 56.3
      },
      "1997": {
        "total": 1353,
        "wr": 59.0
      },
      "1998": {
        "total": 1332,
        "wr": 59.1
      },
      "1999": {
        "total": 1479,
        "wr": 61.2
      },
      "2000": {
        "total": 1484,
        "wr": 60.4
      },
      "2001": {
        "total": 1447,
        "wr": 59.6
      },
      "2002": {
        "total": 1474,
        "wr": 56.9
      },
      "2003": {
        "total": 1553,
        "wr": 56.9
      },
      "2004": {
        "total": 1276,
        "wr": 52.5
      },
      "2005": {
        "total": 1176,
        "wr": 54.9
      },
      "2006": {
        "total": 1198,
        "wr": 55.5
      },
      "2007": {
        "total": 1285,
        "wr": 51.0
      },
      "2008": {
        "total": 1094,
        "wr": 57.1
      },
      "2009": {
        "total": 1102,
        "wr": 53.0
      },
      "2010": {
        "total": 1091,
        "wr": 57.4
      },
      "2011": {
        "total": 1069,
        "wr": 57.8
      },
      "2012": {
        "total": 1060,
        "wr": 59.8
      },
      "2013": {
        "total": 983,
        "wr": 53.8
      },
      "2014": {
        "total": 1043,
        "wr": 54.5
      },
      "2015": {
        "total": 1094,
        "wr": 58.7
      },
      "2016": {
        "total": 1312,
        "wr": 44.2
      },
      "2017": {
        "total": 1133,
        "wr": 49.2
      },
      "2018": {
        "total": 1004,
        "wr": 47.8
      },
      "2019": {
        "total": 847,
        "wr": 44.7
      },
      "2020": {
        "total": 490,
        "wr": 38.8
      },
      "2021": {
        "total": 117,
        "wr": 27.4
      }
    },
    "data_date": "2026-03-19T19:31:50.796311",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 6,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 9,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 12,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "443": {
    "nos_code": "443",
    "label": "Housing/Accommodations",
    "category": "rights",
    "sub": "housing discrimination",
    "total": 27116,
    "mo": 7,
    "wr": 59.1,
    "sp": 53.6,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 9,
      "md": 27,
      "hi": 131
    },
    "rp": 2.9,
    "ps": {
      "wr": 18.3,
      "total": 4746
    },
    "rr": {
      "wr": 67.7,
      "total": 22370
    },
    "cw": 62.1,
    "ends": [
      {
        "l": "Settlement",
        "p": 53.6,
        "c": "#0D9488",
        "n": 14539
      },
      {
        "l": "Dismissed",
        "p": 19.3,
        "c": "#94A3B8",
        "n": 5224
      },
      {
        "l": "Summary Judgment",
        "p": 8.3,
        "c": "#D97706",
        "n": 2246
      },
      {
        "l": "Other",
        "p": 6.1,
        "c": "#475569",
        "n": 1662
      },
      {
        "l": "Consent",
        "p": 4.0,
        "c": "#2563EB",
        "n": 1087
      },
      {
        "l": "Trial",
        "p": 2.4,
        "c": "#7C3AED",
        "n": 640
      },
      {
        "l": "Default Judgment",
        "p": 0.6,
        "c": "#DB2777",
        "n": 175
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 97.1,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 2.9,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 1.4,
      "trial_loss": 1.0,
      "dismiss": 27.5,
      "fav_set": 53.6,
      "set_mo": 8,
      "trial_med": "$36"
    },
    "circuit_rates": {
      "4": 47.5,
      "6": 54.5,
      "7": 55.3,
      "9": 60.9,
      "1": 50.8,
      "2": 52.1,
      "3": 62.6,
      "10": 53.0,
      "11": 69.2,
      "5": 51.8,
      "8": 51.2,
      "dc": 46.7
    },
    "state_rates": {
      "MD": 42.1,
      "VA": 52.1,
      "MI": 56.8,
      "OH": 57.2,
      "TN": 43.5,
      "IN": 50.5,
      "WI": 57.3,
      "CA": 64.1,
      "MA": 51.5,
      "NY": 50.4,
      "NJ": 56.4,
      "IL": 56.1,
      "OK": 50.7,
      "UT": 56.2,
      "AL": 48.0,
      "PA": 67.6,
      "LA": 57.4,
      "TX": 50.2,
      "KY": 49.7,
      "WA": 45.4,
      "CO": 52.4,
      "FL": 72.5,
      "GA": 49.1,
      "CT": 62.8,
      "MO": 47.3,
      "OR": 59.0,
      "AZ": 46.4,
      "HI": 61.9,
      "DC": 46.7,
      "VI": 26.9,
      "AR": 61.5,
      "MN": 45.4,
      "WV": 47.1,
      "ND": 76.3,
      "NV": 43.7,
      "RI": 45.6,
      "NC": 46.8,
      "SC": 53.8,
      "IA": 45.0,
      "AK": 33.3,
      "NM": 68.7,
      "ME": 62.5,
      "NE": 60.9,
      "MS": 47.4,
      "MT": 46.9,
      "PR": 37.1,
      "ID": 58.7,
      "KS": 41.1,
      "NH": 52.9,
      "DE": 59.7,
      "SD": 42.9,
      "VT": 56.9
    },
    "yearly_trend": {
      "1990": {
        "total": 377,
        "wr": 54.1
      },
      "1991": {
        "total": 471,
        "wr": 58.8
      },
      "1992": {
        "total": 525,
        "wr": 61.3
      },
      "1993": {
        "total": 625,
        "wr": 61.9
      },
      "1994": {
        "total": 727,
        "wr": 58.2
      },
      "1995": {
        "total": 742,
        "wr": 56.6
      },
      "1996": {
        "total": 911,
        "wr": 56.4
      },
      "1997": {
        "total": 875,
        "wr": 52.7
      },
      "1998": {
        "total": 861,
        "wr": 60.9
      },
      "1999": {
        "total": 1237,
        "wr": 68.4
      },
      "2000": {
        "total": 1236,
        "wr": 68.7
      },
      "2001": {
        "total": 1220,
        "wr": 67.5
      },
      "2002": {
        "total": 1341,
        "wr": 70.7
      },
      "2003": {
        "total": 1246,
        "wr": 65.4
      },
      "2004": {
        "total": 1186,
        "wr": 60.2
      },
      "2005": {
        "total": 748,
        "wr": 54.5
      },
      "2006": {
        "total": 637,
        "wr": 54.9
      },
      "2007": {
        "total": 674,
        "wr": 57.9
      },
      "2008": {
        "total": 667,
        "wr": 57.3
      },
      "2009": {
        "total": 615,
        "wr": 55.8
      },
      "2010": {
        "total": 735,
        "wr": 59.2
      },
      "2011": {
        "total": 824,
        "wr": 60.1
      },
      "2012": {
        "total": 676,
        "wr": 56.2
      },
      "2013": {
        "total": 692,
        "wr": 55.3
      },
      "2014": {
        "total": 755,
        "wr": 57.7
      },
      "2015": {
        "total": 816,
        "wr": 58.0
      },
      "2016": {
        "total": 810,
        "wr": 62.0
      },
      "2017": {
        "total": 815,
        "wr": 56.1
      },
      "2018": {
        "total": 887,
        "wr": 61.1
      },
      "2019": {
        "total": 854,
        "wr": 66.6
      },
      "2020": {
        "total": 505,
        "wr": 68.3
      },
      "2021": {
        "total": 100,
        "wr": 61.0
      }
    },
    "data_date": "2026-03-19T19:31:50.806425",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 1,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 5,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 7,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "950": {
    "nos_code": "950",
    "label": "Constitutional",
    "category": "gov",
    "sub": "constitutional violation",
    "total": 11200,
    "mo": 7,
    "wr": 32.7,
    "sp": 25.1,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 3,
      "md": 50,
      "hi": 571
    },
    "rp": 1.1,
    "ps": {
      "wr": 8.1,
      "total": 2514
    },
    "rr": {
      "wr": 39.8,
      "total": 8686
    },
    "cw": 34.3,
    "ends": [
      {
        "l": "Dismissed",
        "p": 28.2,
        "c": "#94A3B8",
        "n": 3163
      },
      {
        "l": "Settlement",
        "p": 25.1,
        "c": "#0D9488",
        "n": 2809
      },
      {
        "l": "Summary Judgment",
        "p": 24.2,
        "c": "#D97706",
        "n": 2709
      },
      {
        "l": "Other",
        "p": 11.0,
        "c": "#475569",
        "n": 1237
      },
      {
        "l": "Trial",
        "p": 1.5,
        "c": "#7C3AED",
        "n": 173
      },
      {
        "l": "Consent",
        "p": 1.2,
        "c": "#2563EB",
        "n": 137
      },
      {
        "l": "Default Judgment",
        "p": 0.5,
        "c": "#DB2777",
        "n": 54
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 98.9,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 1.1,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 0.5,
      "trial_loss": 1.0,
      "dismiss": 52.4,
      "fav_set": 25.1,
      "set_mo": 7,
      "trial_med": "$250"
    },
    "circuit_rates": {
      "4": 26.8,
      "5": 31.6,
      "6": 31.1,
      "7": 30.1,
      "9": 34.4,
      "10": 32.6,
      "2": 32.5,
      "3": 37.8,
      "1": 32.6,
      "8": 35.1,
      "11": 32.4,
      "dc": 24.1
    },
    "state_rates": {
      "SC": 38.7,
      "WV": 37.5,
      "MS": 40.3,
      "MI": 30.1,
      "IL": 27.8,
      "CA": 33.6,
      "OR": 27.6,
      "KS": 27.3,
      "NY": 31.6,
      "NJ": 42.2,
      "PA": 38.1,
      "TX": 27.4,
      "KY": 36.3,
      "OH": 30.1,
      "TN": 33.1,
      "NV": 49.1,
      "RI": 35.9,
      "CT": 40.8,
      "MD": 15.4,
      "VA": 26.5,
      "LA": 38.9,
      "MO": 28.6,
      "SD": 35.9,
      "AK": 20.4,
      "MT": 42.7,
      "FL": 32.0,
      "GA": 35.4,
      "AZ": 37.3,
      "NE": 45.5,
      "DC": 24.1,
      "ME": 27.7,
      "MA": 36.6,
      "DE": 29.5,
      "IN": 36.6,
      "MN": 35.6,
      "ND": 35.4,
      "NM": 29.1,
      "VI": 18.9,
      "NC": 27.9,
      "WA": 18.6,
      "CO": 35.6,
      "VT": 26.5,
      "WI": 31.0,
      "IA": 36.8,
      "AL": 30.7,
      "AR": 36.4,
      "OK": 27.6,
      "PR": 28.5,
      "ID": 30.8,
      "WY": 53.8,
      "NH": 22.6,
      "HI": 42.5,
      "UT": 37.1
    },
    "yearly_trend": {
      "1990": {
        "total": 308,
        "wr": 38.6
      },
      "1991": {
        "total": 330,
        "wr": 42.7
      },
      "1992": {
        "total": 376,
        "wr": 40.4
      },
      "1993": {
        "total": 321,
        "wr": 40.2
      },
      "1994": {
        "total": 348,
        "wr": 33.3
      },
      "1995": {
        "total": 286,
        "wr": 31.8
      },
      "1996": {
        "total": 367,
        "wr": 38.1
      },
      "1997": {
        "total": 269,
        "wr": 35.3
      },
      "1998": {
        "total": 325,
        "wr": 39.1
      },
      "1999": {
        "total": 284,
        "wr": 35.9
      },
      "2000": {
        "total": 275,
        "wr": 31.6
      },
      "2001": {
        "total": 253,
        "wr": 32.0
      },
      "2002": {
        "total": 257,
        "wr": 33.1
      },
      "2003": {
        "total": 281,
        "wr": 35.6
      },
      "2004": {
        "total": 297,
        "wr": 24.6
      },
      "2005": {
        "total": 321,
        "wr": 31.2
      },
      "2006": {
        "total": 284,
        "wr": 35.6
      },
      "2007": {
        "total": 278,
        "wr": 32.0
      },
      "2008": {
        "total": 251,
        "wr": 33.5
      },
      "2009": {
        "total": 266,
        "wr": 27.4
      },
      "2010": {
        "total": 348,
        "wr": 27.3
      },
      "2011": {
        "total": 330,
        "wr": 27.0
      },
      "2012": {
        "total": 324,
        "wr": 27.5
      },
      "2013": {
        "total": 311,
        "wr": 29.6
      },
      "2014": {
        "total": 323,
        "wr": 26.6
      },
      "2015": {
        "total": 392,
        "wr": 42.1
      },
      "2016": {
        "total": 358,
        "wr": 36.3
      },
      "2017": {
        "total": 429,
        "wr": 39.2
      },
      "2018": {
        "total": 333,
        "wr": 24.9
      },
      "2019": {
        "total": 288,
        "wr": 24.0
      },
      "2020": {
        "total": 299,
        "wr": 30.1
      },
      "2021": {
        "total": 43,
        "wr": 25.6
      }
    },
    "data_date": "2026-03-19T19:31:50.810220",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 1,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 4,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 5,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 7,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "400": {
    "nos_code": "400",
    "label": "Civil Rights - State",
    "category": "rights",
    "sub": "civil rights",
    "total": 246,
    "mo": 6,
    "wr": 30.1,
    "sp": 23.2,
    "sol": "1-4 years (varies by claim)",
    "af": "$250-500/hr or contingency",
    "rng": {
      "lo": 0,
      "md": 0,
      "hi": 0
    },
    "rp": 0.8,
    "ps": {
      "wr": 8.5,
      "total": 59
    },
    "rr": {
      "wr": 36.9,
      "total": 187
    },
    "cw": 31.6,
    "ends": [
      {
        "l": "Dismissed",
        "p": 26.8,
        "c": "#94A3B8",
        "n": 66
      },
      {
        "l": "Settlement",
        "p": 23.2,
        "c": "#0D9488",
        "n": 57
      },
      {
        "l": "Summary Judgment",
        "p": 20.3,
        "c": "#D97706",
        "n": 50
      },
      {
        "l": "Other",
        "p": 16.3,
        "c": "#475569",
        "n": 40
      },
      {
        "l": "Trial",
        "p": 6.1,
        "c": "#7C3AED",
        "n": 15
      },
      {
        "l": "Consent",
        "p": 0.4,
        "c": "#2563EB",
        "n": 1
      },
      {
        "l": "Default Judgment",
        "p": 0.4,
        "c": "#DB2777",
        "n": 1
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 99.2,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 0.8,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 1.8,
      "trial_loss": 4.3,
      "dismiss": 47.2,
      "fav_set": 23.2,
      "set_mo": 7,
      "trial_med": ""
    },
    "circuit_rates": {
      "4": 26.5,
      "11": 27.3,
      "3": 48.0,
      "6": 30.0,
      "5": 44.0,
      "9": 13.0
    },
    "state_rates": {
      "PA": 50.0,
      "CA": 6.7
    },
    "yearly_trend": {
      "1991": {
        "total": 15,
        "wr": 40.0
      },
      "1992": {
        "total": 16,
        "wr": 31.2
      },
      "2001": {
        "total": 23,
        "wr": 26.1
      },
      "2002": {
        "total": 10,
        "wr": 30.0
      },
      "2011": {
        "total": 20,
        "wr": 15.0
      },
      "2013": {
        "total": 13,
        "wr": 38.5
      },
      "2019": {
        "total": 11,
        "wr": 18.2
      }
    },
    "data_date": "2026-03-19T19:31:50.810654",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 1,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 3,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 4,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 6,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "445": {
    "nos_code": "445",
    "label": "ADA Employment",
    "category": "work",
    "sub": "disability discrimination",
    "total": 30228,
    "mo": 10,
    "wr": 55.2,
    "sp": 54.0,
    "sol": "Consult an attorney",
    "af": "Varies",
    "rng": {
      "lo": 30,
      "md": 87,
      "hi": 458
    },
    "rp": 0.7,
    "ps": {
      "wr": 21.4,
      "total": 4883
    },
    "rr": {
      "wr": 61.8,
      "total": 25345
    },
    "cw": 58.0,
    "ends": [
      {
        "l": "Settlement",
        "p": 54.0,
        "c": "#0D9488",
        "n": 16327
      },
      {
        "l": "Dismissed",
        "p": 15.3,
        "c": "#94A3B8",
        "n": 4633
      },
      {
        "l": "Other",
        "p": 13.5,
        "c": "#475569",
        "n": 4068
      },
      {
        "l": "Summary Judgment",
        "p": 12.1,
        "c": "#D97706",
        "n": 3653
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 349
      },
      {
        "l": "Consent",
        "p": 0.7,
        "c": "#2563EB",
        "n": 212
      },
      {
        "l": "Default Judgment",
        "p": 0.1,
        "c": "#DB2777",
        "n": 45
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 99.3,
        "t": 0
      },
      {
        "l": "Under $10K",
        "p": 0.7,
        "t": 1
      }
    ],
    "factors": [],
    "class_action_count": 0,
    "class_action_pct": 0.0,
    "outcome_data": {
      "trial_win": 0.6,
      "trial_loss": 0.5,
      "dismiss": 27.4,
      "fav_set": 54.0,
      "set_mo": 9,
      "trial_med": "$257"
    },
    "circuit_rates": {
      "4": 52.8,
      "7": 61.4,
      "9": 53.4,
      "10": 57.2,
      "11": 52.2,
      "1": 58.3,
      "2": 50.4,
      "3": 67.7,
      "5": 47.1,
      "6": 52.2,
      "8": 56.0,
      "dc": 33.3
    },
    "state_rates": {
      "NC": 59.5,
      "IL": 58.4,
      "NV": 54.9,
      "CO": 59.0,
      "FL": 57.4,
      "MA": 53.0,
      "RI": 71.5,
      "NY": 47.1,
      "NJ": 62.5,
      "PA": 70.4,
      "VA": 47.0,
      "LA": 47.3,
      "TX": 44.7,
      "MI": 58.4,
      "IN": 66.8,
      "AZ": 56.0,
      "CA": 46.5,
      "HI": 62.7,
      "WA": 49.6,
      "NM": 56.2,
      "OK": 56.0,
      "SC": 64.3,
      "KY": 54.7,
      "OH": 52.9,
      "AR": 52.6,
      "IA": 64.5,
      "MN": 62.3,
      "ID": 61.0,
      "AL": 38.5,
      "GA": 49.8,
      "CT": 64.9,
      "MD": 40.4,
      "WV": 43.1,
      "TN": 41.9,
      "NE": 53.5,
      "PR": 45.3,
      "OR": 68.7,
      "KS": 59.2,
      "WY": 59.3,
      "MS": 58.7,
      "SD": 54.5,
      "NH": 61.3,
      "VT": 51.3,
      "ND": 46.4,
      "DE": 41.4,
      "MO": 50.0,
      "MT": 43.8,
      "WI": 57.9,
      "ME": 78.2,
      "AK": 28.6,
      "UT": 51.8,
      "DC": 33.3
    },
    "yearly_trend": {
      "2005": {
        "total": 841,
        "wr": 48.6
      },
      "2006": {
        "total": 970,
        "wr": 52.1
      },
      "2007": {
        "total": 1031,
        "wr": 54.8
      },
      "2008": {
        "total": 1152,
        "wr": 56.9
      },
      "2009": {
        "total": 1236,
        "wr": 56.4
      },
      "2010": {
        "total": 1609,
        "wr": 58.0
      },
      "2011": {
        "total": 1807,
        "wr": 58.6
      },
      "2012": {
        "total": 2012,
        "wr": 62.2
      },
      "2013": {
        "total": 1882,
        "wr": 60.4
      },
      "2014": {
        "total": 1950,
        "wr": 64.2
      },
      "2015": {
        "total": 2084,
        "wr": 61.7
      },
      "2016": {
        "total": 2182,
        "wr": 61.9
      },
      "2017": {
        "total": 2447,
        "wr": 63.3
      },
      "2018": {
        "total": 2524,
        "wr": 64.3
      },
      "2019": {
        "total": 2148,
        "wr": 66.6
      },
      "2020": {
        "total": 1302,
        "wr": 69.8
      },
      "2021": {
        "total": 137,
        "wr": 59.1
      }
    },
    "data_date": "2026-03-19T19:31:50.819217",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 2,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 8,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 10,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  }
};

export const TOTAL_REAL_CASES = 4168590;

export const REAL_OUTCOME_DATA: Record<string, any> = {
  "110": {"trial_win": 1.3, "trial_loss": 0.8, "dismiss": 24.8, "fav_set": 54.8, "set_mo": 9, "trial_med": "$190"},
  "190": {"trial_win": 1.5, "trial_loss": 1.0, "dismiss": 26.4, "fav_set": 47.0, "set_mo": 9, "trial_med": "$200"},
  "195": {"trial_win": 1.3, "trial_loss": 1.2, "dismiss": 21.9, "fav_set": 47.5, "set_mo": 13, "trial_med": "$298"},
  "220": {"trial_win": 0.2, "trial_loss": 0.1, "dismiss": 23.8, "fav_set": 22.3, "set_mo": 5, "trial_med": "$365"},
  "230": {"trial_win": 0.4, "trial_loss": 0.8, "dismiss": 18.1, "fav_set": 21.8, "set_mo": 6, "trial_med": "$201"},
  "350": {"trial_win": 2.8, "trial_loss": 1.4, "dismiss": 17.3, "fav_set": 61.9, "set_mo": 10, "trial_med": "$126"},
  "360": {"trial_win": 2.9, "trial_loss": 2.8, "dismiss": 23.7, "fav_set": 48.4, "set_mo": 11, "trial_med": "$136"},
  "362": {"trial_win": 3.7, "trial_loss": 3.4, "dismiss": 25.9, "fav_set": 48.5, "set_mo": 14, "trial_med": "$532"},
  "365": {"trial_win": 0.2, "trial_loss": 0.3, "dismiss": 17.9, "fav_set": 32.1, "set_mo": 16, "trial_med": "$475"},
  "370": {"trial_win": 0.9, "trial_loss": 1.0, "dismiss": 31.2, "fav_set": 39.5, "set_mo": 9, "trial_med": "$365"},
  "400": {"trial_win": 1.8, "trial_loss": 4.3, "dismiss": 47.2, "fav_set": 23.2, "set_mo": 7, "trial_med": ""},
  "440": {"trial_win": 1.3, "trial_loss": 2.2, "dismiss": 42.6, "fav_set": 35.1, "set_mo": 10, "trial_med": "$100"},
  "442": {"trial_win": 2.0, "trial_loss": 1.8, "dismiss": 32.8, "fav_set": 49.6, "set_mo": 11, "trial_med": "$130"},
  "443": {"trial_win": 1.4, "trial_loss": 1.0, "dismiss": 27.5, "fav_set": 53.6, "set_mo": 8, "trial_med": "$36"},
  "445": {"trial_win": 0.6, "trial_loss": 0.5, "dismiss": 27.4, "fav_set": 54.0, "set_mo": 9, "trial_med": "$257"},
  "710": {"trial_win": 1.0, "trial_loss": 0.4, "dismiss": 17.6, "fav_set": 61.8, "set_mo": 7, "trial_med": "$58"},
  "790": {"trial_win": 1.1, "trial_loss": 0.9, "dismiss": 28.4, "fav_set": 47.8, "set_mo": 9, "trial_med": "$165"},
  "863": {"trial_win": 0.0, "trial_loss": 0.1, "dismiss": 27.3, "fav_set": 3.2, "set_mo": 6, "trial_med": "$24"},
  "870": {"trial_win": 1.4, "trial_loss": 1.4, "dismiss": 44.7, "fav_set": 32.3, "set_mo": 9, "trial_med": "$122"},
  "950": {"trial_win": 0.5, "trial_loss": 1.0, "dismiss": 52.4, "fav_set": 25.1, "set_mo": 7, "trial_med": "$250"},
};
