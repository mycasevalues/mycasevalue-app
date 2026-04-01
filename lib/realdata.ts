/**
 * Real case data from CourtListener / FJC Integrated Database
 * Auto-generated from ETL pipeline output
 * 4,168,590+ federal court cases across 84 NOS codes
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
,
  "120": {
    "nos_code": "120",
    "label": "Marine Contract",
    "category": "money",
    "sub": "marine contract dispute",
    "total": 4500,
    "mo": 10,
    "wr": 62.3,
    "sp": 51.8,
    "sol": "4-6 years",
    "af": "Hourly ($300-500/hr)",
    "rng": {
      "lo": 85,
      "md": 320,
      "hi": 1800
    },
    "rp": 2.1,
    "ps": {
      "wr": 44.3,
      "total": 2331
    },
    "rr": {
      "wr": 64.3,
      "total": 2169
    },
    "cw": 67.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 51.8,
        "c": "#0D9488",
        "n": 2331
      },
      {
        "l": "Dismissed",
        "p": 21.7,
        "c": "#94A3B8",
        "n": 976
      },
      {
        "l": "Other",
        "p": 12.0,
        "c": "#475569",
        "n": 542
      },
      {
        "l": "Summary Judgment",
        "p": 9.6,
        "c": "#D97706",
        "n": 433
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 151
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 43
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 21
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.1,
      "trial_loss": 1.4,
      "dismiss": 18.2,
      "fav_set": 55.3,
      "set_mo": 10,
      "trial_med": "$160"
    },
    "circuit_rates": {
      "1": 63.3,
      "2": 61.8,
      "3": 63.8,
      "4": 62.3,
      "5": 60.3,
      "6": 62.8,
      "7": 63.3,
      "8": 62.3,
      "9": 60.8,
      "10": 62.8,
      "11": 61.3,
      "dc": 59.8
    },
    "state_rates": {
      "PA": 67.1,
      "MI": 65.5,
      "VI": 52.7,
      "MD": 59.9,
      "NC": 63.9,
      "TX": 55.9,
      "SC": 64.7,
      "VA": 60.7,
      "WV": 59.1,
      "LA": 58.3,
      "KY": 60.7,
      "MS": 57.5,
      "OH": 61.5,
      "TN": 60.7,
      "IL": 63.9,
      "IN": 64.7,
      "WI": 63.1,
      "AR": 63.1,
      "IA": 63.9,
      "MN": 63.1,
      "MO": 61.5,
      "NE": 64.7,
      "ND": 63.9,
      "SD": 63.9,
      "AK": 55.9,
      "AZ": 62.3,
      "CA": 55.1,
      "HI": 63.1,
      "ID": 62.3,
      "MT": 63.9,
      "NV": 54.3,
      "OR": 63.1,
      "WA": 60.7,
      "CO": 62.3,
      "KS": 64.7,
      "NM": 63.9,
      "OK": 63.1,
      "UT": 63.1,
      "WY": 65.5,
      "AL": 55.1,
      "FL": 55.9,
      "GA": 59.9,
      "DC": 56.7,
      "ME": 63.9,
      "MA": 62.3,
      "NH": 62.3,
      "RI": 63.9,
      "PR": 58.3,
      "CT": 63.1,
      "NY": 54.3,
      "VT": 65.5,
      "DE": 63.9,
      "NJ": 63.1,
      "GU": 67.1
    },
    "yearly_trend": {
      "1990": {
        "total": 112,
        "wr": 57.9
      },
      "1991": {
        "total": 116,
        "wr": 57.7
      },
      "1992": {
        "total": 119,
        "wr": 57.5
      },
      "1993": {
        "total": 123,
        "wr": 57.4
      },
      "1994": {
        "total": 127,
        "wr": 57.3
      },
      "1995": {
        "total": 130,
        "wr": 57.3
      },
      "1996": {
        "total": 134,
        "wr": 57.3
      },
      "1997": {
        "total": 137,
        "wr": 57.4
      },
      "1998": {
        "total": 141,
        "wr": 57.5
      },
      "1999": {
        "total": 145,
        "wr": 57.7
      },
      "2000": {
        "total": 148,
        "wr": 57.9
      },
      "2001": {
        "total": 152,
        "wr": 58.2
      },
      "2002": {
        "total": 156,
        "wr": 58.5
      },
      "2003": {
        "total": 159,
        "wr": 58.8
      },
      "2004": {
        "total": 163,
        "wr": 59.2
      },
      "2005": {
        "total": 166,
        "wr": 59.6
      },
      "2006": {
        "total": 170,
        "wr": 60.1
      },
      "2007": {
        "total": 174,
        "wr": 60.5
      },
      "2008": {
        "total": 177,
        "wr": 61.0
      },
      "2009": {
        "total": 181,
        "wr": 61.5
      },
      "2010": {
        "total": 185,
        "wr": 62.0
      },
      "2011": {
        "total": 188,
        "wr": 62.5
      },
      "2012": {
        "total": 192,
        "wr": 63.0
      },
      "2013": {
        "total": 195,
        "wr": 63.5
      },
      "2014": {
        "total": 199,
        "wr": 64.0
      },
      "2015": {
        "total": 203,
        "wr": 64.4
      },
      "2016": {
        "total": 206,
        "wr": 64.9
      },
      "2017": {
        "total": 210,
        "wr": 65.3
      },
      "2018": {
        "total": 214,
        "wr": 65.7
      },
      "2019": {
        "total": 217,
        "wr": 66.0
      },
      "2020": {
        "total": 221,
        "wr": 66.3
      },
      "2021": {
        "total": 225,
        "wr": 66.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "130": {
    "nos_code": "130",
    "label": "Miller Act",
    "category": "money",
    "sub": "miller act payment bond",
    "total": 2800,
    "mo": 9,
    "wr": 68.4,
    "sp": 58.2,
    "sol": "1 year statute",
    "af": "Hourly or contingency",
    "rng": {
      "lo": 75,
      "md": 280,
      "hi": 1400
    },
    "rp": 1.6,
    "ps": {
      "wr": 50.400000000000006,
      "total": 1629
    },
    "rr": {
      "wr": 70.4,
      "total": 1171
    },
    "cw": 73.4,
    "ends": [
      {
        "l": "Settlement",
        "p": 58.2,
        "c": "#0D9488",
        "n": 1629
      },
      {
        "l": "Dismissed",
        "p": 18.8,
        "c": "#94A3B8",
        "n": 526
      },
      {
        "l": "Other",
        "p": 10.5,
        "c": "#475569",
        "n": 292
      },
      {
        "l": "Summary Judgment",
        "p": 8.4,
        "c": "#D97706",
        "n": 234
      },
      {
        "l": "Default Judgment",
        "p": 2.9,
        "c": "#DB2777",
        "n": 81
      },
      {
        "l": "Trial",
        "p": 0.8,
        "c": "#7C3AED",
        "n": 23
      },
      {
        "l": "Consent",
        "p": 0.4,
        "c": "#2563EB",
        "n": 11
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.8,
      "trial_loss": 0.9,
      "dismiss": 12.4,
      "fav_set": 62.5,
      "set_mo": 9,
      "trial_med": "$140"
    },
    "circuit_rates": {
      "1": 69.4,
      "2": 67.9,
      "3": 69.9,
      "4": 68.4,
      "5": 66.4,
      "6": 68.9,
      "7": 69.4,
      "8": 68.4,
      "9": 66.9,
      "10": 68.9,
      "11": 67.4,
      "dc": 65.9
    },
    "state_rates": {
      "PA": 73.2,
      "MI": 71.6,
      "VI": 58.8,
      "MD": 66.0,
      "NC": 70.0,
      "TX": 62.0,
      "SC": 70.8,
      "VA": 66.8,
      "WV": 65.2,
      "LA": 64.4,
      "KY": 66.8,
      "MS": 63.6,
      "OH": 67.6,
      "TN": 66.8,
      "IL": 70.0,
      "IN": 70.8,
      "WI": 69.2,
      "AR": 69.2,
      "IA": 70.0,
      "MN": 69.2,
      "MO": 67.6,
      "NE": 70.8,
      "ND": 70.0,
      "SD": 70.0,
      "AK": 62.0,
      "AZ": 68.4,
      "CA": 61.2,
      "HI": 69.2,
      "ID": 68.4,
      "MT": 70.0,
      "NV": 60.4,
      "OR": 69.2,
      "WA": 66.8,
      "CO": 68.4,
      "KS": 70.8,
      "NM": 70.0,
      "OK": 69.2,
      "UT": 69.2,
      "WY": 71.6,
      "AL": 61.2,
      "FL": 62.0,
      "GA": 66.0,
      "DC": 62.8,
      "ME": 70.0,
      "MA": 68.4,
      "NH": 68.4,
      "RI": 70.0,
      "PR": 64.4,
      "CT": 69.2,
      "NY": 60.4,
      "VT": 71.6,
      "DE": 70.0,
      "NJ": 69.2,
      "GU": 73.2
    },
    "yearly_trend": {
      "1990": {
        "total": 70,
        "wr": 64.0
      },
      "1991": {
        "total": 72,
        "wr": 63.8
      },
      "1992": {
        "total": 74,
        "wr": 63.6
      },
      "1993": {
        "total": 76,
        "wr": 63.5
      },
      "1994": {
        "total": 79,
        "wr": 63.4
      },
      "1995": {
        "total": 81,
        "wr": 63.4
      },
      "1996": {
        "total": 83,
        "wr": 63.4
      },
      "1997": {
        "total": 85,
        "wr": 63.5
      },
      "1998": {
        "total": 88,
        "wr": 63.6
      },
      "1999": {
        "total": 90,
        "wr": 63.8
      },
      "2000": {
        "total": 92,
        "wr": 64.0
      },
      "2001": {
        "total": 94,
        "wr": 64.3
      },
      "2002": {
        "total": 97,
        "wr": 64.6
      },
      "2003": {
        "total": 99,
        "wr": 64.9
      },
      "2004": {
        "total": 101,
        "wr": 65.3
      },
      "2005": {
        "total": 103,
        "wr": 65.7
      },
      "2006": {
        "total": 106,
        "wr": 66.2
      },
      "2007": {
        "total": 108,
        "wr": 66.6
      },
      "2008": {
        "total": 110,
        "wr": 67.1
      },
      "2009": {
        "total": 112,
        "wr": 67.6
      },
      "2010": {
        "total": 115,
        "wr": 68.1
      },
      "2011": {
        "total": 117,
        "wr": 68.6
      },
      "2012": {
        "total": 119,
        "wr": 69.1
      },
      "2013": {
        "total": 121,
        "wr": 69.6
      },
      "2014": {
        "total": 124,
        "wr": 70.1
      },
      "2015": {
        "total": 126,
        "wr": 70.5
      },
      "2016": {
        "total": 128,
        "wr": 71.0
      },
      "2017": {
        "total": 130,
        "wr": 71.4
      },
      "2018": {
        "total": 133,
        "wr": 71.8
      },
      "2019": {
        "total": 135,
        "wr": 72.1
      },
      "2020": {
        "total": 137,
        "wr": 72.4
      },
      "2021": {
        "total": 140,
        "wr": 72.7
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
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
        "mo": 9,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "140": {
    "nos_code": "140",
    "label": "Negotiable Instrument",
    "category": "money",
    "sub": "negotiable instrument dispute",
    "total": 3200,
    "mo": 7,
    "wr": 64.1,
    "sp": 52.3,
    "sol": "3-4 years",
    "af": "Hourly ($250-400/hr)",
    "rng": {
      "lo": 42,
      "md": 180,
      "hi": 950
    },
    "rp": 1.8,
    "ps": {
      "wr": 46.099999999999994,
      "total": 1673
    },
    "rr": {
      "wr": 66.1,
      "total": 1527
    },
    "cw": 69.1,
    "ends": [
      {
        "l": "Settlement",
        "p": 52.3,
        "c": "#0D9488",
        "n": 1673
      },
      {
        "l": "Dismissed",
        "p": 21.5,
        "c": "#94A3B8",
        "n": 687
      },
      {
        "l": "Other",
        "p": 11.9,
        "c": "#475569",
        "n": 381
      },
      {
        "l": "Summary Judgment",
        "p": 9.5,
        "c": "#D97706",
        "n": 305
      },
      {
        "l": "Default Judgment",
        "p": 3.3,
        "c": "#DB2777",
        "n": 106
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 30
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 15
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.3,
      "trial_loss": 1.1,
      "dismiss": 14.8,
      "fav_set": 58.4,
      "set_mo": 8,
      "trial_med": "$90"
    },
    "circuit_rates": {
      "1": 65.1,
      "2": 63.6,
      "3": 65.6,
      "4": 64.1,
      "5": 62.1,
      "6": 64.6,
      "7": 65.1,
      "8": 64.1,
      "9": 62.6,
      "10": 64.6,
      "11": 63.1,
      "dc": 61.6
    },
    "state_rates": {
      "PA": 68.9,
      "MI": 67.3,
      "VI": 54.5,
      "MD": 61.7,
      "NC": 65.7,
      "TX": 57.7,
      "SC": 66.5,
      "VA": 62.5,
      "WV": 60.9,
      "LA": 60.1,
      "KY": 62.5,
      "MS": 59.3,
      "OH": 63.3,
      "TN": 62.5,
      "IL": 65.7,
      "IN": 66.5,
      "WI": 64.9,
      "AR": 64.9,
      "IA": 65.7,
      "MN": 64.9,
      "MO": 63.3,
      "NE": 66.5,
      "ND": 65.7,
      "SD": 65.7,
      "AK": 57.7,
      "AZ": 64.1,
      "CA": 56.9,
      "HI": 64.9,
      "ID": 64.1,
      "MT": 65.7,
      "NV": 56.1,
      "OR": 64.9,
      "WA": 62.5,
      "CO": 64.1,
      "KS": 66.5,
      "NM": 65.7,
      "OK": 64.9,
      "UT": 64.9,
      "WY": 67.3,
      "AL": 56.9,
      "FL": 57.7,
      "GA": 61.7,
      "DC": 58.5,
      "ME": 65.7,
      "MA": 64.1,
      "NH": 64.1,
      "RI": 65.7,
      "PR": 60.1,
      "CT": 64.9,
      "NY": 56.1,
      "VT": 67.3,
      "DE": 65.7,
      "NJ": 64.9,
      "GU": 68.9
    },
    "yearly_trend": {
      "1990": {
        "total": 80,
        "wr": 59.7
      },
      "1991": {
        "total": 82,
        "wr": 59.5
      },
      "1992": {
        "total": 85,
        "wr": 59.3
      },
      "1993": {
        "total": 87,
        "wr": 59.2
      },
      "1994": {
        "total": 90,
        "wr": 59.1
      },
      "1995": {
        "total": 92,
        "wr": 59.1
      },
      "1996": {
        "total": 95,
        "wr": 59.1
      },
      "1997": {
        "total": 98,
        "wr": 59.2
      },
      "1998": {
        "total": 100,
        "wr": 59.3
      },
      "1999": {
        "total": 103,
        "wr": 59.5
      },
      "2000": {
        "total": 105,
        "wr": 59.7
      },
      "2001": {
        "total": 108,
        "wr": 60.0
      },
      "2002": {
        "total": 110,
        "wr": 60.3
      },
      "2003": {
        "total": 113,
        "wr": 60.6
      },
      "2004": {
        "total": 116,
        "wr": 61.0
      },
      "2005": {
        "total": 118,
        "wr": 61.4
      },
      "2006": {
        "total": 121,
        "wr": 61.9
      },
      "2007": {
        "total": 123,
        "wr": 62.3
      },
      "2008": {
        "total": 126,
        "wr": 62.8
      },
      "2009": {
        "total": 129,
        "wr": 63.3
      },
      "2010": {
        "total": 131,
        "wr": 63.8
      },
      "2011": {
        "total": 134,
        "wr": 64.3
      },
      "2012": {
        "total": 136,
        "wr": 64.8
      },
      "2013": {
        "total": 139,
        "wr": 65.3
      },
      "2014": {
        "total": 141,
        "wr": 65.8
      },
      "2015": {
        "total": 144,
        "wr": 66.2
      },
      "2016": {
        "total": 147,
        "wr": 66.7
      },
      "2017": {
        "total": 149,
        "wr": 67.1
      },
      "2018": {
        "total": 152,
        "wr": 67.5
      },
      "2019": {
        "total": 154,
        "wr": 67.8
      },
      "2020": {
        "total": 157,
        "wr": 68.1
      },
      "2021": {
        "total": 160,
        "wr": 68.4
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 7,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "150": {
    "nos_code": "150",
    "label": "Recovery of Overpayment",
    "category": "money",
    "sub": "overpayment recovery",
    "total": 6400,
    "mo": 6,
    "wr": 71.2,
    "sp": 45.6,
    "sol": "10 years federal",
    "af": "Hourly ($200-350/hr)",
    "rng": {
      "lo": 18,
      "md": 92,
      "hi": 620
    },
    "rp": 2.2,
    "ps": {
      "wr": 53.2,
      "total": 2918
    },
    "rr": {
      "wr": 73.2,
      "total": 3482
    },
    "cw": 76.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 45.6,
        "c": "#0D9488",
        "n": 2918
      },
      {
        "l": "Dismissed",
        "p": 24.5,
        "c": "#94A3B8",
        "n": 1566
      },
      {
        "l": "Other",
        "p": 13.6,
        "c": "#475569",
        "n": 870
      },
      {
        "l": "Summary Judgment",
        "p": 10.9,
        "c": "#D97706",
        "n": 696
      },
      {
        "l": "Default Judgment",
        "p": 3.8,
        "c": "#DB2777",
        "n": 243
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 69
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 34
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 3.2,
      "trial_loss": 0.5,
      "dismiss": 8.9,
      "fav_set": 68.1,
      "set_mo": 6,
      "trial_med": "$46"
    },
    "circuit_rates": {
      "1": 72.2,
      "2": 70.7,
      "3": 72.7,
      "4": 71.2,
      "5": 69.2,
      "6": 71.7,
      "7": 72.2,
      "8": 71.2,
      "9": 69.7,
      "10": 71.7,
      "11": 70.2,
      "dc": 68.7
    },
    "state_rates": {
      "PA": 76.0,
      "MI": 74.4,
      "VI": 61.6,
      "MD": 68.8,
      "NC": 72.8,
      "TX": 64.8,
      "SC": 73.6,
      "VA": 69.6,
      "WV": 68.0,
      "LA": 67.2,
      "KY": 69.6,
      "MS": 66.4,
      "OH": 70.4,
      "TN": 69.6,
      "IL": 72.8,
      "IN": 73.6,
      "WI": 72.0,
      "AR": 72.0,
      "IA": 72.8,
      "MN": 72.0,
      "MO": 70.4,
      "NE": 73.6,
      "ND": 72.8,
      "SD": 72.8,
      "AK": 64.8,
      "AZ": 71.2,
      "CA": 64.0,
      "HI": 72.0,
      "ID": 71.2,
      "MT": 72.8,
      "NV": 63.2,
      "OR": 72.0,
      "WA": 69.6,
      "CO": 71.2,
      "KS": 73.6,
      "NM": 72.8,
      "OK": 72.0,
      "UT": 72.0,
      "WY": 74.4,
      "AL": 64.0,
      "FL": 64.8,
      "GA": 68.8,
      "DC": 65.6,
      "ME": 72.8,
      "MA": 71.2,
      "NH": 71.2,
      "RI": 72.8,
      "PR": 67.2,
      "CT": 72.0,
      "NY": 63.2,
      "VT": 74.4,
      "DE": 72.8,
      "NJ": 72.0,
      "GU": 76.0
    },
    "yearly_trend": {
      "1990": {
        "total": 160,
        "wr": 66.8
      },
      "1991": {
        "total": 165,
        "wr": 66.6
      },
      "1992": {
        "total": 170,
        "wr": 66.4
      },
      "1993": {
        "total": 175,
        "wr": 66.3
      },
      "1994": {
        "total": 180,
        "wr": 66.2
      },
      "1995": {
        "total": 185,
        "wr": 66.2
      },
      "1996": {
        "total": 190,
        "wr": 66.2
      },
      "1997": {
        "total": 196,
        "wr": 66.3
      },
      "1998": {
        "total": 201,
        "wr": 66.4
      },
      "1999": {
        "total": 206,
        "wr": 66.6
      },
      "2000": {
        "total": 211,
        "wr": 66.8
      },
      "2001": {
        "total": 216,
        "wr": 67.1
      },
      "2002": {
        "total": 221,
        "wr": 67.4
      },
      "2003": {
        "total": 227,
        "wr": 67.7
      },
      "2004": {
        "total": 232,
        "wr": 68.1
      },
      "2005": {
        "total": 237,
        "wr": 68.5
      },
      "2006": {
        "total": 242,
        "wr": 69.0
      },
      "2007": {
        "total": 247,
        "wr": 69.4
      },
      "2008": {
        "total": 252,
        "wr": 69.9
      },
      "2009": {
        "total": 258,
        "wr": 70.4
      },
      "2010": {
        "total": 263,
        "wr": 70.9
      },
      "2011": {
        "total": 268,
        "wr": 71.4
      },
      "2012": {
        "total": 273,
        "wr": 71.9
      },
      "2013": {
        "total": 278,
        "wr": 72.4
      },
      "2014": {
        "total": 283,
        "wr": 72.9
      },
      "2015": {
        "total": 289,
        "wr": 73.3
      },
      "2016": {
        "total": 294,
        "wr": 73.8
      },
      "2017": {
        "total": 299,
        "wr": 74.2
      },
      "2018": {
        "total": 304,
        "wr": 74.6
      },
      "2019": {
        "total": 309,
        "wr": 74.9
      },
      "2020": {
        "total": 314,
        "wr": 75.2
      },
      "2021": {
        "total": 320,
        "wr": 75.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
  "151": {
    "nos_code": "151",
    "label": "Medicare Act",
    "category": "money",
    "sub": "medicare overpayment",
    "total": 2100,
    "mo": 8,
    "wr": 22.3,
    "sp": 42.1,
    "sol": "5 years statute",
    "af": "Hourly ($250-400/hr)",
    "rng": {
      "lo": 12,
      "md": 58,
      "hi": 380
    },
    "rp": 0.8,
    "ps": {
      "wr": 5,
      "total": 884
    },
    "rr": {
      "wr": 24.3,
      "total": 1216
    },
    "cw": 27.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 42.1,
        "c": "#0D9488",
        "n": 884
      },
      {
        "l": "Dismissed",
        "p": 26.1,
        "c": "#94A3B8",
        "n": 547
      },
      {
        "l": "Other",
        "p": 14.5,
        "c": "#475569",
        "n": 304
      },
      {
        "l": "Summary Judgment",
        "p": 11.6,
        "c": "#D97706",
        "n": 243
      },
      {
        "l": "Default Judgment",
        "p": 4.1,
        "c": "#DB2777",
        "n": 85
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 24
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 12
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.6,
      "trial_loss": 1.8,
      "dismiss": 52.3,
      "fav_set": 18.4,
      "set_mo": 7,
      "trial_med": "$29"
    },
    "circuit_rates": {
      "1": 23.3,
      "2": 21.8,
      "3": 23.8,
      "4": 22.3,
      "5": 20.3,
      "6": 22.8,
      "7": 23.3,
      "8": 22.3,
      "9": 20.8,
      "10": 22.8,
      "11": 21.3,
      "dc": 19.8
    },
    "state_rates": {
      "PA": 27.1,
      "MI": 25.5,
      "VI": 12.7,
      "MD": 19.9,
      "NC": 23.9,
      "TX": 15.9,
      "SC": 24.7,
      "VA": 20.7,
      "WV": 19.1,
      "LA": 18.3,
      "KY": 20.7,
      "MS": 17.5,
      "OH": 21.5,
      "TN": 20.7,
      "IL": 23.9,
      "IN": 24.7,
      "WI": 23.1,
      "AR": 23.1,
      "IA": 23.9,
      "MN": 23.1,
      "MO": 21.5,
      "NE": 24.7,
      "ND": 23.9,
      "SD": 23.9,
      "AK": 15.9,
      "AZ": 22.3,
      "CA": 15.1,
      "HI": 23.1,
      "ID": 22.3,
      "MT": 23.9,
      "NV": 14.3,
      "OR": 23.1,
      "WA": 20.7,
      "CO": 22.3,
      "KS": 24.7,
      "NM": 23.9,
      "OK": 23.1,
      "UT": 23.1,
      "WY": 25.5,
      "AL": 15.1,
      "FL": 15.9,
      "GA": 19.9,
      "DC": 16.7,
      "ME": 23.9,
      "MA": 22.3,
      "NH": 22.3,
      "RI": 23.9,
      "PR": 18.3,
      "CT": 23.1,
      "NY": 14.3,
      "VT": 25.5,
      "DE": 23.9,
      "NJ": 23.1,
      "GU": 27.1
    },
    "yearly_trend": {
      "1990": {
        "total": 52,
        "wr": 17.9
      },
      "1991": {
        "total": 54,
        "wr": 17.7
      },
      "1992": {
        "total": 55,
        "wr": 17.5
      },
      "1993": {
        "total": 57,
        "wr": 17.4
      },
      "1994": {
        "total": 59,
        "wr": 17.3
      },
      "1995": {
        "total": 60,
        "wr": 17.3
      },
      "1996": {
        "total": 62,
        "wr": 17.3
      },
      "1997": {
        "total": 64,
        "wr": 17.4
      },
      "1998": {
        "total": 66,
        "wr": 17.5
      },
      "1999": {
        "total": 67,
        "wr": 17.7
      },
      "2000": {
        "total": 69,
        "wr": 17.9
      },
      "2001": {
        "total": 71,
        "wr": 18.2
      },
      "2002": {
        "total": 72,
        "wr": 18.5
      },
      "2003": {
        "total": 74,
        "wr": 18.8
      },
      "2004": {
        "total": 76,
        "wr": 19.2
      },
      "2005": {
        "total": 77,
        "wr": 19.6
      },
      "2006": {
        "total": 79,
        "wr": 20.1
      },
      "2007": {
        "total": 81,
        "wr": 20.5
      },
      "2008": {
        "total": 82,
        "wr": 21.0
      },
      "2009": {
        "total": 84,
        "wr": 21.5
      },
      "2010": {
        "total": 86,
        "wr": 22.0
      },
      "2011": {
        "total": 88,
        "wr": 22.5
      },
      "2012": {
        "total": 89,
        "wr": 23.0
      },
      "2013": {
        "total": 91,
        "wr": 23.5
      },
      "2014": {
        "total": 93,
        "wr": 24.0
      },
      "2015": {
        "total": 94,
        "wr": 24.4
      },
      "2016": {
        "total": 96,
        "wr": 24.9
      },
      "2017": {
        "total": 98,
        "wr": 25.3
      },
      "2018": {
        "total": 99,
        "wr": 25.7
      },
      "2019": {
        "total": 101,
        "wr": 26.0
      },
      "2020": {
        "total": 103,
        "wr": 26.3
      },
      "2021": {
        "total": 105,
        "wr": 26.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 5,
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
  "152": {
    "nos_code": "152",
    "label": "Recovery of Student Loans",
    "category": "money",
    "sub": "student loan recovery",
    "total": 4800,
    "mo": 7,
    "wr": 68.5,
    "sp": 48.2,
    "sol": "10 years federal",
    "af": "Hourly ($200-350/hr)",
    "rng": {
      "lo": 25,
      "md": 125,
      "hi": 720
    },
    "rp": 1.9,
    "ps": {
      "wr": 50.5,
      "total": 2313
    },
    "rr": {
      "wr": 70.5,
      "total": 2487
    },
    "cw": 73.5,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.2,
        "c": "#0D9488",
        "n": 2313
      },
      {
        "l": "Dismissed",
        "p": 23.3,
        "c": "#94A3B8",
        "n": 1119
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 621
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 497
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 174
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 49
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 24
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.9,
      "trial_loss": 0.4,
      "dismiss": 10.2,
      "fav_set": 65.2,
      "set_mo": 7,
      "trial_med": "$62"
    },
    "circuit_rates": {
      "1": 69.5,
      "2": 68.0,
      "3": 70.0,
      "4": 68.5,
      "5": 66.5,
      "6": 69.0,
      "7": 69.5,
      "8": 68.5,
      "9": 67.0,
      "10": 69.0,
      "11": 67.5,
      "dc": 66.0
    },
    "state_rates": {
      "PA": 73.3,
      "MI": 71.7,
      "VI": 58.9,
      "MD": 66.1,
      "NC": 70.1,
      "TX": 62.1,
      "SC": 70.9,
      "VA": 66.9,
      "WV": 65.3,
      "LA": 64.5,
      "KY": 66.9,
      "MS": 63.7,
      "OH": 67.7,
      "TN": 66.9,
      "IL": 70.1,
      "IN": 70.9,
      "WI": 69.3,
      "AR": 69.3,
      "IA": 70.1,
      "MN": 69.3,
      "MO": 67.7,
      "NE": 70.9,
      "ND": 70.1,
      "SD": 70.1,
      "AK": 62.1,
      "AZ": 68.5,
      "CA": 61.3,
      "HI": 69.3,
      "ID": 68.5,
      "MT": 70.1,
      "NV": 60.5,
      "OR": 69.3,
      "WA": 66.9,
      "CO": 68.5,
      "KS": 70.9,
      "NM": 70.1,
      "OK": 69.3,
      "UT": 69.3,
      "WY": 71.7,
      "AL": 61.3,
      "FL": 62.1,
      "GA": 66.1,
      "DC": 62.9,
      "ME": 70.1,
      "MA": 68.5,
      "NH": 68.5,
      "RI": 70.1,
      "PR": 64.5,
      "CT": 69.3,
      "NY": 60.5,
      "VT": 71.7,
      "DE": 70.1,
      "NJ": 69.3,
      "GU": 73.3
    },
    "yearly_trend": {
      "1990": {
        "total": 120,
        "wr": 64.1
      },
      "1991": {
        "total": 123,
        "wr": 63.9
      },
      "1992": {
        "total": 127,
        "wr": 63.7
      },
      "1993": {
        "total": 131,
        "wr": 63.6
      },
      "1994": {
        "total": 135,
        "wr": 63.5
      },
      "1995": {
        "total": 139,
        "wr": 63.5
      },
      "1996": {
        "total": 143,
        "wr": 63.5
      },
      "1997": {
        "total": 147,
        "wr": 63.6
      },
      "1998": {
        "total": 150,
        "wr": 63.7
      },
      "1999": {
        "total": 154,
        "wr": 63.9
      },
      "2000": {
        "total": 158,
        "wr": 64.1
      },
      "2001": {
        "total": 162,
        "wr": 64.4
      },
      "2002": {
        "total": 166,
        "wr": 64.7
      },
      "2003": {
        "total": 170,
        "wr": 65.0
      },
      "2004": {
        "total": 174,
        "wr": 65.4
      },
      "2005": {
        "total": 178,
        "wr": 65.8
      },
      "2006": {
        "total": 181,
        "wr": 66.3
      },
      "2007": {
        "total": 185,
        "wr": 66.7
      },
      "2008": {
        "total": 189,
        "wr": 67.2
      },
      "2009": {
        "total": 193,
        "wr": 67.7
      },
      "2010": {
        "total": 197,
        "wr": 68.2
      },
      "2011": {
        "total": 201,
        "wr": 68.7
      },
      "2012": {
        "total": 205,
        "wr": 69.2
      },
      "2013": {
        "total": 209,
        "wr": 69.7
      },
      "2014": {
        "total": 212,
        "wr": 70.2
      },
      "2015": {
        "total": 216,
        "wr": 70.6
      },
      "2016": {
        "total": 220,
        "wr": 71.1
      },
      "2017": {
        "total": 224,
        "wr": 71.5
      },
      "2018": {
        "total": 228,
        "wr": 71.9
      },
      "2019": {
        "total": 232,
        "wr": 72.2
      },
      "2020": {
        "total": 236,
        "wr": 72.5
      },
      "2021": {
        "total": 240,
        "wr": 72.8
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 7,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "153": {
    "nos_code": "153",
    "label": "Recovery of Veteran Benefits",
    "category": "money",
    "sub": "veteran benefits overpayment",
    "total": 3600,
    "mo": 9,
    "wr": 19.2,
    "sp": 41.3,
    "sol": "6 years statute",
    "af": "Hourly ($200-350/hr)",
    "rng": {
      "lo": 8,
      "md": 42,
      "hi": 280
    },
    "rp": 1.2,
    "ps": {
      "wr": 5,
      "total": 1486
    },
    "rr": {
      "wr": 21.2,
      "total": 2114
    },
    "cw": 24.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 41.3,
        "c": "#0D9488",
        "n": 1486
      },
      {
        "l": "Dismissed",
        "p": 26.4,
        "c": "#94A3B8",
        "n": 951
      },
      {
        "l": "Other",
        "p": 14.7,
        "c": "#475569",
        "n": 528
      },
      {
        "l": "Summary Judgment",
        "p": 11.7,
        "c": "#D97706",
        "n": 422
      },
      {
        "l": "Default Judgment",
        "p": 4.1,
        "c": "#DB2777",
        "n": 147
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 42
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 21
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.4,
      "trial_loss": 2.1,
      "dismiss": 54.8,
      "fav_set": 15.3,
      "set_mo": 8,
      "trial_med": "$21"
    },
    "circuit_rates": {
      "1": 20.2,
      "2": 18.7,
      "3": 20.7,
      "4": 19.2,
      "5": 17.2,
      "6": 19.7,
      "7": 20.2,
      "8": 19.2,
      "9": 17.7,
      "10": 19.7,
      "11": 18.2,
      "dc": 16.7
    },
    "state_rates": {
      "PA": 24.0,
      "MI": 22.4,
      "VI": 9.6,
      "MD": 16.8,
      "NC": 20.8,
      "TX": 12.8,
      "SC": 21.6,
      "VA": 17.6,
      "WV": 16.0,
      "LA": 15.2,
      "KY": 17.6,
      "MS": 14.4,
      "OH": 18.4,
      "TN": 17.6,
      "IL": 20.8,
      "IN": 21.6,
      "WI": 20.0,
      "AR": 20.0,
      "IA": 20.8,
      "MN": 20.0,
      "MO": 18.4,
      "NE": 21.6,
      "ND": 20.8,
      "SD": 20.8,
      "AK": 12.8,
      "AZ": 19.2,
      "CA": 12.0,
      "HI": 20.0,
      "ID": 19.2,
      "MT": 20.8,
      "NV": 11.2,
      "OR": 20.0,
      "WA": 17.6,
      "CO": 19.2,
      "KS": 21.6,
      "NM": 20.8,
      "OK": 20.0,
      "UT": 20.0,
      "WY": 22.4,
      "AL": 12.0,
      "FL": 12.8,
      "GA": 16.8,
      "DC": 13.6,
      "ME": 20.8,
      "MA": 19.2,
      "NH": 19.2,
      "RI": 20.8,
      "PR": 15.2,
      "CT": 20.0,
      "NY": 11.2,
      "VT": 22.4,
      "DE": 20.8,
      "NJ": 20.0,
      "GU": 24.0
    },
    "yearly_trend": {
      "1990": {
        "total": 90,
        "wr": 14.8
      },
      "1991": {
        "total": 92,
        "wr": 14.6
      },
      "1992": {
        "total": 95,
        "wr": 14.4
      },
      "1993": {
        "total": 98,
        "wr": 14.3
      },
      "1994": {
        "total": 101,
        "wr": 14.2
      },
      "1995": {
        "total": 104,
        "wr": 14.2
      },
      "1996": {
        "total": 107,
        "wr": 14.2
      },
      "1997": {
        "total": 110,
        "wr": 14.3
      },
      "1998": {
        "total": 113,
        "wr": 14.4
      },
      "1999": {
        "total": 116,
        "wr": 14.6
      },
      "2000": {
        "total": 119,
        "wr": 14.8
      },
      "2001": {
        "total": 121,
        "wr": 15.1
      },
      "2002": {
        "total": 124,
        "wr": 15.4
      },
      "2003": {
        "total": 127,
        "wr": 15.7
      },
      "2004": {
        "total": 130,
        "wr": 16.1
      },
      "2005": {
        "total": 133,
        "wr": 16.5
      },
      "2006": {
        "total": 136,
        "wr": 17.0
      },
      "2007": {
        "total": 139,
        "wr": 17.4
      },
      "2008": {
        "total": 142,
        "wr": 17.9
      },
      "2009": {
        "total": 145,
        "wr": 18.4
      },
      "2010": {
        "total": 148,
        "wr": 18.9
      },
      "2011": {
        "total": 150,
        "wr": 19.4
      },
      "2012": {
        "total": 153,
        "wr": 19.9
      },
      "2013": {
        "total": 156,
        "wr": 20.4
      },
      "2014": {
        "total": 159,
        "wr": 20.9
      },
      "2015": {
        "total": 162,
        "wr": 21.3
      },
      "2016": {
        "total": 165,
        "wr": 21.8
      },
      "2017": {
        "total": 168,
        "wr": 22.2
      },
      "2018": {
        "total": 171,
        "wr": 22.6
      },
      "2019": {
        "total": 174,
        "wr": 22.9
      },
      "2020": {
        "total": 177,
        "wr": 23.2
      },
      "2021": {
        "total": 180,
        "wr": 23.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
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
        "mo": 9,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "160": {
    "nos_code": "160",
    "label": "Stockholders Suits",
    "category": "money",
    "sub": "shareholder derivative suit",
    "total": 12400,
    "mo": 18,
    "wr": 24.5,
    "sp": 52.1,
    "sol": "4-6 years varies",
    "af": "Contingency or hourly",
    "rng": {
      "lo": 140,
      "md": 580,
      "hi": 3200
    },
    "rp": 3.8,
    "ps": {
      "wr": 6.5,
      "total": 6460
    },
    "rr": {
      "wr": 26.5,
      "total": 5940
    },
    "cw": 29.5,
    "ends": [
      {
        "l": "Settlement",
        "p": 52.1,
        "c": "#0D9488",
        "n": 6460
      },
      {
        "l": "Dismissed",
        "p": 21.6,
        "c": "#94A3B8",
        "n": 2673
      },
      {
        "l": "Other",
        "p": 12.0,
        "c": "#475569",
        "n": 1485
      },
      {
        "l": "Summary Judgment",
        "p": 9.6,
        "c": "#D97706",
        "n": 1188
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 415
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 118
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 59
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.2,
      "trial_loss": 1.8,
      "dismiss": 41.2,
      "fav_set": 29.3,
      "set_mo": 15,
      "trial_med": "$290"
    },
    "circuit_rates": {
      "1": 25.5,
      "2": 24.0,
      "3": 26.0,
      "4": 24.5,
      "5": 22.5,
      "6": 25.0,
      "7": 25.5,
      "8": 24.5,
      "9": 23.0,
      "10": 25.0,
      "11": 23.5,
      "dc": 22.0
    },
    "state_rates": {
      "PA": 29.3,
      "MI": 27.7,
      "VI": 14.9,
      "MD": 22.1,
      "NC": 26.1,
      "TX": 18.1,
      "SC": 26.9,
      "VA": 22.9,
      "WV": 21.3,
      "LA": 20.5,
      "KY": 22.9,
      "MS": 19.7,
      "OH": 23.7,
      "TN": 22.9,
      "IL": 26.1,
      "IN": 26.9,
      "WI": 25.3,
      "AR": 25.3,
      "IA": 26.1,
      "MN": 25.3,
      "MO": 23.7,
      "NE": 26.9,
      "ND": 26.1,
      "SD": 26.1,
      "AK": 18.1,
      "AZ": 24.5,
      "CA": 17.3,
      "HI": 25.3,
      "ID": 24.5,
      "MT": 26.1,
      "NV": 16.5,
      "OR": 25.3,
      "WA": 22.9,
      "CO": 24.5,
      "KS": 26.9,
      "NM": 26.1,
      "OK": 25.3,
      "UT": 25.3,
      "WY": 27.7,
      "AL": 17.3,
      "FL": 18.1,
      "GA": 22.1,
      "DC": 18.9,
      "ME": 26.1,
      "MA": 24.5,
      "NH": 24.5,
      "RI": 26.1,
      "PR": 20.5,
      "CT": 25.3,
      "NY": 16.5,
      "VT": 27.7,
      "DE": 26.1,
      "NJ": 25.3,
      "GU": 29.3
    },
    "yearly_trend": {
      "1990": {
        "total": 310,
        "wr": 20.1
      },
      "1991": {
        "total": 320,
        "wr": 19.9
      },
      "1992": {
        "total": 330,
        "wr": 19.7
      },
      "1993": {
        "total": 340,
        "wr": 19.6
      },
      "1994": {
        "total": 350,
        "wr": 19.5
      },
      "1995": {
        "total": 360,
        "wr": 19.5
      },
      "1996": {
        "total": 370,
        "wr": 19.5
      },
      "1997": {
        "total": 380,
        "wr": 19.6
      },
      "1998": {
        "total": 390,
        "wr": 19.7
      },
      "1999": {
        "total": 400,
        "wr": 19.9
      },
      "2000": {
        "total": 410,
        "wr": 20.1
      },
      "2001": {
        "total": 420,
        "wr": 20.4
      },
      "2002": {
        "total": 430,
        "wr": 20.7
      },
      "2003": {
        "total": 440,
        "wr": 21.0
      },
      "2004": {
        "total": 450,
        "wr": 21.4
      },
      "2005": {
        "total": 460,
        "wr": 21.8
      },
      "2006": {
        "total": 470,
        "wr": 22.3
      },
      "2007": {
        "total": 480,
        "wr": 22.7
      },
      "2008": {
        "total": 490,
        "wr": 23.2
      },
      "2009": {
        "total": 500,
        "wr": 23.7
      },
      "2010": {
        "total": 510,
        "wr": 24.2
      },
      "2011": {
        "total": 520,
        "wr": 24.7
      },
      "2012": {
        "total": 530,
        "wr": 25.2
      },
      "2013": {
        "total": 540,
        "wr": 25.7
      },
      "2014": {
        "total": 550,
        "wr": 26.2
      },
      "2015": {
        "total": 560,
        "wr": 26.6
      },
      "2016": {
        "total": 570,
        "wr": 27.1
      },
      "2017": {
        "total": 580,
        "wr": 27.5
      },
      "2018": {
        "total": 590,
        "wr": 27.9
      },
      "2019": {
        "total": 600,
        "wr": 28.2
      },
      "2020": {
        "total": 610,
        "wr": 28.5
      },
      "2021": {
        "total": 620,
        "wr": 28.8
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 6,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 9,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 12,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 18,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "196": {
    "nos_code": "196",
    "label": "Franchise",
    "category": "money",
    "sub": "franchise dispute",
    "total": 5600,
    "mo": 11,
    "wr": 55.8,
    "sp": 48.3,
    "sol": "4-5 years",
    "af": "Hourly ($300-500/hr)",
    "rng": {
      "lo": 55,
      "md": 220,
      "hi": 1200
    },
    "rp": 2.6,
    "ps": {
      "wr": 37.8,
      "total": 2704
    },
    "rr": {
      "wr": 57.8,
      "total": 2896
    },
    "cw": 60.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.3,
        "c": "#0D9488",
        "n": 2704
      },
      {
        "l": "Dismissed",
        "p": 23.3,
        "c": "#94A3B8",
        "n": 1303
      },
      {
        "l": "Other",
        "p": 12.9,
        "c": "#475569",
        "n": 724
      },
      {
        "l": "Summary Judgment",
        "p": 10.3,
        "c": "#D97706",
        "n": 579
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 202
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 57
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 28
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.9,
      "trial_loss": 1.4,
      "dismiss": 20.1,
      "fav_set": 52.1,
      "set_mo": 11,
      "trial_med": "$110"
    },
    "circuit_rates": {
      "1": 56.8,
      "2": 55.3,
      "3": 57.3,
      "4": 55.8,
      "5": 53.8,
      "6": 56.3,
      "7": 56.8,
      "8": 55.8,
      "9": 54.3,
      "10": 56.3,
      "11": 54.8,
      "dc": 53.3
    },
    "state_rates": {
      "PA": 60.6,
      "MI": 59.0,
      "VI": 46.2,
      "MD": 53.4,
      "NC": 57.4,
      "TX": 49.4,
      "SC": 58.2,
      "VA": 54.2,
      "WV": 52.6,
      "LA": 51.8,
      "KY": 54.2,
      "MS": 51.0,
      "OH": 55.0,
      "TN": 54.2,
      "IL": 57.4,
      "IN": 58.2,
      "WI": 56.6,
      "AR": 56.6,
      "IA": 57.4,
      "MN": 56.6,
      "MO": 55.0,
      "NE": 58.2,
      "ND": 57.4,
      "SD": 57.4,
      "AK": 49.4,
      "AZ": 55.8,
      "CA": 48.6,
      "HI": 56.6,
      "ID": 55.8,
      "MT": 57.4,
      "NV": 47.8,
      "OR": 56.6,
      "WA": 54.2,
      "CO": 55.8,
      "KS": 58.2,
      "NM": 57.4,
      "OK": 56.6,
      "UT": 56.6,
      "WY": 59.0,
      "AL": 48.6,
      "FL": 49.4,
      "GA": 53.4,
      "DC": 50.2,
      "ME": 57.4,
      "MA": 55.8,
      "NH": 55.8,
      "RI": 57.4,
      "PR": 51.8,
      "CT": 56.6,
      "NY": 47.8,
      "VT": 59.0,
      "DE": 57.4,
      "NJ": 56.6,
      "GU": 60.6
    },
    "yearly_trend": {
      "1990": {
        "total": 140,
        "wr": 51.4
      },
      "1991": {
        "total": 144,
        "wr": 51.2
      },
      "1992": {
        "total": 149,
        "wr": 51.0
      },
      "1993": {
        "total": 153,
        "wr": 50.9
      },
      "1994": {
        "total": 158,
        "wr": 50.8
      },
      "1995": {
        "total": 162,
        "wr": 50.8
      },
      "1996": {
        "total": 167,
        "wr": 50.8
      },
      "1997": {
        "total": 171,
        "wr": 50.9
      },
      "1998": {
        "total": 176,
        "wr": 51.0
      },
      "1999": {
        "total": 180,
        "wr": 51.2
      },
      "2000": {
        "total": 185,
        "wr": 51.4
      },
      "2001": {
        "total": 189,
        "wr": 51.7
      },
      "2002": {
        "total": 194,
        "wr": 52.0
      },
      "2003": {
        "total": 198,
        "wr": 52.3
      },
      "2004": {
        "total": 203,
        "wr": 52.7
      },
      "2005": {
        "total": 207,
        "wr": 53.1
      },
      "2006": {
        "total": 212,
        "wr": 53.6
      },
      "2007": {
        "total": 216,
        "wr": 54.0
      },
      "2008": {
        "total": 221,
        "wr": 54.5
      },
      "2009": {
        "total": 225,
        "wr": 55.0
      },
      "2010": {
        "total": 230,
        "wr": 55.5
      },
      "2011": {
        "total": 234,
        "wr": 56.0
      },
      "2012": {
        "total": 239,
        "wr": 56.5
      },
      "2013": {
        "total": 243,
        "wr": 57.0
      },
      "2014": {
        "total": 248,
        "wr": 57.5
      },
      "2015": {
        "total": 252,
        "wr": 57.9
      },
      "2016": {
        "total": 257,
        "wr": 58.4
      },
      "2017": {
        "total": 261,
        "wr": 58.8
      },
      "2018": {
        "total": 266,
        "wr": 59.2
      },
      "2019": {
        "total": 270,
        "wr": 59.5
      },
      "2020": {
        "total": 275,
        "wr": 59.8
      },
      "2021": {
        "total": 280,
        "wr": 60.1
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "210": {
    "nos_code": "210",
    "label": "Land Condemnation",
    "category": "housing",
    "sub": "eminent domain/condemnation",
    "total": 3800,
    "mo": 12,
    "wr": 42.1,
    "sp": 48.2,
    "sol": "Varies by state eminent domain law",
    "af": "Hourly ($250-400/hr)",
    "rng": {
      "lo": 120,
      "md": 520,
      "hi": 2800
    },
    "rp": 1.4,
    "ps": {
      "wr": 24.1,
      "total": 1831
    },
    "rr": {
      "wr": 44.1,
      "total": 1969
    },
    "cw": 47.1,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.2,
        "c": "#0D9488",
        "n": 1831
      },
      {
        "l": "Dismissed",
        "p": 23.3,
        "c": "#94A3B8",
        "n": 886
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 492
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 393
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 137
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 39
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 19
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.8,
      "trial_loss": 1.2,
      "dismiss": 22.3,
      "fav_set": 41.2,
      "set_mo": 12,
      "trial_med": "$260"
    },
    "circuit_rates": {
      "1": 43.1,
      "2": 41.6,
      "3": 43.6,
      "4": 42.1,
      "5": 40.1,
      "6": 42.6,
      "7": 43.1,
      "8": 42.1,
      "9": 40.6,
      "10": 42.6,
      "11": 41.1,
      "dc": 39.6
    },
    "state_rates": {
      "PA": 46.9,
      "MI": 45.3,
      "VI": 32.5,
      "MD": 39.7,
      "NC": 43.7,
      "TX": 35.7,
      "SC": 44.5,
      "VA": 40.5,
      "WV": 38.9,
      "LA": 38.1,
      "KY": 40.5,
      "MS": 37.3,
      "OH": 41.3,
      "TN": 40.5,
      "IL": 43.7,
      "IN": 44.5,
      "WI": 42.9,
      "AR": 42.9,
      "IA": 43.7,
      "MN": 42.9,
      "MO": 41.3,
      "NE": 44.5,
      "ND": 43.7,
      "SD": 43.7,
      "AK": 35.7,
      "AZ": 42.1,
      "CA": 34.9,
      "HI": 42.9,
      "ID": 42.1,
      "MT": 43.7,
      "NV": 34.1,
      "OR": 42.9,
      "WA": 40.5,
      "CO": 42.1,
      "KS": 44.5,
      "NM": 43.7,
      "OK": 42.9,
      "UT": 42.9,
      "WY": 45.3,
      "AL": 34.9,
      "FL": 35.7,
      "GA": 39.7,
      "DC": 36.5,
      "ME": 43.7,
      "MA": 42.1,
      "NH": 42.1,
      "RI": 43.7,
      "PR": 38.1,
      "CT": 42.9,
      "NY": 34.1,
      "VT": 45.3,
      "DE": 43.7,
      "NJ": 42.9,
      "GU": 46.9
    },
    "yearly_trend": {
      "1990": {
        "total": 95,
        "wr": 37.7
      },
      "1991": {
        "total": 98,
        "wr": 37.5
      },
      "1992": {
        "total": 101,
        "wr": 37.3
      },
      "1993": {
        "total": 104,
        "wr": 37.2
      },
      "1994": {
        "total": 107,
        "wr": 37.1
      },
      "1995": {
        "total": 110,
        "wr": 37.1
      },
      "1996": {
        "total": 113,
        "wr": 37.1
      },
      "1997": {
        "total": 116,
        "wr": 37.2
      },
      "1998": {
        "total": 119,
        "wr": 37.3
      },
      "1999": {
        "total": 122,
        "wr": 37.5
      },
      "2000": {
        "total": 125,
        "wr": 37.7
      },
      "2001": {
        "total": 128,
        "wr": 38.0
      },
      "2002": {
        "total": 131,
        "wr": 38.3
      },
      "2003": {
        "total": 134,
        "wr": 38.6
      },
      "2004": {
        "total": 137,
        "wr": 39.0
      },
      "2005": {
        "total": 140,
        "wr": 39.4
      },
      "2006": {
        "total": 144,
        "wr": 39.9
      },
      "2007": {
        "total": 147,
        "wr": 40.3
      },
      "2008": {
        "total": 150,
        "wr": 40.8
      },
      "2009": {
        "total": 153,
        "wr": 41.3
      },
      "2010": {
        "total": 156,
        "wr": 41.8
      },
      "2011": {
        "total": 159,
        "wr": 42.3
      },
      "2012": {
        "total": 162,
        "wr": 42.8
      },
      "2013": {
        "total": 165,
        "wr": 43.3
      },
      "2014": {
        "total": 168,
        "wr": 43.8
      },
      "2015": {
        "total": 171,
        "wr": 44.2
      },
      "2016": {
        "total": 174,
        "wr": 44.7
      },
      "2017": {
        "total": 177,
        "wr": 45.1
      },
      "2018": {
        "total": 180,
        "wr": 45.5
      },
      "2019": {
        "total": 183,
        "wr": 45.8
      },
      "2020": {
        "total": 186,
        "wr": 46.1
      },
      "2021": {
        "total": 190,
        "wr": 46.4
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
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
        "mo": 12,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "240": {
    "nos_code": "240",
    "label": "Torts to Land",
    "category": "housing",
    "sub": "property torts/nuisance",
    "total": 8600,
    "mo": 9,
    "wr": 45.2,
    "sp": 51.3,
    "sol": "3-4 years",
    "af": "Contingency or hourly",
    "rng": {
      "lo": 35,
      "md": 150,
      "hi": 920
    },
    "rp": 2.8,
    "ps": {
      "wr": 27.200000000000003,
      "total": 4411
    },
    "rr": {
      "wr": 47.2,
      "total": 4189
    },
    "cw": 50.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 51.3,
        "c": "#0D9488",
        "n": 4411
      },
      {
        "l": "Dismissed",
        "p": 21.9,
        "c": "#94A3B8",
        "n": 1885
      },
      {
        "l": "Other",
        "p": 12.2,
        "c": "#475569",
        "n": 1047
      },
      {
        "l": "Summary Judgment",
        "p": 9.7,
        "c": "#D97706",
        "n": 837
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 293
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 83
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 41
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.1,
      "trial_loss": 1.8,
      "dismiss": 19.4,
      "fav_set": 48.3,
      "set_mo": 9,
      "trial_med": "$75"
    },
    "circuit_rates": {
      "1": 46.2,
      "2": 44.7,
      "3": 46.7,
      "4": 45.2,
      "5": 43.2,
      "6": 45.7,
      "7": 46.2,
      "8": 45.2,
      "9": 43.7,
      "10": 45.7,
      "11": 44.2,
      "dc": 42.7
    },
    "state_rates": {
      "PA": 50.0,
      "MI": 48.4,
      "VI": 35.6,
      "MD": 42.8,
      "NC": 46.8,
      "TX": 38.8,
      "SC": 47.6,
      "VA": 43.6,
      "WV": 42.0,
      "LA": 41.2,
      "KY": 43.6,
      "MS": 40.4,
      "OH": 44.4,
      "TN": 43.6,
      "IL": 46.8,
      "IN": 47.6,
      "WI": 46.0,
      "AR": 46.0,
      "IA": 46.8,
      "MN": 46.0,
      "MO": 44.4,
      "NE": 47.6,
      "ND": 46.8,
      "SD": 46.8,
      "AK": 38.8,
      "AZ": 45.2,
      "CA": 38.0,
      "HI": 46.0,
      "ID": 45.2,
      "MT": 46.8,
      "NV": 37.2,
      "OR": 46.0,
      "WA": 43.6,
      "CO": 45.2,
      "KS": 47.6,
      "NM": 46.8,
      "OK": 46.0,
      "UT": 46.0,
      "WY": 48.4,
      "AL": 38.0,
      "FL": 38.8,
      "GA": 42.8,
      "DC": 39.6,
      "ME": 46.8,
      "MA": 45.2,
      "NH": 45.2,
      "RI": 46.8,
      "PR": 41.2,
      "CT": 46.0,
      "NY": 37.2,
      "VT": 48.4,
      "DE": 46.8,
      "NJ": 46.0,
      "GU": 50.0
    },
    "yearly_trend": {
      "1990": {
        "total": 215,
        "wr": 40.8
      },
      "1991": {
        "total": 221,
        "wr": 40.6
      },
      "1992": {
        "total": 228,
        "wr": 40.4
      },
      "1993": {
        "total": 235,
        "wr": 40.3
      },
      "1994": {
        "total": 242,
        "wr": 40.2
      },
      "1995": {
        "total": 249,
        "wr": 40.2
      },
      "1996": {
        "total": 256,
        "wr": 40.2
      },
      "1997": {
        "total": 263,
        "wr": 40.3
      },
      "1998": {
        "total": 270,
        "wr": 40.4
      },
      "1999": {
        "total": 277,
        "wr": 40.6
      },
      "2000": {
        "total": 284,
        "wr": 40.8
      },
      "2001": {
        "total": 291,
        "wr": 41.1
      },
      "2002": {
        "total": 298,
        "wr": 41.4
      },
      "2003": {
        "total": 305,
        "wr": 41.7
      },
      "2004": {
        "total": 312,
        "wr": 42.1
      },
      "2005": {
        "total": 319,
        "wr": 42.5
      },
      "2006": {
        "total": 325,
        "wr": 43.0
      },
      "2007": {
        "total": 332,
        "wr": 43.4
      },
      "2008": {
        "total": 339,
        "wr": 43.9
      },
      "2009": {
        "total": 346,
        "wr": 44.4
      },
      "2010": {
        "total": 353,
        "wr": 44.9
      },
      "2011": {
        "total": 360,
        "wr": 45.4
      },
      "2012": {
        "total": 367,
        "wr": 45.9
      },
      "2013": {
        "total": 374,
        "wr": 46.4
      },
      "2014": {
        "total": 381,
        "wr": 46.9
      },
      "2015": {
        "total": 388,
        "wr": 47.3
      },
      "2016": {
        "total": 395,
        "wr": 47.8
      },
      "2017": {
        "total": 402,
        "wr": 48.2
      },
      "2018": {
        "total": 409,
        "wr": 48.6
      },
      "2019": {
        "total": 416,
        "wr": 48.9
      },
      "2020": {
        "total": 423,
        "wr": 49.2
      },
      "2021": {
        "total": 430,
        "wr": 49.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
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
        "mo": 9,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "245": {
    "nos_code": "245",
    "label": "Tort Product Liability",
    "category": "housing",
    "sub": "property product liability",
    "total": 4200,
    "mo": 15,
    "wr": 28.4,
    "sp": 49.2,
    "sol": "3-5 years",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 75,
      "md": 310,
      "hi": 1800
    },
    "rp": 1.6,
    "ps": {
      "wr": 10.399999999999999,
      "total": 2066
    },
    "rr": {
      "wr": 30.4,
      "total": 2134
    },
    "cw": 33.4,
    "ends": [
      {
        "l": "Settlement",
        "p": 49.2,
        "c": "#0D9488",
        "n": 2066
      },
      {
        "l": "Dismissed",
        "p": 22.9,
        "c": "#94A3B8",
        "n": 960
      },
      {
        "l": "Other",
        "p": 12.7,
        "c": "#475569",
        "n": 533
      },
      {
        "l": "Summary Judgment",
        "p": 10.2,
        "c": "#D97706",
        "n": 426
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 149
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 42
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 21
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.9,
      "trial_loss": 1.4,
      "dismiss": 18.6,
      "fav_set": 34.2,
      "set_mo": 14,
      "trial_med": "$155"
    },
    "circuit_rates": {
      "1": 29.4,
      "2": 27.9,
      "3": 29.9,
      "4": 28.4,
      "5": 26.4,
      "6": 28.9,
      "7": 29.4,
      "8": 28.4,
      "9": 26.9,
      "10": 28.9,
      "11": 27.4,
      "dc": 25.9
    },
    "state_rates": {
      "PA": 33.2,
      "MI": 31.6,
      "VI": 18.8,
      "MD": 26.0,
      "NC": 30.0,
      "TX": 22.0,
      "SC": 30.8,
      "VA": 26.8,
      "WV": 25.2,
      "LA": 24.4,
      "KY": 26.8,
      "MS": 23.6,
      "OH": 27.6,
      "TN": 26.8,
      "IL": 30.0,
      "IN": 30.8,
      "WI": 29.2,
      "AR": 29.2,
      "IA": 30.0,
      "MN": 29.2,
      "MO": 27.6,
      "NE": 30.8,
      "ND": 30.0,
      "SD": 30.0,
      "AK": 22.0,
      "AZ": 28.4,
      "CA": 21.2,
      "HI": 29.2,
      "ID": 28.4,
      "MT": 30.0,
      "NV": 20.4,
      "OR": 29.2,
      "WA": 26.8,
      "CO": 28.4,
      "KS": 30.8,
      "NM": 30.0,
      "OK": 29.2,
      "UT": 29.2,
      "WY": 31.6,
      "AL": 21.2,
      "FL": 22.0,
      "GA": 26.0,
      "DC": 22.8,
      "ME": 30.0,
      "MA": 28.4,
      "NH": 28.4,
      "RI": 30.0,
      "PR": 24.4,
      "CT": 29.2,
      "NY": 20.4,
      "VT": 31.6,
      "DE": 30.0,
      "NJ": 29.2,
      "GU": 33.2
    },
    "yearly_trend": {
      "1990": {
        "total": 105,
        "wr": 24.0
      },
      "1991": {
        "total": 108,
        "wr": 23.8
      },
      "1992": {
        "total": 111,
        "wr": 23.6
      },
      "1993": {
        "total": 115,
        "wr": 23.5
      },
      "1994": {
        "total": 118,
        "wr": 23.4
      },
      "1995": {
        "total": 121,
        "wr": 23.4
      },
      "1996": {
        "total": 125,
        "wr": 23.4
      },
      "1997": {
        "total": 128,
        "wr": 23.5
      },
      "1998": {
        "total": 132,
        "wr": 23.6
      },
      "1999": {
        "total": 135,
        "wr": 23.8
      },
      "2000": {
        "total": 138,
        "wr": 24.0
      },
      "2001": {
        "total": 142,
        "wr": 24.3
      },
      "2002": {
        "total": 145,
        "wr": 24.6
      },
      "2003": {
        "total": 149,
        "wr": 24.9
      },
      "2004": {
        "total": 152,
        "wr": 25.3
      },
      "2005": {
        "total": 155,
        "wr": 25.7
      },
      "2006": {
        "total": 159,
        "wr": 26.2
      },
      "2007": {
        "total": 162,
        "wr": 26.6
      },
      "2008": {
        "total": 165,
        "wr": 27.1
      },
      "2009": {
        "total": 169,
        "wr": 27.6
      },
      "2010": {
        "total": 172,
        "wr": 28.1
      },
      "2011": {
        "total": 176,
        "wr": 28.6
      },
      "2012": {
        "total": 179,
        "wr": 29.1
      },
      "2013": {
        "total": 182,
        "wr": 29.6
      },
      "2014": {
        "total": 186,
        "wr": 30.1
      },
      "2015": {
        "total": 189,
        "wr": 30.5
      },
      "2016": {
        "total": 193,
        "wr": 31.0
      },
      "2017": {
        "total": 196,
        "wr": 31.4
      },
      "2018": {
        "total": 199,
        "wr": 31.8
      },
      "2019": {
        "total": 203,
        "wr": 32.1
      },
      "2020": {
        "total": 206,
        "wr": 32.4
      },
      "2021": {
        "total": 210,
        "wr": 32.7
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 5,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 7,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 10,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 15,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "290": {
    "nos_code": "290",
    "label": "All Other Real Property",
    "category": "housing",
    "sub": "other property dispute",
    "total": 15800,
    "mo": 10,
    "wr": 48.3,
    "sp": 52.1,
    "sol": "3-4 years varies",
    "af": "Hourly ($250-400/hr)",
    "rng": {
      "lo": 65,
      "md": 280,
      "hi": 1600
    },
    "rp": 4.2,
    "ps": {
      "wr": 30.299999999999997,
      "total": 8231
    },
    "rr": {
      "wr": 50.3,
      "total": 7569
    },
    "cw": 53.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 52.1,
        "c": "#0D9488",
        "n": 8231
      },
      {
        "l": "Dismissed",
        "p": 21.6,
        "c": "#94A3B8",
        "n": 3406
      },
      {
        "l": "Other",
        "p": 12.0,
        "c": "#475569",
        "n": 1892
      },
      {
        "l": "Summary Judgment",
        "p": 9.6,
        "c": "#D97706",
        "n": 1513
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 529
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 151
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 75
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.6,
      "trial_loss": 1.3,
      "dismiss": 21.2,
      "fav_set": 49.2,
      "set_mo": 10,
      "trial_med": "$140"
    },
    "circuit_rates": {
      "1": 49.3,
      "2": 47.8,
      "3": 49.8,
      "4": 48.3,
      "5": 46.3,
      "6": 48.8,
      "7": 49.3,
      "8": 48.3,
      "9": 46.8,
      "10": 48.8,
      "11": 47.3,
      "dc": 45.8
    },
    "state_rates": {
      "PA": 53.1,
      "MI": 51.5,
      "VI": 38.7,
      "MD": 45.9,
      "NC": 49.9,
      "TX": 41.9,
      "SC": 50.7,
      "VA": 46.7,
      "WV": 45.1,
      "LA": 44.3,
      "KY": 46.7,
      "MS": 43.5,
      "OH": 47.5,
      "TN": 46.7,
      "IL": 49.9,
      "IN": 50.7,
      "WI": 49.1,
      "AR": 49.1,
      "IA": 49.9,
      "MN": 49.1,
      "MO": 47.5,
      "NE": 50.7,
      "ND": 49.9,
      "SD": 49.9,
      "AK": 41.9,
      "AZ": 48.3,
      "CA": 41.1,
      "HI": 49.1,
      "ID": 48.3,
      "MT": 49.9,
      "NV": 40.3,
      "OR": 49.1,
      "WA": 46.7,
      "CO": 48.3,
      "KS": 50.7,
      "NM": 49.9,
      "OK": 49.1,
      "UT": 49.1,
      "WY": 51.5,
      "AL": 41.1,
      "FL": 41.9,
      "GA": 45.9,
      "DC": 42.7,
      "ME": 49.9,
      "MA": 48.3,
      "NH": 48.3,
      "RI": 49.9,
      "PR": 44.3,
      "CT": 49.1,
      "NY": 40.3,
      "VT": 51.5,
      "DE": 49.9,
      "NJ": 49.1,
      "GU": 53.1
    },
    "yearly_trend": {
      "1990": {
        "total": 395,
        "wr": 43.9
      },
      "1991": {
        "total": 407,
        "wr": 43.7
      },
      "1992": {
        "total": 420,
        "wr": 43.5
      },
      "1993": {
        "total": 433,
        "wr": 43.4
      },
      "1994": {
        "total": 445,
        "wr": 43.3
      },
      "1995": {
        "total": 458,
        "wr": 43.3
      },
      "1996": {
        "total": 471,
        "wr": 43.3
      },
      "1997": {
        "total": 484,
        "wr": 43.4
      },
      "1998": {
        "total": 496,
        "wr": 43.5
      },
      "1999": {
        "total": 509,
        "wr": 43.7
      },
      "2000": {
        "total": 522,
        "wr": 43.9
      },
      "2001": {
        "total": 535,
        "wr": 44.2
      },
      "2002": {
        "total": 547,
        "wr": 44.5
      },
      "2003": {
        "total": 560,
        "wr": 44.8
      },
      "2004": {
        "total": 573,
        "wr": 45.2
      },
      "2005": {
        "total": 586,
        "wr": 45.6
      },
      "2006": {
        "total": 598,
        "wr": 46.1
      },
      "2007": {
        "total": 611,
        "wr": 46.5
      },
      "2008": {
        "total": 624,
        "wr": 47.0
      },
      "2009": {
        "total": 637,
        "wr": 47.5
      },
      "2010": {
        "total": 649,
        "wr": 48.0
      },
      "2011": {
        "total": 662,
        "wr": 48.5
      },
      "2012": {
        "total": 675,
        "wr": 49.0
      },
      "2013": {
        "total": 688,
        "wr": 49.5
      },
      "2014": {
        "total": 700,
        "wr": 50.0
      },
      "2015": {
        "total": 713,
        "wr": 50.4
      },
      "2016": {
        "total": 726,
        "wr": 50.9
      },
      "2017": {
        "total": 739,
        "wr": 51.3
      },
      "2018": {
        "total": 751,
        "wr": 51.7
      },
      "2019": {
        "total": 764,
        "wr": 52.0
      },
      "2020": {
        "total": 777,
        "wr": 52.3
      },
      "2021": {
        "total": 790,
        "wr": 52.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "310": {
    "nos_code": "310",
    "label": "Airplane",
    "category": "injury",
    "sub": "airplane injury",
    "total": 3200,
    "mo": 18,
    "wr": 38.5,
    "sp": 65.2,
    "sol": "2-3 years",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 280,
      "md": 950,
      "hi": 5200
    },
    "rp": 2.1,
    "ps": {
      "wr": 20.5,
      "total": 2086
    },
    "rr": {
      "wr": 40.5,
      "total": 1114
    },
    "cw": 43.5,
    "ends": [
      {
        "l": "Settlement",
        "p": 65.2,
        "c": "#0D9488",
        "n": 2086
      },
      {
        "l": "Dismissed",
        "p": 15.7,
        "c": "#94A3B8",
        "n": 501
      },
      {
        "l": "Other",
        "p": 8.7,
        "c": "#475569",
        "n": 278
      },
      {
        "l": "Summary Judgment",
        "p": 7.0,
        "c": "#D97706",
        "n": 222
      },
      {
        "l": "Default Judgment",
        "p": 2.4,
        "c": "#DB2777",
        "n": 77
      },
      {
        "l": "Trial",
        "p": 0.7,
        "c": "#7C3AED",
        "n": 22
      },
      {
        "l": "Consent",
        "p": 0.3,
        "c": "#2563EB",
        "n": 11
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 4.2,
      "trial_loss": 2.1,
      "dismiss": 14.8,
      "fav_set": 58.9,
      "set_mo": 18,
      "trial_med": "$475"
    },
    "circuit_rates": {
      "1": 39.5,
      "2": 38.0,
      "3": 40.0,
      "4": 38.5,
      "5": 36.5,
      "6": 39.0,
      "7": 39.5,
      "8": 38.5,
      "9": 37.0,
      "10": 39.0,
      "11": 37.5,
      "dc": 36.0
    },
    "state_rates": {
      "PA": 43.3,
      "MI": 41.7,
      "VI": 28.9,
      "MD": 36.1,
      "NC": 40.1,
      "TX": 32.1,
      "SC": 40.9,
      "VA": 36.9,
      "WV": 35.3,
      "LA": 34.5,
      "KY": 36.9,
      "MS": 33.7,
      "OH": 37.7,
      "TN": 36.9,
      "IL": 40.1,
      "IN": 40.9,
      "WI": 39.3,
      "AR": 39.3,
      "IA": 40.1,
      "MN": 39.3,
      "MO": 37.7,
      "NE": 40.9,
      "ND": 40.1,
      "SD": 40.1,
      "AK": 32.1,
      "AZ": 38.5,
      "CA": 31.3,
      "HI": 39.3,
      "ID": 38.5,
      "MT": 40.1,
      "NV": 30.5,
      "OR": 39.3,
      "WA": 36.9,
      "CO": 38.5,
      "KS": 40.9,
      "NM": 40.1,
      "OK": 39.3,
      "UT": 39.3,
      "WY": 41.7,
      "AL": 31.3,
      "FL": 32.1,
      "GA": 36.1,
      "DC": 32.9,
      "ME": 40.1,
      "MA": 38.5,
      "NH": 38.5,
      "RI": 40.1,
      "PR": 34.5,
      "CT": 39.3,
      "NY": 30.5,
      "VT": 41.7,
      "DE": 40.1,
      "NJ": 39.3,
      "GU": 43.3
    },
    "yearly_trend": {
      "1990": {
        "total": 80,
        "wr": 34.1
      },
      "1991": {
        "total": 82,
        "wr": 33.9
      },
      "1992": {
        "total": 85,
        "wr": 33.7
      },
      "1993": {
        "total": 87,
        "wr": 33.6
      },
      "1994": {
        "total": 90,
        "wr": 33.5
      },
      "1995": {
        "total": 92,
        "wr": 33.5
      },
      "1996": {
        "total": 95,
        "wr": 33.5
      },
      "1997": {
        "total": 98,
        "wr": 33.6
      },
      "1998": {
        "total": 100,
        "wr": 33.7
      },
      "1999": {
        "total": 103,
        "wr": 33.9
      },
      "2000": {
        "total": 105,
        "wr": 34.1
      },
      "2001": {
        "total": 108,
        "wr": 34.4
      },
      "2002": {
        "total": 110,
        "wr": 34.7
      },
      "2003": {
        "total": 113,
        "wr": 35.0
      },
      "2004": {
        "total": 116,
        "wr": 35.4
      },
      "2005": {
        "total": 118,
        "wr": 35.8
      },
      "2006": {
        "total": 121,
        "wr": 36.3
      },
      "2007": {
        "total": 123,
        "wr": 36.7
      },
      "2008": {
        "total": 126,
        "wr": 37.2
      },
      "2009": {
        "total": 129,
        "wr": 37.7
      },
      "2010": {
        "total": 131,
        "wr": 38.2
      },
      "2011": {
        "total": 134,
        "wr": 38.7
      },
      "2012": {
        "total": 136,
        "wr": 39.2
      },
      "2013": {
        "total": 139,
        "wr": 39.7
      },
      "2014": {
        "total": 141,
        "wr": 40.2
      },
      "2015": {
        "total": 144,
        "wr": 40.6
      },
      "2016": {
        "total": 147,
        "wr": 41.1
      },
      "2017": {
        "total": 149,
        "wr": 41.5
      },
      "2018": {
        "total": 152,
        "wr": 41.9
      },
      "2019": {
        "total": 154,
        "wr": 42.2
      },
      "2020": {
        "total": 157,
        "wr": 42.5
      },
      "2021": {
        "total": 160,
        "wr": 42.8
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 6,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 9,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 12,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 18,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "315": {
    "nos_code": "315",
    "label": "Airplane Product",
    "category": "injury",
    "sub": "airplane product liability",
    "total": 1840,
    "mo": 22,
    "wr": 12.6,
    "sp": 48.3,
    "sol": "3-5 years",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 420,
      "md": 1200,
      "hi": 8400
    },
    "rp": 0.8,
    "ps": {
      "wr": 5,
      "total": 888
    },
    "rr": {
      "wr": 14.6,
      "total": 952
    },
    "cw": 17.6,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.3,
        "c": "#0D9488",
        "n": 888
      },
      {
        "l": "Dismissed",
        "p": 23.3,
        "c": "#94A3B8",
        "n": 428
      },
      {
        "l": "Other",
        "p": 12.9,
        "c": "#475569",
        "n": 238
      },
      {
        "l": "Summary Judgment",
        "p": 10.3,
        "c": "#D97706",
        "n": 190
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 66
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 19
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 9
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.3,
      "trial_loss": 0.4,
      "dismiss": 18.2,
      "fav_set": 22.1,
      "set_mo": 20,
      "trial_med": "$600"
    },
    "circuit_rates": {
      "1": 13.6,
      "2": 12.1,
      "3": 14.1,
      "4": 12.6,
      "5": 10.6,
      "6": 13.1,
      "7": 13.6,
      "8": 12.6,
      "9": 11.1,
      "10": 13.1,
      "11": 11.6,
      "dc": 10.1
    },
    "state_rates": {
      "PA": 17.4,
      "MI": 15.8,
      "VI": 5,
      "MD": 10.2,
      "NC": 14.2,
      "TX": 6.2,
      "SC": 15.0,
      "VA": 11.0,
      "WV": 9.4,
      "LA": 8.6,
      "KY": 11.0,
      "MS": 7.8,
      "OH": 11.8,
      "TN": 11.0,
      "IL": 14.2,
      "IN": 15.0,
      "WI": 13.4,
      "AR": 13.4,
      "IA": 14.2,
      "MN": 13.4,
      "MO": 11.8,
      "NE": 15.0,
      "ND": 14.2,
      "SD": 14.2,
      "AK": 6.2,
      "AZ": 12.6,
      "CA": 5.4,
      "HI": 13.4,
      "ID": 12.6,
      "MT": 14.2,
      "NV": 5,
      "OR": 13.4,
      "WA": 11.0,
      "CO": 12.6,
      "KS": 15.0,
      "NM": 14.2,
      "OK": 13.4,
      "UT": 13.4,
      "WY": 15.8,
      "AL": 5.4,
      "FL": 6.2,
      "GA": 10.2,
      "DC": 7.0,
      "ME": 14.2,
      "MA": 12.6,
      "NH": 12.6,
      "RI": 14.2,
      "PR": 8.6,
      "CT": 13.4,
      "NY": 5,
      "VT": 15.8,
      "DE": 14.2,
      "NJ": 13.4,
      "GU": 17.4
    },
    "yearly_trend": {
      "1990": {
        "total": 46,
        "wr": 8.2
      },
      "1991": {
        "total": 47,
        "wr": 8.0
      },
      "1992": {
        "total": 48,
        "wr": 7.8
      },
      "1993": {
        "total": 50,
        "wr": 7.7
      },
      "1994": {
        "total": 51,
        "wr": 7.6
      },
      "1995": {
        "total": 53,
        "wr": 7.6
      },
      "1996": {
        "total": 54,
        "wr": 7.6
      },
      "1997": {
        "total": 56,
        "wr": 7.7
      },
      "1998": {
        "total": 57,
        "wr": 7.8
      },
      "1999": {
        "total": 59,
        "wr": 8.0
      },
      "2000": {
        "total": 60,
        "wr": 8.2
      },
      "2001": {
        "total": 62,
        "wr": 8.5
      },
      "2002": {
        "total": 63,
        "wr": 8.8
      },
      "2003": {
        "total": 65,
        "wr": 9.1
      },
      "2004": {
        "total": 66,
        "wr": 9.5
      },
      "2005": {
        "total": 68,
        "wr": 9.9
      },
      "2006": {
        "total": 69,
        "wr": 10.4
      },
      "2007": {
        "total": 71,
        "wr": 10.8
      },
      "2008": {
        "total": 72,
        "wr": 11.3
      },
      "2009": {
        "total": 74,
        "wr": 11.8
      },
      "2010": {
        "total": 75,
        "wr": 12.3
      },
      "2011": {
        "total": 77,
        "wr": 12.8
      },
      "2012": {
        "total": 78,
        "wr": 13.3
      },
      "2013": {
        "total": 80,
        "wr": 13.8
      },
      "2014": {
        "total": 81,
        "wr": 14.3
      },
      "2015": {
        "total": 83,
        "wr": 14.7
      },
      "2016": {
        "total": 84,
        "wr": 15.2
      },
      "2017": {
        "total": 86,
        "wr": 15.6
      },
      "2018": {
        "total": 87,
        "wr": 16.0
      },
      "2019": {
        "total": 89,
        "wr": 16.3
      },
      "2020": {
        "total": 90,
        "wr": 16.6
      },
      "2021": {
        "total": 92,
        "wr": 16.9
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 7,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 11,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 15,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 22,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "320": {
    "nos_code": "320",
    "label": "Assault/Libel/Slander",
    "category": "injury",
    "sub": "assault/libel/slander",
    "total": 8500,
    "mo": 11,
    "wr": 41.2,
    "sp": 58.4,
    "sol": "1-3 years varies",
    "af": "Contingency or hourly",
    "rng": {
      "lo": 15,
      "md": 75,
      "hi": 380
    },
    "rp": 4.2,
    "ps": {
      "wr": 23.200000000000003,
      "total": 4964
    },
    "rr": {
      "wr": 43.2,
      "total": 3536
    },
    "cw": 46.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 58.4,
        "c": "#0D9488",
        "n": 4964
      },
      {
        "l": "Dismissed",
        "p": 18.7,
        "c": "#94A3B8",
        "n": 1591
      },
      {
        "l": "Other",
        "p": 10.4,
        "c": "#475569",
        "n": 884
      },
      {
        "l": "Summary Judgment",
        "p": 8.3,
        "c": "#D97706",
        "n": 707
      },
      {
        "l": "Default Judgment",
        "p": 2.9,
        "c": "#DB2777",
        "n": 247
      },
      {
        "l": "Trial",
        "p": 0.8,
        "c": "#7C3AED",
        "n": 70
      },
      {
        "l": "Consent",
        "p": 0.4,
        "c": "#2563EB",
        "n": 35
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 3.1,
      "trial_loss": 2.4,
      "dismiss": 19.5,
      "fav_set": 52.3,
      "set_mo": 10,
      "trial_med": "$37"
    },
    "circuit_rates": {
      "1": 42.2,
      "2": 40.7,
      "3": 42.7,
      "4": 41.2,
      "5": 39.2,
      "6": 41.7,
      "7": 42.2,
      "8": 41.2,
      "9": 39.7,
      "10": 41.7,
      "11": 40.2,
      "dc": 38.7
    },
    "state_rates": {
      "PA": 46.0,
      "MI": 44.4,
      "VI": 31.6,
      "MD": 38.8,
      "NC": 42.8,
      "TX": 34.8,
      "SC": 43.6,
      "VA": 39.6,
      "WV": 38.0,
      "LA": 37.2,
      "KY": 39.6,
      "MS": 36.4,
      "OH": 40.4,
      "TN": 39.6,
      "IL": 42.8,
      "IN": 43.6,
      "WI": 42.0,
      "AR": 42.0,
      "IA": 42.8,
      "MN": 42.0,
      "MO": 40.4,
      "NE": 43.6,
      "ND": 42.8,
      "SD": 42.8,
      "AK": 34.8,
      "AZ": 41.2,
      "CA": 34.0,
      "HI": 42.0,
      "ID": 41.2,
      "MT": 42.8,
      "NV": 33.2,
      "OR": 42.0,
      "WA": 39.6,
      "CO": 41.2,
      "KS": 43.6,
      "NM": 42.8,
      "OK": 42.0,
      "UT": 42.0,
      "WY": 44.4,
      "AL": 34.0,
      "FL": 34.8,
      "GA": 38.8,
      "DC": 35.6,
      "ME": 42.8,
      "MA": 41.2,
      "NH": 41.2,
      "RI": 42.8,
      "PR": 37.2,
      "CT": 42.0,
      "NY": 33.2,
      "VT": 44.4,
      "DE": 42.8,
      "NJ": 42.0,
      "GU": 46.0
    },
    "yearly_trend": {
      "1990": {
        "total": 212,
        "wr": 36.8
      },
      "1991": {
        "total": 219,
        "wr": 36.6
      },
      "1992": {
        "total": 226,
        "wr": 36.4
      },
      "1993": {
        "total": 233,
        "wr": 36.3
      },
      "1994": {
        "total": 239,
        "wr": 36.2
      },
      "1995": {
        "total": 246,
        "wr": 36.2
      },
      "1996": {
        "total": 253,
        "wr": 36.2
      },
      "1997": {
        "total": 260,
        "wr": 36.3
      },
      "1998": {
        "total": 267,
        "wr": 36.4
      },
      "1999": {
        "total": 274,
        "wr": 36.6
      },
      "2000": {
        "total": 281,
        "wr": 36.8
      },
      "2001": {
        "total": 287,
        "wr": 37.1
      },
      "2002": {
        "total": 294,
        "wr": 37.4
      },
      "2003": {
        "total": 301,
        "wr": 37.7
      },
      "2004": {
        "total": 308,
        "wr": 38.1
      },
      "2005": {
        "total": 315,
        "wr": 38.5
      },
      "2006": {
        "total": 322,
        "wr": 39.0
      },
      "2007": {
        "total": 329,
        "wr": 39.4
      },
      "2008": {
        "total": 335,
        "wr": 39.9
      },
      "2009": {
        "total": 342,
        "wr": 40.4
      },
      "2010": {
        "total": 349,
        "wr": 40.9
      },
      "2011": {
        "total": 356,
        "wr": 41.4
      },
      "2012": {
        "total": 363,
        "wr": 41.9
      },
      "2013": {
        "total": 370,
        "wr": 42.4
      },
      "2014": {
        "total": 377,
        "wr": 42.9
      },
      "2015": {
        "total": 383,
        "wr": 43.3
      },
      "2016": {
        "total": 390,
        "wr": 43.8
      },
      "2017": {
        "total": 397,
        "wr": 44.2
      },
      "2018": {
        "total": 404,
        "wr": 44.6
      },
      "2019": {
        "total": 411,
        "wr": 44.9
      },
      "2020": {
        "total": 418,
        "wr": 45.2
      },
      "2021": {
        "total": 425,
        "wr": 45.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "330": {
    "nos_code": "330",
    "label": "FELA",
    "category": "injury",
    "sub": "federal employers liability",
    "total": 4100,
    "mo": 15,
    "wr": 52.8,
    "sp": 66.1,
    "sol": "3 years",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 180,
      "md": 620,
      "hi": 3200
    },
    "rp": 1.8,
    "ps": {
      "wr": 34.8,
      "total": 2710
    },
    "rr": {
      "wr": 54.8,
      "total": 1390
    },
    "cw": 57.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 66.1,
        "c": "#0D9488",
        "n": 2710
      },
      {
        "l": "Dismissed",
        "p": 15.3,
        "c": "#94A3B8",
        "n": 625
      },
      {
        "l": "Other",
        "p": 8.5,
        "c": "#475569",
        "n": 347
      },
      {
        "l": "Summary Judgment",
        "p": 6.8,
        "c": "#D97706",
        "n": 278
      },
      {
        "l": "Default Judgment",
        "p": 2.4,
        "c": "#DB2777",
        "n": 97
      },
      {
        "l": "Trial",
        "p": 0.7,
        "c": "#7C3AED",
        "n": 27
      },
      {
        "l": "Consent",
        "p": 0.3,
        "c": "#2563EB",
        "n": 13
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 4.8,
      "trial_loss": 2.1,
      "dismiss": 12.3,
      "fav_set": 62.1,
      "set_mo": 16,
      "trial_med": "$310"
    },
    "circuit_rates": {
      "1": 53.8,
      "2": 52.3,
      "3": 54.3,
      "4": 52.8,
      "5": 50.8,
      "6": 53.3,
      "7": 53.8,
      "8": 52.8,
      "9": 51.3,
      "10": 53.3,
      "11": 51.8,
      "dc": 50.3
    },
    "state_rates": {
      "PA": 57.6,
      "MI": 56.0,
      "VI": 43.2,
      "MD": 50.4,
      "NC": 54.4,
      "TX": 46.4,
      "SC": 55.2,
      "VA": 51.2,
      "WV": 49.6,
      "LA": 48.8,
      "KY": 51.2,
      "MS": 48.0,
      "OH": 52.0,
      "TN": 51.2,
      "IL": 54.4,
      "IN": 55.2,
      "WI": 53.6,
      "AR": 53.6,
      "IA": 54.4,
      "MN": 53.6,
      "MO": 52.0,
      "NE": 55.2,
      "ND": 54.4,
      "SD": 54.4,
      "AK": 46.4,
      "AZ": 52.8,
      "CA": 45.6,
      "HI": 53.6,
      "ID": 52.8,
      "MT": 54.4,
      "NV": 44.8,
      "OR": 53.6,
      "WA": 51.2,
      "CO": 52.8,
      "KS": 55.2,
      "NM": 54.4,
      "OK": 53.6,
      "UT": 53.6,
      "WY": 56.0,
      "AL": 45.6,
      "FL": 46.4,
      "GA": 50.4,
      "DC": 47.2,
      "ME": 54.4,
      "MA": 52.8,
      "NH": 52.8,
      "RI": 54.4,
      "PR": 48.8,
      "CT": 53.6,
      "NY": 44.8,
      "VT": 56.0,
      "DE": 54.4,
      "NJ": 53.6,
      "GU": 57.6
    },
    "yearly_trend": {
      "1990": {
        "total": 102,
        "wr": 48.4
      },
      "1991": {
        "total": 105,
        "wr": 48.2
      },
      "1992": {
        "total": 109,
        "wr": 48.0
      },
      "1993": {
        "total": 112,
        "wr": 47.9
      },
      "1994": {
        "total": 115,
        "wr": 47.8
      },
      "1995": {
        "total": 119,
        "wr": 47.8
      },
      "1996": {
        "total": 122,
        "wr": 47.8
      },
      "1997": {
        "total": 125,
        "wr": 47.9
      },
      "1998": {
        "total": 128,
        "wr": 48.0
      },
      "1999": {
        "total": 132,
        "wr": 48.2
      },
      "2000": {
        "total": 135,
        "wr": 48.4
      },
      "2001": {
        "total": 138,
        "wr": 48.7
      },
      "2002": {
        "total": 142,
        "wr": 49.0
      },
      "2003": {
        "total": 145,
        "wr": 49.3
      },
      "2004": {
        "total": 148,
        "wr": 49.7
      },
      "2005": {
        "total": 152,
        "wr": 50.1
      },
      "2006": {
        "total": 155,
        "wr": 50.6
      },
      "2007": {
        "total": 158,
        "wr": 51.0
      },
      "2008": {
        "total": 162,
        "wr": 51.5
      },
      "2009": {
        "total": 165,
        "wr": 52.0
      },
      "2010": {
        "total": 168,
        "wr": 52.5
      },
      "2011": {
        "total": 171,
        "wr": 53.0
      },
      "2012": {
        "total": 175,
        "wr": 53.5
      },
      "2013": {
        "total": 178,
        "wr": 54.0
      },
      "2014": {
        "total": 181,
        "wr": 54.5
      },
      "2015": {
        "total": 185,
        "wr": 54.9
      },
      "2016": {
        "total": 188,
        "wr": 55.4
      },
      "2017": {
        "total": 191,
        "wr": 55.8
      },
      "2018": {
        "total": 195,
        "wr": 56.2
      },
      "2019": {
        "total": 198,
        "wr": 56.5
      },
      "2020": {
        "total": 201,
        "wr": 56.8
      },
      "2021": {
        "total": 205,
        "wr": 57.1
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 5,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 7,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 10,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 15,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "340": {
    "nos_code": "340",
    "label": "Marine",
    "category": "injury",
    "sub": "marine personal injury",
    "total": 2400,
    "mo": 16,
    "wr": 45.3,
    "sp": 62.8,
    "sol": "3 years",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 240,
      "md": 850,
      "hi": 4100
    },
    "rp": 1.6,
    "ps": {
      "wr": 27.299999999999997,
      "total": 1507
    },
    "rr": {
      "wr": 47.3,
      "total": 893
    },
    "cw": 50.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 62.8,
        "c": "#0D9488",
        "n": 1507
      },
      {
        "l": "Dismissed",
        "p": 16.7,
        "c": "#94A3B8",
        "n": 401
      },
      {
        "l": "Other",
        "p": 9.3,
        "c": "#475569",
        "n": 223
      },
      {
        "l": "Summary Judgment",
        "p": 7.4,
        "c": "#D97706",
        "n": 178
      },
      {
        "l": "Default Judgment",
        "p": 2.6,
        "c": "#DB2777",
        "n": 62
      },
      {
        "l": "Trial",
        "p": 0.7,
        "c": "#7C3AED",
        "n": 17
      },
      {
        "l": "Consent",
        "p": 0.4,
        "c": "#2563EB",
        "n": 8
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 3.5,
      "trial_loss": 1.8,
      "dismiss": 13.2,
      "fav_set": 55.2,
      "set_mo": 15,
      "trial_med": "$425"
    },
    "circuit_rates": {
      "1": 46.3,
      "2": 44.8,
      "3": 46.8,
      "4": 45.3,
      "5": 43.3,
      "6": 45.8,
      "7": 46.3,
      "8": 45.3,
      "9": 43.8,
      "10": 45.8,
      "11": 44.3,
      "dc": 42.8
    },
    "state_rates": {
      "PA": 50.1,
      "MI": 48.5,
      "VI": 35.7,
      "MD": 42.9,
      "NC": 46.9,
      "TX": 38.9,
      "SC": 47.7,
      "VA": 43.7,
      "WV": 42.1,
      "LA": 41.3,
      "KY": 43.7,
      "MS": 40.5,
      "OH": 44.5,
      "TN": 43.7,
      "IL": 46.9,
      "IN": 47.7,
      "WI": 46.1,
      "AR": 46.1,
      "IA": 46.9,
      "MN": 46.1,
      "MO": 44.5,
      "NE": 47.7,
      "ND": 46.9,
      "SD": 46.9,
      "AK": 38.9,
      "AZ": 45.3,
      "CA": 38.1,
      "HI": 46.1,
      "ID": 45.3,
      "MT": 46.9,
      "NV": 37.3,
      "OR": 46.1,
      "WA": 43.7,
      "CO": 45.3,
      "KS": 47.7,
      "NM": 46.9,
      "OK": 46.1,
      "UT": 46.1,
      "WY": 48.5,
      "AL": 38.1,
      "FL": 38.9,
      "GA": 42.9,
      "DC": 39.7,
      "ME": 46.9,
      "MA": 45.3,
      "NH": 45.3,
      "RI": 46.9,
      "PR": 41.3,
      "CT": 46.1,
      "NY": 37.3,
      "VT": 48.5,
      "DE": 46.9,
      "NJ": 46.1,
      "GU": 50.1
    },
    "yearly_trend": {
      "1990": {
        "total": 60,
        "wr": 40.9
      },
      "1991": {
        "total": 61,
        "wr": 40.7
      },
      "1992": {
        "total": 63,
        "wr": 40.5
      },
      "1993": {
        "total": 65,
        "wr": 40.4
      },
      "1994": {
        "total": 67,
        "wr": 40.3
      },
      "1995": {
        "total": 69,
        "wr": 40.3
      },
      "1996": {
        "total": 71,
        "wr": 40.3
      },
      "1997": {
        "total": 73,
        "wr": 40.4
      },
      "1998": {
        "total": 75,
        "wr": 40.5
      },
      "1999": {
        "total": 77,
        "wr": 40.7
      },
      "2000": {
        "total": 79,
        "wr": 40.9
      },
      "2001": {
        "total": 81,
        "wr": 41.2
      },
      "2002": {
        "total": 83,
        "wr": 41.5
      },
      "2003": {
        "total": 85,
        "wr": 41.8
      },
      "2004": {
        "total": 87,
        "wr": 42.2
      },
      "2005": {
        "total": 89,
        "wr": 42.6
      },
      "2006": {
        "total": 90,
        "wr": 43.1
      },
      "2007": {
        "total": 92,
        "wr": 43.5
      },
      "2008": {
        "total": 94,
        "wr": 44.0
      },
      "2009": {
        "total": 96,
        "wr": 44.5
      },
      "2010": {
        "total": 98,
        "wr": 45.0
      },
      "2011": {
        "total": 100,
        "wr": 45.5
      },
      "2012": {
        "total": 102,
        "wr": 46.0
      },
      "2013": {
        "total": 104,
        "wr": 46.5
      },
      "2014": {
        "total": 106,
        "wr": 47.0
      },
      "2015": {
        "total": 108,
        "wr": 47.4
      },
      "2016": {
        "total": 110,
        "wr": 47.9
      },
      "2017": {
        "total": 112,
        "wr": 48.3
      },
      "2018": {
        "total": 114,
        "wr": 48.7
      },
      "2019": {
        "total": 116,
        "wr": 49.0
      },
      "2020": {
        "total": 118,
        "wr": 49.3
      },
      "2021": {
        "total": 120,
        "wr": 49.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 5,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 8,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 11,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 16,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "345": {
    "nos_code": "345",
    "label": "Marine Product",
    "category": "injury",
    "sub": "marine product liability",
    "total": 1200,
    "mo": 18,
    "wr": 18.4,
    "sp": 50.6,
    "sol": "4-6 years",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 380,
      "md": 1100,
      "hi": 6800
    },
    "rp": 0.6,
    "ps": {
      "wr": 5,
      "total": 607
    },
    "rr": {
      "wr": 20.4,
      "total": 593
    },
    "cw": 23.4,
    "ends": [
      {
        "l": "Settlement",
        "p": 50.6,
        "c": "#0D9488",
        "n": 607
      },
      {
        "l": "Dismissed",
        "p": 22.2,
        "c": "#94A3B8",
        "n": 266
      },
      {
        "l": "Other",
        "p": 12.4,
        "c": "#475569",
        "n": 148
      },
      {
        "l": "Summary Judgment",
        "p": 9.9,
        "c": "#D97706",
        "n": 118
      },
      {
        "l": "Default Judgment",
        "p": 3.5,
        "c": "#DB2777",
        "n": 41
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 11
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 5
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.4,
      "trial_loss": 0.5,
      "dismiss": 16.8,
      "fav_set": 24.5,
      "set_mo": 18,
      "trial_med": "$550"
    },
    "circuit_rates": {
      "1": 19.4,
      "2": 17.9,
      "3": 19.9,
      "4": 18.4,
      "5": 16.4,
      "6": 18.9,
      "7": 19.4,
      "8": 18.4,
      "9": 16.9,
      "10": 18.9,
      "11": 17.4,
      "dc": 15.9
    },
    "state_rates": {
      "PA": 23.2,
      "MI": 21.6,
      "VI": 8.8,
      "MD": 16.0,
      "NC": 20.0,
      "TX": 12.0,
      "SC": 20.8,
      "VA": 16.8,
      "WV": 15.2,
      "LA": 14.4,
      "KY": 16.8,
      "MS": 13.6,
      "OH": 17.6,
      "TN": 16.8,
      "IL": 20.0,
      "IN": 20.8,
      "WI": 19.2,
      "AR": 19.2,
      "IA": 20.0,
      "MN": 19.2,
      "MO": 17.6,
      "NE": 20.8,
      "ND": 20.0,
      "SD": 20.0,
      "AK": 12.0,
      "AZ": 18.4,
      "CA": 11.2,
      "HI": 19.2,
      "ID": 18.4,
      "MT": 20.0,
      "NV": 10.4,
      "OR": 19.2,
      "WA": 16.8,
      "CO": 18.4,
      "KS": 20.8,
      "NM": 20.0,
      "OK": 19.2,
      "UT": 19.2,
      "WY": 21.6,
      "AL": 11.2,
      "FL": 12.0,
      "GA": 16.0,
      "DC": 12.8,
      "ME": 20.0,
      "MA": 18.4,
      "NH": 18.4,
      "RI": 20.0,
      "PR": 14.4,
      "CT": 19.2,
      "NY": 10.4,
      "VT": 21.6,
      "DE": 20.0,
      "NJ": 19.2,
      "GU": 23.2
    },
    "yearly_trend": {
      "1990": {
        "total": 30,
        "wr": 14.0
      },
      "1991": {
        "total": 30,
        "wr": 13.8
      },
      "1992": {
        "total": 31,
        "wr": 13.6
      },
      "1993": {
        "total": 32,
        "wr": 13.5
      },
      "1994": {
        "total": 33,
        "wr": 13.4
      },
      "1995": {
        "total": 34,
        "wr": 13.4
      },
      "1996": {
        "total": 35,
        "wr": 13.4
      },
      "1997": {
        "total": 36,
        "wr": 13.5
      },
      "1998": {
        "total": 37,
        "wr": 13.6
      },
      "1999": {
        "total": 38,
        "wr": 13.8
      },
      "2000": {
        "total": 39,
        "wr": 14.0
      },
      "2001": {
        "total": 40,
        "wr": 14.3
      },
      "2002": {
        "total": 41,
        "wr": 14.6
      },
      "2003": {
        "total": 42,
        "wr": 14.9
      },
      "2004": {
        "total": 43,
        "wr": 15.3
      },
      "2005": {
        "total": 44,
        "wr": 15.7
      },
      "2006": {
        "total": 45,
        "wr": 16.2
      },
      "2007": {
        "total": 46,
        "wr": 16.6
      },
      "2008": {
        "total": 47,
        "wr": 17.1
      },
      "2009": {
        "total": 48,
        "wr": 17.6
      },
      "2010": {
        "total": 49,
        "wr": 18.1
      },
      "2011": {
        "total": 50,
        "wr": 18.6
      },
      "2012": {
        "total": 51,
        "wr": 19.1
      },
      "2013": {
        "total": 52,
        "wr": 19.6
      },
      "2014": {
        "total": 53,
        "wr": 20.1
      },
      "2015": {
        "total": 54,
        "wr": 20.5
      },
      "2016": {
        "total": 55,
        "wr": 21.0
      },
      "2017": {
        "total": 56,
        "wr": 21.4
      },
      "2018": {
        "total": 57,
        "wr": 21.8
      },
      "2019": {
        "total": 58,
        "wr": 22.1
      },
      "2020": {
        "total": 59,
        "wr": 22.4
      },
      "2021": {
        "total": 60,
        "wr": 22.7
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 6,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 9,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 12,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 18,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "355": {
    "nos_code": "355",
    "label": "Motor Vehicle Product",
    "category": "injury",
    "sub": "vehicle product liability",
    "total": 45200,
    "mo": 16,
    "wr": 22.8,
    "sp": 54.2,
    "sol": "3-4 years",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 85,
      "md": 380,
      "hi": 2200
    },
    "rp": 2.8,
    "ps": {
      "wr": 5,
      "total": 24498
    },
    "rr": {
      "wr": 24.8,
      "total": 20702
    },
    "cw": 27.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 54.2,
        "c": "#0D9488",
        "n": 24498
      },
      {
        "l": "Dismissed",
        "p": 20.6,
        "c": "#94A3B8",
        "n": 9315
      },
      {
        "l": "Other",
        "p": 11.5,
        "c": "#475569",
        "n": 5175
      },
      {
        "l": "Summary Judgment",
        "p": 9.2,
        "c": "#D97706",
        "n": 4140
      },
      {
        "l": "Default Judgment",
        "p": 3.2,
        "c": "#DB2777",
        "n": 1449
      },
      {
        "l": "Trial",
        "p": 0.9,
        "c": "#7C3AED",
        "n": 414
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 207
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.8,
      "trial_loss": 1.2,
      "dismiss": 19.4,
      "fav_set": 33.8,
      "set_mo": 16,
      "trial_med": "$190"
    },
    "circuit_rates": {
      "1": 23.8,
      "2": 22.3,
      "3": 24.3,
      "4": 22.8,
      "5": 20.8,
      "6": 23.3,
      "7": 23.8,
      "8": 22.8,
      "9": 21.3,
      "10": 23.3,
      "11": 21.8,
      "dc": 20.3
    },
    "state_rates": {
      "PA": 27.6,
      "MI": 26.0,
      "VI": 13.2,
      "MD": 20.4,
      "NC": 24.4,
      "TX": 16.4,
      "SC": 25.2,
      "VA": 21.2,
      "WV": 19.6,
      "LA": 18.8,
      "KY": 21.2,
      "MS": 18.0,
      "OH": 22.0,
      "TN": 21.2,
      "IL": 24.4,
      "IN": 25.2,
      "WI": 23.6,
      "AR": 23.6,
      "IA": 24.4,
      "MN": 23.6,
      "MO": 22.0,
      "NE": 25.2,
      "ND": 24.4,
      "SD": 24.4,
      "AK": 16.4,
      "AZ": 22.8,
      "CA": 15.6,
      "HI": 23.6,
      "ID": 22.8,
      "MT": 24.4,
      "NV": 14.8,
      "OR": 23.6,
      "WA": 21.2,
      "CO": 22.8,
      "KS": 25.2,
      "NM": 24.4,
      "OK": 23.6,
      "UT": 23.6,
      "WY": 26.0,
      "AL": 15.6,
      "FL": 16.4,
      "GA": 20.4,
      "DC": 17.2,
      "ME": 24.4,
      "MA": 22.8,
      "NH": 22.8,
      "RI": 24.4,
      "PR": 18.8,
      "CT": 23.6,
      "NY": 14.8,
      "VT": 26.0,
      "DE": 24.4,
      "NJ": 23.6,
      "GU": 27.6
    },
    "yearly_trend": {
      "1990": {
        "total": 1130,
        "wr": 18.4
      },
      "1991": {
        "total": 1166,
        "wr": 18.2
      },
      "1992": {
        "total": 1202,
        "wr": 18.0
      },
      "1993": {
        "total": 1239,
        "wr": 17.9
      },
      "1994": {
        "total": 1275,
        "wr": 17.8
      },
      "1995": {
        "total": 1312,
        "wr": 17.8
      },
      "1996": {
        "total": 1348,
        "wr": 17.8
      },
      "1997": {
        "total": 1385,
        "wr": 17.9
      },
      "1998": {
        "total": 1421,
        "wr": 18.0
      },
      "1999": {
        "total": 1458,
        "wr": 18.2
      },
      "2000": {
        "total": 1494,
        "wr": 18.4
      },
      "2001": {
        "total": 1530,
        "wr": 18.7
      },
      "2002": {
        "total": 1567,
        "wr": 19.0
      },
      "2003": {
        "total": 1603,
        "wr": 19.3
      },
      "2004": {
        "total": 1640,
        "wr": 19.7
      },
      "2005": {
        "total": 1676,
        "wr": 20.1
      },
      "2006": {
        "total": 1713,
        "wr": 20.6
      },
      "2007": {
        "total": 1749,
        "wr": 21.0
      },
      "2008": {
        "total": 1786,
        "wr": 21.5
      },
      "2009": {
        "total": 1822,
        "wr": 22.0
      },
      "2010": {
        "total": 1859,
        "wr": 22.5
      },
      "2011": {
        "total": 1895,
        "wr": 23.0
      },
      "2012": {
        "total": 1931,
        "wr": 23.5
      },
      "2013": {
        "total": 1968,
        "wr": 24.0
      },
      "2014": {
        "total": 2004,
        "wr": 24.5
      },
      "2015": {
        "total": 2041,
        "wr": 24.9
      },
      "2016": {
        "total": 2077,
        "wr": 25.4
      },
      "2017": {
        "total": 2114,
        "wr": 25.8
      },
      "2018": {
        "total": 2150,
        "wr": 26.2
      },
      "2019": {
        "total": 2187,
        "wr": 26.5
      },
      "2020": {
        "total": 2223,
        "wr": 26.8
      },
      "2021": {
        "total": 2260,
        "wr": 27.1
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 5,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 8,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 11,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 16,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "367": {
    "nos_code": "367",
    "label": "Healthcare/Pharma",
    "category": "injury",
    "sub": "healthcare/pharma liability",
    "total": 28600,
    "mo": 19,
    "wr": 31.5,
    "sp": 52.1,
    "sol": "3-5 years",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 120,
      "md": 520,
      "hi": 3100
    },
    "rp": 3.4,
    "ps": {
      "wr": 13.5,
      "total": 14900
    },
    "rr": {
      "wr": 33.5,
      "total": 13700
    },
    "cw": 36.5,
    "ends": [
      {
        "l": "Settlement",
        "p": 52.1,
        "c": "#0D9488",
        "n": 14900
      },
      {
        "l": "Dismissed",
        "p": 21.6,
        "c": "#94A3B8",
        "n": 6165
      },
      {
        "l": "Other",
        "p": 12.0,
        "c": "#475569",
        "n": 3425
      },
      {
        "l": "Summary Judgment",
        "p": 9.6,
        "c": "#D97706",
        "n": 2740
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 959
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 274
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 137
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.2,
      "trial_loss": 2.8,
      "dismiss": 23.4,
      "fav_set": 46.2,
      "set_mo": 16,
      "trial_med": "$260"
    },
    "circuit_rates": {
      "1": 32.5,
      "2": 31.0,
      "3": 33.0,
      "4": 31.5,
      "5": 29.5,
      "6": 32.0,
      "7": 32.5,
      "8": 31.5,
      "9": 30.0,
      "10": 32.0,
      "11": 30.5,
      "dc": 29.0
    },
    "state_rates": {
      "PA": 36.3,
      "MI": 34.7,
      "VI": 21.9,
      "MD": 29.1,
      "NC": 33.1,
      "TX": 25.1,
      "SC": 33.9,
      "VA": 29.9,
      "WV": 28.3,
      "LA": 27.5,
      "KY": 29.9,
      "MS": 26.7,
      "OH": 30.7,
      "TN": 29.9,
      "IL": 33.1,
      "IN": 33.9,
      "WI": 32.3,
      "AR": 32.3,
      "IA": 33.1,
      "MN": 32.3,
      "MO": 30.7,
      "NE": 33.9,
      "ND": 33.1,
      "SD": 33.1,
      "AK": 25.1,
      "AZ": 31.5,
      "CA": 24.3,
      "HI": 32.3,
      "ID": 31.5,
      "MT": 33.1,
      "NV": 23.5,
      "OR": 32.3,
      "WA": 29.9,
      "CO": 31.5,
      "KS": 33.9,
      "NM": 33.1,
      "OK": 32.3,
      "UT": 32.3,
      "WY": 34.7,
      "AL": 24.3,
      "FL": 25.1,
      "GA": 29.1,
      "DC": 25.9,
      "ME": 33.1,
      "MA": 31.5,
      "NH": 31.5,
      "RI": 33.1,
      "PR": 27.5,
      "CT": 32.3,
      "NY": 23.5,
      "VT": 34.7,
      "DE": 33.1,
      "NJ": 32.3,
      "GU": 36.3
    },
    "yearly_trend": {
      "1990": {
        "total": 715,
        "wr": 27.1
      },
      "1991": {
        "total": 738,
        "wr": 26.9
      },
      "1992": {
        "total": 761,
        "wr": 26.7
      },
      "1993": {
        "total": 784,
        "wr": 26.6
      },
      "1994": {
        "total": 807,
        "wr": 26.5
      },
      "1995": {
        "total": 830,
        "wr": 26.5
      },
      "1996": {
        "total": 853,
        "wr": 26.5
      },
      "1997": {
        "total": 876,
        "wr": 26.6
      },
      "1998": {
        "total": 899,
        "wr": 26.7
      },
      "1999": {
        "total": 922,
        "wr": 26.9
      },
      "2000": {
        "total": 945,
        "wr": 27.1
      },
      "2001": {
        "total": 968,
        "wr": 27.4
      },
      "2002": {
        "total": 991,
        "wr": 27.7
      },
      "2003": {
        "total": 1014,
        "wr": 28.0
      },
      "2004": {
        "total": 1037,
        "wr": 28.4
      },
      "2005": {
        "total": 1060,
        "wr": 28.8
      },
      "2006": {
        "total": 1084,
        "wr": 29.3
      },
      "2007": {
        "total": 1107,
        "wr": 29.7
      },
      "2008": {
        "total": 1130,
        "wr": 30.2
      },
      "2009": {
        "total": 1153,
        "wr": 30.7
      },
      "2010": {
        "total": 1176,
        "wr": 31.2
      },
      "2011": {
        "total": 1199,
        "wr": 31.7
      },
      "2012": {
        "total": 1222,
        "wr": 32.2
      },
      "2013": {
        "total": 1245,
        "wr": 32.7
      },
      "2014": {
        "total": 1268,
        "wr": 33.2
      },
      "2015": {
        "total": 1291,
        "wr": 33.6
      },
      "2016": {
        "total": 1314,
        "wr": 34.1
      },
      "2017": {
        "total": 1337,
        "wr": 34.5
      },
      "2018": {
        "total": 1360,
        "wr": 34.9
      },
      "2019": {
        "total": 1383,
        "wr": 35.2
      },
      "2020": {
        "total": 1406,
        "wr": 35.5
      },
      "2021": {
        "total": 1430,
        "wr": 35.8
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 6,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 9,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 13,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 19,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "368": {
    "nos_code": "368",
    "label": "Asbestos",
    "category": "injury",
    "sub": "asbestos litigation",
    "total": 18400,
    "mo": 24,
    "wr": 68.2,
    "sp": 71.8,
    "sol": "5-7 years",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 420,
      "md": 1800,
      "hi": 9200
    },
    "rp": 2.1,
    "ps": {
      "wr": 50.2,
      "total": 13211
    },
    "rr": {
      "wr": 70.2,
      "total": 5189
    },
    "cw": 73.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 71.8,
        "c": "#0D9488",
        "n": 13211
      },
      {
        "l": "Dismissed",
        "p": 12.7,
        "c": "#94A3B8",
        "n": 2335
      },
      {
        "l": "Other",
        "p": 7.1,
        "c": "#475569",
        "n": 1297
      },
      {
        "l": "Summary Judgment",
        "p": 5.6,
        "c": "#D97706",
        "n": 1037
      },
      {
        "l": "Default Judgment",
        "p": 2.0,
        "c": "#DB2777",
        "n": 363
      },
      {
        "l": "Trial",
        "p": 0.6,
        "c": "#7C3AED",
        "n": 103
      },
      {
        "l": "Consent",
        "p": 0.3,
        "c": "#2563EB",
        "n": 51
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 12.4,
      "trial_loss": 1.8,
      "dismiss": 8.2,
      "fav_set": 72.1,
      "set_mo": 22,
      "trial_med": "$900"
    },
    "circuit_rates": {
      "1": 69.2,
      "2": 67.7,
      "3": 69.7,
      "4": 68.2,
      "5": 66.2,
      "6": 68.7,
      "7": 69.2,
      "8": 68.2,
      "9": 66.7,
      "10": 68.7,
      "11": 67.2,
      "dc": 65.7
    },
    "state_rates": {
      "PA": 73.0,
      "MI": 71.4,
      "VI": 58.6,
      "MD": 65.8,
      "NC": 69.8,
      "TX": 61.8,
      "SC": 70.6,
      "VA": 66.6,
      "WV": 65.0,
      "LA": 64.2,
      "KY": 66.6,
      "MS": 63.4,
      "OH": 67.4,
      "TN": 66.6,
      "IL": 69.8,
      "IN": 70.6,
      "WI": 69.0,
      "AR": 69.0,
      "IA": 69.8,
      "MN": 69.0,
      "MO": 67.4,
      "NE": 70.6,
      "ND": 69.8,
      "SD": 69.8,
      "AK": 61.8,
      "AZ": 68.2,
      "CA": 61.0,
      "HI": 69.0,
      "ID": 68.2,
      "MT": 69.8,
      "NV": 60.2,
      "OR": 69.0,
      "WA": 66.6,
      "CO": 68.2,
      "KS": 70.6,
      "NM": 69.8,
      "OK": 69.0,
      "UT": 69.0,
      "WY": 71.4,
      "AL": 61.0,
      "FL": 61.8,
      "GA": 65.8,
      "DC": 62.6,
      "ME": 69.8,
      "MA": 68.2,
      "NH": 68.2,
      "RI": 69.8,
      "PR": 64.2,
      "CT": 69.0,
      "NY": 60.2,
      "VT": 71.4,
      "DE": 69.8,
      "NJ": 69.0,
      "GU": 73.0
    },
    "yearly_trend": {
      "1990": {
        "total": 460,
        "wr": 63.8
      },
      "1991": {
        "total": 474,
        "wr": 63.6
      },
      "1992": {
        "total": 489,
        "wr": 63.4
      },
      "1993": {
        "total": 504,
        "wr": 63.3
      },
      "1994": {
        "total": 519,
        "wr": 63.2
      },
      "1995": {
        "total": 534,
        "wr": 63.2
      },
      "1996": {
        "total": 549,
        "wr": 63.2
      },
      "1997": {
        "total": 563,
        "wr": 63.3
      },
      "1998": {
        "total": 578,
        "wr": 63.4
      },
      "1999": {
        "total": 593,
        "wr": 63.6
      },
      "2000": {
        "total": 608,
        "wr": 63.8
      },
      "2001": {
        "total": 623,
        "wr": 64.1
      },
      "2002": {
        "total": 638,
        "wr": 64.4
      },
      "2003": {
        "total": 652,
        "wr": 64.7
      },
      "2004": {
        "total": 667,
        "wr": 65.1
      },
      "2005": {
        "total": 682,
        "wr": 65.5
      },
      "2006": {
        "total": 697,
        "wr": 66.0
      },
      "2007": {
        "total": 712,
        "wr": 66.4
      },
      "2008": {
        "total": 727,
        "wr": 66.9
      },
      "2009": {
        "total": 741,
        "wr": 67.4
      },
      "2010": {
        "total": 756,
        "wr": 67.9
      },
      "2011": {
        "total": 771,
        "wr": 68.4
      },
      "2012": {
        "total": 786,
        "wr": 68.9
      },
      "2013": {
        "total": 801,
        "wr": 69.4
      },
      "2014": {
        "total": 816,
        "wr": 69.9
      },
      "2015": {
        "total": 830,
        "wr": 70.3
      },
      "2016": {
        "total": 845,
        "wr": 70.8
      },
      "2017": {
        "total": 860,
        "wr": 71.2
      },
      "2018": {
        "total": 875,
        "wr": 71.6
      },
      "2019": {
        "total": 890,
        "wr": 71.9
      },
      "2020": {
        "total": 905,
        "wr": 72.2
      },
      "2021": {
        "total": 920,
        "wr": 72.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 8,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 12,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 16,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 24,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "375": {
    "nos_code": "375",
    "label": "False Claims Act",
    "category": "money",
    "sub": "false claims act",
    "total": 3800,
    "mo": 24,
    "wr": 54.2,
    "sp": 48.1,
    "sol": "6 years statute",
    "af": "Contingency (25%) + statutory damages",
    "rng": {
      "lo": 280,
      "md": 1200,
      "hi": 6800
    },
    "rp": 2.2,
    "ps": {
      "wr": 36.2,
      "total": 1827
    },
    "rr": {
      "wr": 56.2,
      "total": 1973
    },
    "cw": 59.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.1,
        "c": "#0D9488",
        "n": 1827
      },
      {
        "l": "Dismissed",
        "p": 23.4,
        "c": "#94A3B8",
        "n": 887
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 493
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 394
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 138
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 39
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 19
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 6.2,
      "trial_loss": 2.1,
      "dismiss": 18.4,
      "fav_set": 59.3,
      "set_mo": 22,
      "trial_med": "$600"
    },
    "circuit_rates": {
      "1": 55.2,
      "2": 53.7,
      "3": 55.7,
      "4": 54.2,
      "5": 52.2,
      "6": 54.7,
      "7": 55.2,
      "8": 54.2,
      "9": 52.7,
      "10": 54.7,
      "11": 53.2,
      "dc": 51.7
    },
    "state_rates": {
      "PA": 59.0,
      "MI": 57.4,
      "VI": 44.6,
      "MD": 51.8,
      "NC": 55.8,
      "TX": 47.8,
      "SC": 56.6,
      "VA": 52.6,
      "WV": 51.0,
      "LA": 50.2,
      "KY": 52.6,
      "MS": 49.4,
      "OH": 53.4,
      "TN": 52.6,
      "IL": 55.8,
      "IN": 56.6,
      "WI": 55.0,
      "AR": 55.0,
      "IA": 55.8,
      "MN": 55.0,
      "MO": 53.4,
      "NE": 56.6,
      "ND": 55.8,
      "SD": 55.8,
      "AK": 47.8,
      "AZ": 54.2,
      "CA": 47.0,
      "HI": 55.0,
      "ID": 54.2,
      "MT": 55.8,
      "NV": 46.2,
      "OR": 55.0,
      "WA": 52.6,
      "CO": 54.2,
      "KS": 56.6,
      "NM": 55.8,
      "OK": 55.0,
      "UT": 55.0,
      "WY": 57.4,
      "AL": 47.0,
      "FL": 47.8,
      "GA": 51.8,
      "DC": 48.6,
      "ME": 55.8,
      "MA": 54.2,
      "NH": 54.2,
      "RI": 55.8,
      "PR": 50.2,
      "CT": 55.0,
      "NY": 46.2,
      "VT": 57.4,
      "DE": 55.8,
      "NJ": 55.0,
      "GU": 59.0
    },
    "yearly_trend": {
      "1990": {
        "total": 95,
        "wr": 49.8
      },
      "1991": {
        "total": 98,
        "wr": 49.6
      },
      "1992": {
        "total": 101,
        "wr": 49.4
      },
      "1993": {
        "total": 104,
        "wr": 49.3
      },
      "1994": {
        "total": 107,
        "wr": 49.2
      },
      "1995": {
        "total": 110,
        "wr": 49.2
      },
      "1996": {
        "total": 113,
        "wr": 49.2
      },
      "1997": {
        "total": 116,
        "wr": 49.3
      },
      "1998": {
        "total": 119,
        "wr": 49.4
      },
      "1999": {
        "total": 122,
        "wr": 49.6
      },
      "2000": {
        "total": 125,
        "wr": 49.8
      },
      "2001": {
        "total": 128,
        "wr": 50.1
      },
      "2002": {
        "total": 131,
        "wr": 50.4
      },
      "2003": {
        "total": 134,
        "wr": 50.7
      },
      "2004": {
        "total": 137,
        "wr": 51.1
      },
      "2005": {
        "total": 140,
        "wr": 51.5
      },
      "2006": {
        "total": 144,
        "wr": 52.0
      },
      "2007": {
        "total": 147,
        "wr": 52.4
      },
      "2008": {
        "total": 150,
        "wr": 52.9
      },
      "2009": {
        "total": 153,
        "wr": 53.4
      },
      "2010": {
        "total": 156,
        "wr": 53.9
      },
      "2011": {
        "total": 159,
        "wr": 54.4
      },
      "2012": {
        "total": 162,
        "wr": 54.9
      },
      "2013": {
        "total": 165,
        "wr": 55.4
      },
      "2014": {
        "total": 168,
        "wr": 55.9
      },
      "2015": {
        "total": 171,
        "wr": 56.3
      },
      "2016": {
        "total": 174,
        "wr": 56.8
      },
      "2017": {
        "total": 177,
        "wr": 57.2
      },
      "2018": {
        "total": 180,
        "wr": 57.6
      },
      "2019": {
        "total": 183,
        "wr": 57.9
      },
      "2020": {
        "total": 186,
        "wr": 58.2
      },
      "2021": {
        "total": 190,
        "wr": 58.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 8,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 12,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 16,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 24,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "376": {
    "nos_code": "376",
    "label": "Qui Tam",
    "category": "money",
    "sub": "qui tam action",
    "total": 2200,
    "mo": 26,
    "wr": 52.8,
    "sp": 51.2,
    "sol": "6 years statute",
    "af": "Contingency (25%) + statutory damages",
    "rng": {
      "lo": 320,
      "md": 1400,
      "hi": 7600
    },
    "rp": 1.8,
    "ps": {
      "wr": 34.8,
      "total": 1126
    },
    "rr": {
      "wr": 54.8,
      "total": 1074
    },
    "cw": 57.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 51.2,
        "c": "#0D9488",
        "n": 1126
      },
      {
        "l": "Dismissed",
        "p": 22.0,
        "c": "#94A3B8",
        "n": 483
      },
      {
        "l": "Other",
        "p": 12.2,
        "c": "#475569",
        "n": 268
      },
      {
        "l": "Summary Judgment",
        "p": 9.8,
        "c": "#D97706",
        "n": 214
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 75
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 21
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 10
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 5.8,
      "trial_loss": 1.8,
      "dismiss": 19.2,
      "fav_set": 57.1,
      "set_mo": 24,
      "trial_med": "$700"
    },
    "circuit_rates": {
      "1": 53.8,
      "2": 52.3,
      "3": 54.3,
      "4": 52.8,
      "5": 50.8,
      "6": 53.3,
      "7": 53.8,
      "8": 52.8,
      "9": 51.3,
      "10": 53.3,
      "11": 51.8,
      "dc": 50.3
    },
    "state_rates": {
      "PA": 57.6,
      "MI": 56.0,
      "VI": 43.2,
      "MD": 50.4,
      "NC": 54.4,
      "TX": 46.4,
      "SC": 55.2,
      "VA": 51.2,
      "WV": 49.6,
      "LA": 48.8,
      "KY": 51.2,
      "MS": 48.0,
      "OH": 52.0,
      "TN": 51.2,
      "IL": 54.4,
      "IN": 55.2,
      "WI": 53.6,
      "AR": 53.6,
      "IA": 54.4,
      "MN": 53.6,
      "MO": 52.0,
      "NE": 55.2,
      "ND": 54.4,
      "SD": 54.4,
      "AK": 46.4,
      "AZ": 52.8,
      "CA": 45.6,
      "HI": 53.6,
      "ID": 52.8,
      "MT": 54.4,
      "NV": 44.8,
      "OR": 53.6,
      "WA": 51.2,
      "CO": 52.8,
      "KS": 55.2,
      "NM": 54.4,
      "OK": 53.6,
      "UT": 53.6,
      "WY": 56.0,
      "AL": 45.6,
      "FL": 46.4,
      "GA": 50.4,
      "DC": 47.2,
      "ME": 54.4,
      "MA": 52.8,
      "NH": 52.8,
      "RI": 54.4,
      "PR": 48.8,
      "CT": 53.6,
      "NY": 44.8,
      "VT": 56.0,
      "DE": 54.4,
      "NJ": 53.6,
      "GU": 57.6
    },
    "yearly_trend": {
      "1990": {
        "total": 55,
        "wr": 48.4
      },
      "1991": {
        "total": 56,
        "wr": 48.2
      },
      "1992": {
        "total": 58,
        "wr": 48.0
      },
      "1993": {
        "total": 60,
        "wr": 47.9
      },
      "1994": {
        "total": 62,
        "wr": 47.8
      },
      "1995": {
        "total": 63,
        "wr": 47.8
      },
      "1996": {
        "total": 65,
        "wr": 47.8
      },
      "1997": {
        "total": 67,
        "wr": 47.9
      },
      "1998": {
        "total": 69,
        "wr": 48.0
      },
      "1999": {
        "total": 70,
        "wr": 48.2
      },
      "2000": {
        "total": 72,
        "wr": 48.4
      },
      "2001": {
        "total": 74,
        "wr": 48.7
      },
      "2002": {
        "total": 76,
        "wr": 49.0
      },
      "2003": {
        "total": 78,
        "wr": 49.3
      },
      "2004": {
        "total": 79,
        "wr": 49.7
      },
      "2005": {
        "total": 81,
        "wr": 50.1
      },
      "2006": {
        "total": 83,
        "wr": 50.6
      },
      "2007": {
        "total": 85,
        "wr": 51.0
      },
      "2008": {
        "total": 86,
        "wr": 51.5
      },
      "2009": {
        "total": 88,
        "wr": 52.0
      },
      "2010": {
        "total": 90,
        "wr": 52.5
      },
      "2011": {
        "total": 92,
        "wr": 53.0
      },
      "2012": {
        "total": 94,
        "wr": 53.5
      },
      "2013": {
        "total": 95,
        "wr": 54.0
      },
      "2014": {
        "total": 97,
        "wr": 54.5
      },
      "2015": {
        "total": 99,
        "wr": 54.9
      },
      "2016": {
        "total": 101,
        "wr": 55.4
      },
      "2017": {
        "total": 102,
        "wr": 55.8
      },
      "2018": {
        "total": 104,
        "wr": 56.2
      },
      "2019": {
        "total": 106,
        "wr": 56.5
      },
      "2020": {
        "total": 108,
        "wr": 56.8
      },
      "2021": {
        "total": 110,
        "wr": 57.1
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 8,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 13,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 18,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 26,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "410": {
    "nos_code": "410",
    "label": "Antitrust",
    "category": "money",
    "sub": "antitrust violation",
    "total": 8900,
    "mo": 18,
    "wr": 31.4,
    "sp": 45.2,
    "sol": "4 years statute",
    "af": "Hourly ($350-600/hr) or contingency",
    "rng": {
      "lo": 180,
      "md": 720,
      "hi": 4200
    },
    "rp": 2.8,
    "ps": {
      "wr": 13.399999999999999,
      "total": 4022
    },
    "rr": {
      "wr": 33.4,
      "total": 4878
    },
    "cw": 36.4,
    "ends": [
      {
        "l": "Settlement",
        "p": 45.2,
        "c": "#0D9488",
        "n": 4022
      },
      {
        "l": "Dismissed",
        "p": 24.7,
        "c": "#94A3B8",
        "n": 2195
      },
      {
        "l": "Other",
        "p": 13.7,
        "c": "#475569",
        "n": 1219
      },
      {
        "l": "Summary Judgment",
        "p": 11.0,
        "c": "#D97706",
        "n": 975
      },
      {
        "l": "Default Judgment",
        "p": 3.8,
        "c": "#DB2777",
        "n": 341
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 97
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 48
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.2,
      "trial_loss": 1.8,
      "dismiss": 32.1,
      "fav_set": 41.2,
      "set_mo": 16,
      "trial_med": "$360"
    },
    "circuit_rates": {
      "1": 32.4,
      "2": 30.9,
      "3": 32.9,
      "4": 31.4,
      "5": 29.4,
      "6": 31.9,
      "7": 32.4,
      "8": 31.4,
      "9": 29.9,
      "10": 31.9,
      "11": 30.4,
      "dc": 28.9
    },
    "state_rates": {
      "PA": 36.2,
      "MI": 34.6,
      "VI": 21.8,
      "MD": 29.0,
      "NC": 33.0,
      "TX": 25.0,
      "SC": 33.8,
      "VA": 29.8,
      "WV": 28.2,
      "LA": 27.4,
      "KY": 29.8,
      "MS": 26.6,
      "OH": 30.6,
      "TN": 29.8,
      "IL": 33.0,
      "IN": 33.8,
      "WI": 32.2,
      "AR": 32.2,
      "IA": 33.0,
      "MN": 32.2,
      "MO": 30.6,
      "NE": 33.8,
      "ND": 33.0,
      "SD": 33.0,
      "AK": 25.0,
      "AZ": 31.4,
      "CA": 24.2,
      "HI": 32.2,
      "ID": 31.4,
      "MT": 33.0,
      "NV": 23.4,
      "OR": 32.2,
      "WA": 29.8,
      "CO": 31.4,
      "KS": 33.8,
      "NM": 33.0,
      "OK": 32.2,
      "UT": 32.2,
      "WY": 34.6,
      "AL": 24.2,
      "FL": 25.0,
      "GA": 29.0,
      "DC": 25.8,
      "ME": 33.0,
      "MA": 31.4,
      "NH": 31.4,
      "RI": 33.0,
      "PR": 27.4,
      "CT": 32.2,
      "NY": 23.4,
      "VT": 34.6,
      "DE": 33.0,
      "NJ": 32.2,
      "GU": 36.2
    },
    "yearly_trend": {
      "1990": {
        "total": 222,
        "wr": 27.0
      },
      "1991": {
        "total": 229,
        "wr": 26.8
      },
      "1992": {
        "total": 236,
        "wr": 26.6
      },
      "1993": {
        "total": 244,
        "wr": 26.5
      },
      "1994": {
        "total": 251,
        "wr": 26.4
      },
      "1995": {
        "total": 258,
        "wr": 26.4
      },
      "1996": {
        "total": 265,
        "wr": 26.4
      },
      "1997": {
        "total": 272,
        "wr": 26.5
      },
      "1998": {
        "total": 279,
        "wr": 26.6
      },
      "1999": {
        "total": 287,
        "wr": 26.8
      },
      "2000": {
        "total": 294,
        "wr": 27.0
      },
      "2001": {
        "total": 301,
        "wr": 27.3
      },
      "2002": {
        "total": 308,
        "wr": 27.6
      },
      "2003": {
        "total": 315,
        "wr": 27.9
      },
      "2004": {
        "total": 322,
        "wr": 28.3
      },
      "2005": {
        "total": 330,
        "wr": 28.7
      },
      "2006": {
        "total": 337,
        "wr": 29.2
      },
      "2007": {
        "total": 344,
        "wr": 29.6
      },
      "2008": {
        "total": 351,
        "wr": 30.1
      },
      "2009": {
        "total": 358,
        "wr": 30.6
      },
      "2010": {
        "total": 366,
        "wr": 31.1
      },
      "2011": {
        "total": 373,
        "wr": 31.6
      },
      "2012": {
        "total": 380,
        "wr": 32.1
      },
      "2013": {
        "total": 387,
        "wr": 32.6
      },
      "2014": {
        "total": 394,
        "wr": 33.1
      },
      "2015": {
        "total": 401,
        "wr": 33.5
      },
      "2016": {
        "total": 409,
        "wr": 34.0
      },
      "2017": {
        "total": 416,
        "wr": 34.4
      },
      "2018": {
        "total": 423,
        "wr": 34.8
      },
      "2019": {
        "total": 430,
        "wr": 35.1
      },
      "2020": {
        "total": 437,
        "wr": 35.4
      },
      "2021": {
        "total": 445,
        "wr": 35.7
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 6,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 9,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 12,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 18,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "422": {
    "nos_code": "422",
    "label": "Bankruptcy Appeal",
    "category": "money",
    "sub": "bankruptcy appeal",
    "total": 18600,
    "mo": 10,
    "wr": 41.2,
    "sp": 38.1,
    "sol": "10 days-1 year varies",
    "af": "Hourly ($300-500/hr)",
    "rng": {
      "lo": 42,
      "md": 220,
      "hi": 1300
    },
    "rp": 3.6,
    "ps": {
      "wr": 23.200000000000003,
      "total": 7086
    },
    "rr": {
      "wr": 43.2,
      "total": 11514
    },
    "cw": 46.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 38.1,
        "c": "#0D9488",
        "n": 7086
      },
      {
        "l": "Dismissed",
        "p": 27.9,
        "c": "#94A3B8",
        "n": 5181
      },
      {
        "l": "Other",
        "p": 15.5,
        "c": "#475569",
        "n": 2878
      },
      {
        "l": "Summary Judgment",
        "p": 12.4,
        "c": "#D97706",
        "n": 2302
      },
      {
        "l": "Default Judgment",
        "p": 4.3,
        "c": "#DB2777",
        "n": 805
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 230
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 115
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.1,
      "trial_loss": 2.4,
      "dismiss": 22.3,
      "fav_set": 45.1,
      "set_mo": 9,
      "trial_med": "$110"
    },
    "circuit_rates": {
      "1": 42.2,
      "2": 40.7,
      "3": 42.7,
      "4": 41.2,
      "5": 39.2,
      "6": 41.7,
      "7": 42.2,
      "8": 41.2,
      "9": 39.7,
      "10": 41.7,
      "11": 40.2,
      "dc": 38.7
    },
    "state_rates": {
      "PA": 46.0,
      "MI": 44.4,
      "VI": 31.6,
      "MD": 38.8,
      "NC": 42.8,
      "TX": 34.8,
      "SC": 43.6,
      "VA": 39.6,
      "WV": 38.0,
      "LA": 37.2,
      "KY": 39.6,
      "MS": 36.4,
      "OH": 40.4,
      "TN": 39.6,
      "IL": 42.8,
      "IN": 43.6,
      "WI": 42.0,
      "AR": 42.0,
      "IA": 42.8,
      "MN": 42.0,
      "MO": 40.4,
      "NE": 43.6,
      "ND": 42.8,
      "SD": 42.8,
      "AK": 34.8,
      "AZ": 41.2,
      "CA": 34.0,
      "HI": 42.0,
      "ID": 41.2,
      "MT": 42.8,
      "NV": 33.2,
      "OR": 42.0,
      "WA": 39.6,
      "CO": 41.2,
      "KS": 43.6,
      "NM": 42.8,
      "OK": 42.0,
      "UT": 42.0,
      "WY": 44.4,
      "AL": 34.0,
      "FL": 34.8,
      "GA": 38.8,
      "DC": 35.6,
      "ME": 42.8,
      "MA": 41.2,
      "NH": 41.2,
      "RI": 42.8,
      "PR": 37.2,
      "CT": 42.0,
      "NY": 33.2,
      "VT": 44.4,
      "DE": 42.8,
      "NJ": 42.0,
      "GU": 46.0
    },
    "yearly_trend": {
      "1990": {
        "total": 465,
        "wr": 36.8
      },
      "1991": {
        "total": 480,
        "wr": 36.6
      },
      "1992": {
        "total": 495,
        "wr": 36.4
      },
      "1993": {
        "total": 510,
        "wr": 36.3
      },
      "1994": {
        "total": 525,
        "wr": 36.2
      },
      "1995": {
        "total": 540,
        "wr": 36.2
      },
      "1996": {
        "total": 555,
        "wr": 36.2
      },
      "1997": {
        "total": 570,
        "wr": 36.3
      },
      "1998": {
        "total": 585,
        "wr": 36.4
      },
      "1999": {
        "total": 600,
        "wr": 36.6
      },
      "2000": {
        "total": 615,
        "wr": 36.8
      },
      "2001": {
        "total": 630,
        "wr": 37.1
      },
      "2002": {
        "total": 645,
        "wr": 37.4
      },
      "2003": {
        "total": 660,
        "wr": 37.7
      },
      "2004": {
        "total": 675,
        "wr": 38.1
      },
      "2005": {
        "total": 690,
        "wr": 38.5
      },
      "2006": {
        "total": 705,
        "wr": 39.0
      },
      "2007": {
        "total": 720,
        "wr": 39.4
      },
      "2008": {
        "total": 735,
        "wr": 39.9
      },
      "2009": {
        "total": 750,
        "wr": 40.4
      },
      "2010": {
        "total": 765,
        "wr": 40.9
      },
      "2011": {
        "total": 779,
        "wr": 41.4
      },
      "2012": {
        "total": 795,
        "wr": 41.9
      },
      "2013": {
        "total": 810,
        "wr": 42.4
      },
      "2014": {
        "total": 825,
        "wr": 42.9
      },
      "2015": {
        "total": 840,
        "wr": 43.3
      },
      "2016": {
        "total": 855,
        "wr": 43.8
      },
      "2017": {
        "total": 870,
        "wr": 44.2
      },
      "2018": {
        "total": 885,
        "wr": 44.6
      },
      "2019": {
        "total": 900,
        "wr": 44.9
      },
      "2020": {
        "total": 915,
        "wr": 45.2
      },
      "2021": {
        "total": 930,
        "wr": 45.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "423": {
    "nos_code": "423",
    "label": "Withdrawal",
    "category": "money",
    "sub": "bankruptcy withdrawal",
    "total": 3400,
    "mo": 6,
    "wr": 68.2,
    "sp": 45.1,
    "sol": "Varies",
    "af": "Hourly ($300-500/hr)",
    "rng": {
      "lo": 28,
      "md": 140,
      "hi": 840
    },
    "rp": 2.1,
    "ps": {
      "wr": 50.2,
      "total": 1533
    },
    "rr": {
      "wr": 70.2,
      "total": 1867
    },
    "cw": 73.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 45.1,
        "c": "#0D9488",
        "n": 1533
      },
      {
        "l": "Dismissed",
        "p": 24.7,
        "c": "#94A3B8",
        "n": 840
      },
      {
        "l": "Other",
        "p": 13.7,
        "c": "#475569",
        "n": 466
      },
      {
        "l": "Summary Judgment",
        "p": 11.0,
        "c": "#D97706",
        "n": 373
      },
      {
        "l": "Default Judgment",
        "p": 3.8,
        "c": "#DB2777",
        "n": 130
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 37
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 18
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 3.8,
      "trial_loss": 0.5,
      "dismiss": 11.2,
      "fav_set": 65.3,
      "set_mo": 6,
      "trial_med": "$70"
    },
    "circuit_rates": {
      "1": 69.2,
      "2": 67.7,
      "3": 69.7,
      "4": 68.2,
      "5": 66.2,
      "6": 68.7,
      "7": 69.2,
      "8": 68.2,
      "9": 66.7,
      "10": 68.7,
      "11": 67.2,
      "dc": 65.7
    },
    "state_rates": {
      "PA": 73.0,
      "MI": 71.4,
      "VI": 58.6,
      "MD": 65.8,
      "NC": 69.8,
      "TX": 61.8,
      "SC": 70.6,
      "VA": 66.6,
      "WV": 65.0,
      "LA": 64.2,
      "KY": 66.6,
      "MS": 63.4,
      "OH": 67.4,
      "TN": 66.6,
      "IL": 69.8,
      "IN": 70.6,
      "WI": 69.0,
      "AR": 69.0,
      "IA": 69.8,
      "MN": 69.0,
      "MO": 67.4,
      "NE": 70.6,
      "ND": 69.8,
      "SD": 69.8,
      "AK": 61.8,
      "AZ": 68.2,
      "CA": 61.0,
      "HI": 69.0,
      "ID": 68.2,
      "MT": 69.8,
      "NV": 60.2,
      "OR": 69.0,
      "WA": 66.6,
      "CO": 68.2,
      "KS": 70.6,
      "NM": 69.8,
      "OK": 69.0,
      "UT": 69.0,
      "WY": 71.4,
      "AL": 61.0,
      "FL": 61.8,
      "GA": 65.8,
      "DC": 62.6,
      "ME": 69.8,
      "MA": 68.2,
      "NH": 68.2,
      "RI": 69.8,
      "PR": 64.2,
      "CT": 69.0,
      "NY": 60.2,
      "VT": 71.4,
      "DE": 69.8,
      "NJ": 69.0,
      "GU": 73.0
    },
    "yearly_trend": {
      "1990": {
        "total": 85,
        "wr": 63.8
      },
      "1991": {
        "total": 87,
        "wr": 63.6
      },
      "1992": {
        "total": 90,
        "wr": 63.4
      },
      "1993": {
        "total": 93,
        "wr": 63.3
      },
      "1994": {
        "total": 95,
        "wr": 63.2
      },
      "1995": {
        "total": 98,
        "wr": 63.2
      },
      "1996": {
        "total": 101,
        "wr": 63.2
      },
      "1997": {
        "total": 104,
        "wr": 63.3
      },
      "1998": {
        "total": 106,
        "wr": 63.4
      },
      "1999": {
        "total": 109,
        "wr": 63.6
      },
      "2000": {
        "total": 112,
        "wr": 63.8
      },
      "2001": {
        "total": 115,
        "wr": 64.1
      },
      "2002": {
        "total": 117,
        "wr": 64.4
      },
      "2003": {
        "total": 120,
        "wr": 64.7
      },
      "2004": {
        "total": 123,
        "wr": 65.1
      },
      "2005": {
        "total": 126,
        "wr": 65.5
      },
      "2006": {
        "total": 128,
        "wr": 66.0
      },
      "2007": {
        "total": 131,
        "wr": 66.4
      },
      "2008": {
        "total": 134,
        "wr": 66.9
      },
      "2009": {
        "total": 137,
        "wr": 67.4
      },
      "2010": {
        "total": 139,
        "wr": 67.9
      },
      "2011": {
        "total": 142,
        "wr": 68.4
      },
      "2012": {
        "total": 145,
        "wr": 68.9
      },
      "2013": {
        "total": 148,
        "wr": 69.4
      },
      "2014": {
        "total": 150,
        "wr": 69.9
      },
      "2015": {
        "total": 153,
        "wr": 70.3
      },
      "2016": {
        "total": 156,
        "wr": 70.8
      },
      "2017": {
        "total": 159,
        "wr": 71.2
      },
      "2018": {
        "total": 161,
        "wr": 71.6
      },
      "2019": {
        "total": 164,
        "wr": 71.9
      },
      "2020": {
        "total": 167,
        "wr": 72.2
      },
      "2021": {
        "total": 170,
        "wr": 72.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
  "430": {
    "nos_code": "430",
    "label": "Banks and Banking",
    "category": "money",
    "sub": "banking regulation",
    "total": 4200,
    "mo": 12,
    "wr": 45.3,
    "sp": 48.2,
    "sol": "Varies by law",
    "af": "Hourly ($300-500/hr)",
    "rng": {
      "lo": 35,
      "md": 180,
      "hi": 1100
    },
    "rp": 1.8,
    "ps": {
      "wr": 27.299999999999997,
      "total": 2024
    },
    "rr": {
      "wr": 47.3,
      "total": 2176
    },
    "cw": 50.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.2,
        "c": "#0D9488",
        "n": 2024
      },
      {
        "l": "Dismissed",
        "p": 23.3,
        "c": "#94A3B8",
        "n": 979
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 544
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 435
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 152
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 43
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 21
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.6,
      "trial_loss": 1.4,
      "dismiss": 28.4,
      "fav_set": 48.1,
      "set_mo": 11,
      "trial_med": "$90"
    },
    "circuit_rates": {
      "1": 46.3,
      "2": 44.8,
      "3": 46.8,
      "4": 45.3,
      "5": 43.3,
      "6": 45.8,
      "7": 46.3,
      "8": 45.3,
      "9": 43.8,
      "10": 45.8,
      "11": 44.3,
      "dc": 42.8
    },
    "state_rates": {
      "PA": 50.1,
      "MI": 48.5,
      "VI": 35.7,
      "MD": 42.9,
      "NC": 46.9,
      "TX": 38.9,
      "SC": 47.7,
      "VA": 43.7,
      "WV": 42.1,
      "LA": 41.3,
      "KY": 43.7,
      "MS": 40.5,
      "OH": 44.5,
      "TN": 43.7,
      "IL": 46.9,
      "IN": 47.7,
      "WI": 46.1,
      "AR": 46.1,
      "IA": 46.9,
      "MN": 46.1,
      "MO": 44.5,
      "NE": 47.7,
      "ND": 46.9,
      "SD": 46.9,
      "AK": 38.9,
      "AZ": 45.3,
      "CA": 38.1,
      "HI": 46.1,
      "ID": 45.3,
      "MT": 46.9,
      "NV": 37.3,
      "OR": 46.1,
      "WA": 43.7,
      "CO": 45.3,
      "KS": 47.7,
      "NM": 46.9,
      "OK": 46.1,
      "UT": 46.1,
      "WY": 48.5,
      "AL": 38.1,
      "FL": 38.9,
      "GA": 42.9,
      "DC": 39.7,
      "ME": 46.9,
      "MA": 45.3,
      "NH": 45.3,
      "RI": 46.9,
      "PR": 41.3,
      "CT": 46.1,
      "NY": 37.3,
      "VT": 48.5,
      "DE": 46.9,
      "NJ": 46.1,
      "GU": 50.1
    },
    "yearly_trend": {
      "1990": {
        "total": 105,
        "wr": 40.9
      },
      "1991": {
        "total": 108,
        "wr": 40.7
      },
      "1992": {
        "total": 111,
        "wr": 40.5
      },
      "1993": {
        "total": 115,
        "wr": 40.4
      },
      "1994": {
        "total": 118,
        "wr": 40.3
      },
      "1995": {
        "total": 121,
        "wr": 40.3
      },
      "1996": {
        "total": 125,
        "wr": 40.3
      },
      "1997": {
        "total": 128,
        "wr": 40.4
      },
      "1998": {
        "total": 132,
        "wr": 40.5
      },
      "1999": {
        "total": 135,
        "wr": 40.7
      },
      "2000": {
        "total": 138,
        "wr": 40.9
      },
      "2001": {
        "total": 142,
        "wr": 41.2
      },
      "2002": {
        "total": 145,
        "wr": 41.5
      },
      "2003": {
        "total": 149,
        "wr": 41.8
      },
      "2004": {
        "total": 152,
        "wr": 42.2
      },
      "2005": {
        "total": 155,
        "wr": 42.6
      },
      "2006": {
        "total": 159,
        "wr": 43.1
      },
      "2007": {
        "total": 162,
        "wr": 43.5
      },
      "2008": {
        "total": 165,
        "wr": 44.0
      },
      "2009": {
        "total": 169,
        "wr": 44.5
      },
      "2010": {
        "total": 172,
        "wr": 45.0
      },
      "2011": {
        "total": 176,
        "wr": 45.5
      },
      "2012": {
        "total": 179,
        "wr": 46.0
      },
      "2013": {
        "total": 182,
        "wr": 46.5
      },
      "2014": {
        "total": 186,
        "wr": 47.0
      },
      "2015": {
        "total": 189,
        "wr": 47.4
      },
      "2016": {
        "total": 193,
        "wr": 47.9
      },
      "2017": {
        "total": 196,
        "wr": 48.3
      },
      "2018": {
        "total": 199,
        "wr": 48.7
      },
      "2019": {
        "total": 203,
        "wr": 49.0
      },
      "2020": {
        "total": 206,
        "wr": 49.3
      },
      "2021": {
        "total": 210,
        "wr": 49.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
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
        "mo": 12,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "441": {
    "nos_code": "441",
    "label": "Voting",
    "category": "rights",
    "sub": "voting rights violation",
    "total": 3400,
    "mo": 9,
    "wr": 52.8,
    "sp": 61.2,
    "sol": "Voting Rights Act specifics",
    "af": "Contingency + statutory fees",
    "rng": {
      "lo": 32,
      "md": 125,
      "hi": 680
    },
    "rp": 1.8,
    "ps": {
      "wr": 34.8,
      "total": 2080
    },
    "rr": {
      "wr": 54.8,
      "total": 1320
    },
    "cw": 57.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 61.2,
        "c": "#0D9488",
        "n": 2080
      },
      {
        "l": "Dismissed",
        "p": 17.5,
        "c": "#94A3B8",
        "n": 594
      },
      {
        "l": "Other",
        "p": 9.7,
        "c": "#475569",
        "n": 330
      },
      {
        "l": "Summary Judgment",
        "p": 7.8,
        "c": "#D97706",
        "n": 264
      },
      {
        "l": "Default Judgment",
        "p": 2.7,
        "c": "#DB2777",
        "n": 92
      },
      {
        "l": "Trial",
        "p": 0.8,
        "c": "#7C3AED",
        "n": 26
      },
      {
        "l": "Consent",
        "p": 0.4,
        "c": "#2563EB",
        "n": 13
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 4.2,
      "trial_loss": 1.2,
      "dismiss": 15.6,
      "fav_set": 58.1,
      "set_mo": 9,
      "trial_med": "$62"
    },
    "circuit_rates": {
      "1": 53.8,
      "2": 52.3,
      "3": 54.3,
      "4": 52.8,
      "5": 50.8,
      "6": 53.3,
      "7": 53.8,
      "8": 52.8,
      "9": 51.3,
      "10": 53.3,
      "11": 51.8,
      "dc": 50.3
    },
    "state_rates": {
      "PA": 57.6,
      "MI": 56.0,
      "VI": 43.2,
      "MD": 50.4,
      "NC": 54.4,
      "TX": 46.4,
      "SC": 55.2,
      "VA": 51.2,
      "WV": 49.6,
      "LA": 48.8,
      "KY": 51.2,
      "MS": 48.0,
      "OH": 52.0,
      "TN": 51.2,
      "IL": 54.4,
      "IN": 55.2,
      "WI": 53.6,
      "AR": 53.6,
      "IA": 54.4,
      "MN": 53.6,
      "MO": 52.0,
      "NE": 55.2,
      "ND": 54.4,
      "SD": 54.4,
      "AK": 46.4,
      "AZ": 52.8,
      "CA": 45.6,
      "HI": 53.6,
      "ID": 52.8,
      "MT": 54.4,
      "NV": 44.8,
      "OR": 53.6,
      "WA": 51.2,
      "CO": 52.8,
      "KS": 55.2,
      "NM": 54.4,
      "OK": 53.6,
      "UT": 53.6,
      "WY": 56.0,
      "AL": 45.6,
      "FL": 46.4,
      "GA": 50.4,
      "DC": 47.2,
      "ME": 54.4,
      "MA": 52.8,
      "NH": 52.8,
      "RI": 54.4,
      "PR": 48.8,
      "CT": 53.6,
      "NY": 44.8,
      "VT": 56.0,
      "DE": 54.4,
      "NJ": 53.6,
      "GU": 57.6
    },
    "yearly_trend": {
      "1990": {
        "total": 85,
        "wr": 48.4
      },
      "1991": {
        "total": 87,
        "wr": 48.2
      },
      "1992": {
        "total": 90,
        "wr": 48.0
      },
      "1993": {
        "total": 93,
        "wr": 47.9
      },
      "1994": {
        "total": 95,
        "wr": 47.8
      },
      "1995": {
        "total": 98,
        "wr": 47.8
      },
      "1996": {
        "total": 101,
        "wr": 47.8
      },
      "1997": {
        "total": 104,
        "wr": 47.9
      },
      "1998": {
        "total": 106,
        "wr": 48.0
      },
      "1999": {
        "total": 109,
        "wr": 48.2
      },
      "2000": {
        "total": 112,
        "wr": 48.4
      },
      "2001": {
        "total": 115,
        "wr": 48.7
      },
      "2002": {
        "total": 117,
        "wr": 49.0
      },
      "2003": {
        "total": 120,
        "wr": 49.3
      },
      "2004": {
        "total": 123,
        "wr": 49.7
      },
      "2005": {
        "total": 126,
        "wr": 50.1
      },
      "2006": {
        "total": 128,
        "wr": 50.6
      },
      "2007": {
        "total": 131,
        "wr": 51.0
      },
      "2008": {
        "total": 134,
        "wr": 51.5
      },
      "2009": {
        "total": 137,
        "wr": 52.0
      },
      "2010": {
        "total": 139,
        "wr": 52.5
      },
      "2011": {
        "total": 142,
        "wr": 53.0
      },
      "2012": {
        "total": 145,
        "wr": 53.5
      },
      "2013": {
        "total": 148,
        "wr": 54.0
      },
      "2014": {
        "total": 150,
        "wr": 54.5
      },
      "2015": {
        "total": 153,
        "wr": 54.9
      },
      "2016": {
        "total": 156,
        "wr": 55.4
      },
      "2017": {
        "total": 159,
        "wr": 55.8
      },
      "2018": {
        "total": 161,
        "wr": 56.2
      },
      "2019": {
        "total": 164,
        "wr": 56.5
      },
      "2020": {
        "total": 167,
        "wr": 56.8
      },
      "2021": {
        "total": 170,
        "wr": 57.1
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
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
        "mo": 9,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "444": {
    "nos_code": "444",
    "label": "Welfare",
    "category": "gov",
    "sub": "welfare benefits dispute",
    "total": 8900,
    "mo": 6,
    "wr": 31.2,
    "sp": 48.1,
    "sol": "30-60 days appeal",
    "af": "Hourly or public interest",
    "rng": {
      "lo": 2,
      "md": 8,
      "hi": 45
    },
    "rp": 3.6,
    "ps": {
      "wr": 13.2,
      "total": 4280
    },
    "rr": {
      "wr": 33.2,
      "total": 4620
    },
    "cw": 36.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.1,
        "c": "#0D9488",
        "n": 4280
      },
      {
        "l": "Dismissed",
        "p": 23.4,
        "c": "#94A3B8",
        "n": 2079
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 1155
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 924
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 323
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 92
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 46
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.1,
      "trial_loss": 1.3,
      "dismiss": 35.8,
      "fav_set": 38.2,
      "set_mo": 5,
      "trial_med": "$4"
    },
    "circuit_rates": {
      "1": 32.2,
      "2": 30.7,
      "3": 32.7,
      "4": 31.2,
      "5": 29.2,
      "6": 31.7,
      "7": 32.2,
      "8": 31.2,
      "9": 29.7,
      "10": 31.7,
      "11": 30.2,
      "dc": 28.7
    },
    "state_rates": {
      "PA": 36.0,
      "MI": 34.4,
      "VI": 21.6,
      "MD": 28.8,
      "NC": 32.8,
      "TX": 24.8,
      "SC": 33.6,
      "VA": 29.6,
      "WV": 28.0,
      "LA": 27.2,
      "KY": 29.6,
      "MS": 26.4,
      "OH": 30.4,
      "TN": 29.6,
      "IL": 32.8,
      "IN": 33.6,
      "WI": 32.0,
      "AR": 32.0,
      "IA": 32.8,
      "MN": 32.0,
      "MO": 30.4,
      "NE": 33.6,
      "ND": 32.8,
      "SD": 32.8,
      "AK": 24.8,
      "AZ": 31.2,
      "CA": 24.0,
      "HI": 32.0,
      "ID": 31.2,
      "MT": 32.8,
      "NV": 23.2,
      "OR": 32.0,
      "WA": 29.6,
      "CO": 31.2,
      "KS": 33.6,
      "NM": 32.8,
      "OK": 32.0,
      "UT": 32.0,
      "WY": 34.4,
      "AL": 24.0,
      "FL": 24.8,
      "GA": 28.8,
      "DC": 25.6,
      "ME": 32.8,
      "MA": 31.2,
      "NH": 31.2,
      "RI": 32.8,
      "PR": 27.2,
      "CT": 32.0,
      "NY": 23.2,
      "VT": 34.4,
      "DE": 32.8,
      "NJ": 32.0,
      "GU": 36.0
    },
    "yearly_trend": {
      "1990": {
        "total": 222,
        "wr": 26.8
      },
      "1991": {
        "total": 229,
        "wr": 26.6
      },
      "1992": {
        "total": 236,
        "wr": 26.4
      },
      "1993": {
        "total": 244,
        "wr": 26.3
      },
      "1994": {
        "total": 251,
        "wr": 26.2
      },
      "1995": {
        "total": 258,
        "wr": 26.2
      },
      "1996": {
        "total": 265,
        "wr": 26.2
      },
      "1997": {
        "total": 272,
        "wr": 26.3
      },
      "1998": {
        "total": 279,
        "wr": 26.4
      },
      "1999": {
        "total": 287,
        "wr": 26.6
      },
      "2000": {
        "total": 294,
        "wr": 26.8
      },
      "2001": {
        "total": 301,
        "wr": 27.1
      },
      "2002": {
        "total": 308,
        "wr": 27.4
      },
      "2003": {
        "total": 315,
        "wr": 27.7
      },
      "2004": {
        "total": 322,
        "wr": 28.1
      },
      "2005": {
        "total": 330,
        "wr": 28.5
      },
      "2006": {
        "total": 337,
        "wr": 29.0
      },
      "2007": {
        "total": 344,
        "wr": 29.4
      },
      "2008": {
        "total": 351,
        "wr": 29.9
      },
      "2009": {
        "total": 358,
        "wr": 30.4
      },
      "2010": {
        "total": 366,
        "wr": 30.9
      },
      "2011": {
        "total": 373,
        "wr": 31.4
      },
      "2012": {
        "total": 380,
        "wr": 31.9
      },
      "2013": {
        "total": 387,
        "wr": 32.4
      },
      "2014": {
        "total": 394,
        "wr": 32.9
      },
      "2015": {
        "total": 401,
        "wr": 33.3
      },
      "2016": {
        "total": 409,
        "wr": 33.8
      },
      "2017": {
        "total": 416,
        "wr": 34.2
      },
      "2018": {
        "total": 423,
        "wr": 34.6
      },
      "2019": {
        "total": 430,
        "wr": 34.9
      },
      "2020": {
        "total": 437,
        "wr": 35.2
      },
      "2021": {
        "total": 445,
        "wr": 35.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
  "446": {
    "nos_code": "446",
    "label": "ADA - Other",
    "category": "rights",
    "sub": "ADA other",
    "total": 12800,
    "mo": 10,
    "wr": 24.3,
    "sp": 48.2,
    "sol": "2-3 years varies",
    "af": "Contingency (33-40%)",
    "rng": {
      "lo": 18,
      "md": 65,
      "hi": 420
    },
    "rp": 8.2,
    "ps": {
      "wr": 6.300000000000001,
      "total": 6169
    },
    "rr": {
      "wr": 26.3,
      "total": 6631
    },
    "cw": 29.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.2,
        "c": "#0D9488",
        "n": 6169
      },
      {
        "l": "Dismissed",
        "p": 23.3,
        "c": "#94A3B8",
        "n": 2983
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 1657
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 1326
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 464
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 132
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 66
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.1,
      "trial_loss": 0.8,
      "dismiss": 29.5,
      "fav_set": 45.2,
      "set_mo": 9,
      "trial_med": "$32"
    },
    "circuit_rates": {
      "1": 25.3,
      "2": 23.8,
      "3": 25.8,
      "4": 24.3,
      "5": 22.3,
      "6": 24.8,
      "7": 25.3,
      "8": 24.3,
      "9": 22.8,
      "10": 24.8,
      "11": 23.3,
      "dc": 21.8
    },
    "state_rates": {
      "PA": 29.1,
      "MI": 27.5,
      "VI": 14.7,
      "MD": 21.9,
      "NC": 25.9,
      "TX": 17.9,
      "SC": 26.7,
      "VA": 22.7,
      "WV": 21.1,
      "LA": 20.3,
      "KY": 22.7,
      "MS": 19.5,
      "OH": 23.5,
      "TN": 22.7,
      "IL": 25.9,
      "IN": 26.7,
      "WI": 25.1,
      "AR": 25.1,
      "IA": 25.9,
      "MN": 25.1,
      "MO": 23.5,
      "NE": 26.7,
      "ND": 25.9,
      "SD": 25.9,
      "AK": 17.9,
      "AZ": 24.3,
      "CA": 17.1,
      "HI": 25.1,
      "ID": 24.3,
      "MT": 25.9,
      "NV": 16.3,
      "OR": 25.1,
      "WA": 22.7,
      "CO": 24.3,
      "KS": 26.7,
      "NM": 25.9,
      "OK": 25.1,
      "UT": 25.1,
      "WY": 27.5,
      "AL": 17.1,
      "FL": 17.9,
      "GA": 21.9,
      "DC": 18.7,
      "ME": 25.9,
      "MA": 24.3,
      "NH": 24.3,
      "RI": 25.9,
      "PR": 20.3,
      "CT": 25.1,
      "NY": 16.3,
      "VT": 27.5,
      "DE": 25.9,
      "NJ": 25.1,
      "GU": 29.1
    },
    "yearly_trend": {
      "1990": {
        "total": 320,
        "wr": 19.9
      },
      "1991": {
        "total": 330,
        "wr": 19.7
      },
      "1992": {
        "total": 340,
        "wr": 19.5
      },
      "1993": {
        "total": 350,
        "wr": 19.4
      },
      "1994": {
        "total": 361,
        "wr": 19.3
      },
      "1995": {
        "total": 371,
        "wr": 19.3
      },
      "1996": {
        "total": 381,
        "wr": 19.3
      },
      "1997": {
        "total": 392,
        "wr": 19.4
      },
      "1998": {
        "total": 402,
        "wr": 19.5
      },
      "1999": {
        "total": 412,
        "wr": 19.7
      },
      "2000": {
        "total": 423,
        "wr": 19.9
      },
      "2001": {
        "total": 433,
        "wr": 20.2
      },
      "2002": {
        "total": 443,
        "wr": 20.5
      },
      "2003": {
        "total": 454,
        "wr": 20.8
      },
      "2004": {
        "total": 464,
        "wr": 21.2
      },
      "2005": {
        "total": 474,
        "wr": 21.6
      },
      "2006": {
        "total": 485,
        "wr": 22.1
      },
      "2007": {
        "total": 495,
        "wr": 22.5
      },
      "2008": {
        "total": 505,
        "wr": 23.0
      },
      "2009": {
        "total": 516,
        "wr": 23.5
      },
      "2010": {
        "total": 526,
        "wr": 24.0
      },
      "2011": {
        "total": 536,
        "wr": 24.5
      },
      "2012": {
        "total": 547,
        "wr": 25.0
      },
      "2013": {
        "total": 557,
        "wr": 25.5
      },
      "2014": {
        "total": 567,
        "wr": 26.0
      },
      "2015": {
        "total": 578,
        "wr": 26.4
      },
      "2016": {
        "total": 588,
        "wr": 26.9
      },
      "2017": {
        "total": 598,
        "wr": 27.3
      },
      "2018": {
        "total": 609,
        "wr": 27.7
      },
      "2019": {
        "total": 619,
        "wr": 28.0
      },
      "2020": {
        "total": 629,
        "wr": 28.3
      },
      "2021": {
        "total": 640,
        "wr": 28.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "448": {
    "nos_code": "448",
    "label": "ADEA",
    "category": "work",
    "sub": "age discrimination",
    "total": 25600,
    "mo": 14,
    "wr": 27.8,
    "sp": 51.0,
    "sol": "180 days EEOC, 1-3 years varies",
    "af": "Contingency (33-40%), fee-shifting",
    "rng": {
      "lo": 25,
      "md": 85,
      "hi": 520
    },
    "rp": 6.8,
    "ps": {
      "wr": 9.8,
      "total": 13056
    },
    "rr": {
      "wr": 29.8,
      "total": 12544
    },
    "cw": 32.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 51.0,
        "c": "#0D9488",
        "n": 13056
      },
      {
        "l": "Dismissed",
        "p": 22.1,
        "c": "#94A3B8",
        "n": 5644
      },
      {
        "l": "Other",
        "p": 12.2,
        "c": "#475569",
        "n": 3136
      },
      {
        "l": "Summary Judgment",
        "p": 9.8,
        "c": "#D97706",
        "n": 2508
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 878
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 250
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 125
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.8,
      "trial_loss": 1.6,
      "dismiss": 31.2,
      "fav_set": 48.9,
      "set_mo": 11,
      "trial_med": "$42"
    },
    "circuit_rates": {
      "1": 28.8,
      "2": 27.3,
      "3": 29.3,
      "4": 27.8,
      "5": 25.8,
      "6": 28.3,
      "7": 28.8,
      "8": 27.8,
      "9": 26.3,
      "10": 28.3,
      "11": 26.8,
      "dc": 25.3
    },
    "state_rates": {
      "PA": 32.6,
      "MI": 31.0,
      "VI": 18.2,
      "MD": 25.4,
      "NC": 29.4,
      "TX": 21.4,
      "SC": 30.2,
      "VA": 26.2,
      "WV": 24.6,
      "LA": 23.8,
      "KY": 26.2,
      "MS": 23.0,
      "OH": 27.0,
      "TN": 26.2,
      "IL": 29.4,
      "IN": 30.2,
      "WI": 28.6,
      "AR": 28.6,
      "IA": 29.4,
      "MN": 28.6,
      "MO": 27.0,
      "NE": 30.2,
      "ND": 29.4,
      "SD": 29.4,
      "AK": 21.4,
      "AZ": 27.8,
      "CA": 20.6,
      "HI": 28.6,
      "ID": 27.8,
      "MT": 29.4,
      "NV": 19.8,
      "OR": 28.6,
      "WA": 26.2,
      "CO": 27.8,
      "KS": 30.2,
      "NM": 29.4,
      "OK": 28.6,
      "UT": 28.6,
      "WY": 31.0,
      "AL": 20.6,
      "FL": 21.4,
      "GA": 25.4,
      "DC": 22.2,
      "ME": 29.4,
      "MA": 27.8,
      "NH": 27.8,
      "RI": 29.4,
      "PR": 23.8,
      "CT": 28.6,
      "NY": 19.8,
      "VT": 31.0,
      "DE": 29.4,
      "NJ": 28.6,
      "GU": 32.6
    },
    "yearly_trend": {
      "1990": {
        "total": 640,
        "wr": 23.4
      },
      "1991": {
        "total": 660,
        "wr": 23.2
      },
      "1992": {
        "total": 681,
        "wr": 23.0
      },
      "1993": {
        "total": 701,
        "wr": 22.9
      },
      "1994": {
        "total": 722,
        "wr": 22.8
      },
      "1995": {
        "total": 743,
        "wr": 22.8
      },
      "1996": {
        "total": 763,
        "wr": 22.8
      },
      "1997": {
        "total": 784,
        "wr": 22.9
      },
      "1998": {
        "total": 805,
        "wr": 23.0
      },
      "1999": {
        "total": 825,
        "wr": 23.2
      },
      "2000": {
        "total": 846,
        "wr": 23.4
      },
      "2001": {
        "total": 867,
        "wr": 23.7
      },
      "2002": {
        "total": 887,
        "wr": 24.0
      },
      "2003": {
        "total": 908,
        "wr": 24.3
      },
      "2004": {
        "total": 929,
        "wr": 24.7
      },
      "2005": {
        "total": 949,
        "wr": 25.1
      },
      "2006": {
        "total": 970,
        "wr": 25.6
      },
      "2007": {
        "total": 990,
        "wr": 26.0
      },
      "2008": {
        "total": 1011,
        "wr": 26.5
      },
      "2009": {
        "total": 1032,
        "wr": 27.0
      },
      "2010": {
        "total": 1052,
        "wr": 27.5
      },
      "2011": {
        "total": 1073,
        "wr": 28.0
      },
      "2012": {
        "total": 1094,
        "wr": 28.5
      },
      "2013": {
        "total": 1114,
        "wr": 29.0
      },
      "2014": {
        "total": 1135,
        "wr": 29.5
      },
      "2015": {
        "total": 1156,
        "wr": 29.9
      },
      "2016": {
        "total": 1176,
        "wr": 30.4
      },
      "2017": {
        "total": 1197,
        "wr": 30.8
      },
      "2018": {
        "total": 1218,
        "wr": 31.2
      },
      "2019": {
        "total": 1238,
        "wr": 31.5
      },
      "2020": {
        "total": 1259,
        "wr": 31.8
      },
      "2021": {
        "total": 1280,
        "wr": 32.1
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 7,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 9,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 14,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "450": {
    "nos_code": "450",
    "label": "Interstate Commerce",
    "category": "money",
    "sub": "interstate commerce",
    "total": 1800,
    "mo": 13,
    "wr": 42.1,
    "sp": 45.2,
    "sol": "Varies",
    "af": "Hourly ($300-500/hr)",
    "rng": {
      "lo": 22,
      "md": 95,
      "hi": 580
    },
    "rp": 1.2,
    "ps": {
      "wr": 24.1,
      "total": 813
    },
    "rr": {
      "wr": 44.1,
      "total": 987
    },
    "cw": 47.1,
    "ends": [
      {
        "l": "Settlement",
        "p": 45.2,
        "c": "#0D9488",
        "n": 813
      },
      {
        "l": "Dismissed",
        "p": 24.7,
        "c": "#94A3B8",
        "n": 444
      },
      {
        "l": "Other",
        "p": 13.7,
        "c": "#475569",
        "n": 246
      },
      {
        "l": "Summary Judgment",
        "p": 11.0,
        "c": "#D97706",
        "n": 197
      },
      {
        "l": "Default Judgment",
        "p": 3.8,
        "c": "#DB2777",
        "n": 69
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 19
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 9
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.4,
      "trial_loss": 1.2,
      "dismiss": 35.2,
      "fav_set": 44.3,
      "set_mo": 12,
      "trial_med": "$47"
    },
    "circuit_rates": {
      "1": 43.1,
      "2": 41.6,
      "3": 43.6,
      "4": 42.1,
      "5": 40.1,
      "6": 42.6,
      "7": 43.1,
      "8": 42.1,
      "9": 40.6,
      "10": 42.6,
      "11": 41.1,
      "dc": 39.6
    },
    "state_rates": {
      "PA": 46.9,
      "MI": 45.3,
      "VI": 32.5,
      "MD": 39.7,
      "NC": 43.7,
      "TX": 35.7,
      "SC": 44.5,
      "VA": 40.5,
      "WV": 38.9,
      "LA": 38.1,
      "KY": 40.5,
      "MS": 37.3,
      "OH": 41.3,
      "TN": 40.5,
      "IL": 43.7,
      "IN": 44.5,
      "WI": 42.9,
      "AR": 42.9,
      "IA": 43.7,
      "MN": 42.9,
      "MO": 41.3,
      "NE": 44.5,
      "ND": 43.7,
      "SD": 43.7,
      "AK": 35.7,
      "AZ": 42.1,
      "CA": 34.9,
      "HI": 42.9,
      "ID": 42.1,
      "MT": 43.7,
      "NV": 34.1,
      "OR": 42.9,
      "WA": 40.5,
      "CO": 42.1,
      "KS": 44.5,
      "NM": 43.7,
      "OK": 42.9,
      "UT": 42.9,
      "WY": 45.3,
      "AL": 34.9,
      "FL": 35.7,
      "GA": 39.7,
      "DC": 36.5,
      "ME": 43.7,
      "MA": 42.1,
      "NH": 42.1,
      "RI": 43.7,
      "PR": 38.1,
      "CT": 42.9,
      "NY": 34.1,
      "VT": 45.3,
      "DE": 43.7,
      "NJ": 42.9,
      "GU": 46.9
    },
    "yearly_trend": {
      "1990": {
        "total": 45,
        "wr": 37.7
      },
      "1991": {
        "total": 46,
        "wr": 37.5
      },
      "1992": {
        "total": 47,
        "wr": 37.3
      },
      "1993": {
        "total": 49,
        "wr": 37.2
      },
      "1994": {
        "total": 50,
        "wr": 37.1
      },
      "1995": {
        "total": 52,
        "wr": 37.1
      },
      "1996": {
        "total": 53,
        "wr": 37.1
      },
      "1997": {
        "total": 55,
        "wr": 37.2
      },
      "1998": {
        "total": 56,
        "wr": 37.3
      },
      "1999": {
        "total": 58,
        "wr": 37.5
      },
      "2000": {
        "total": 59,
        "wr": 37.7
      },
      "2001": {
        "total": 60,
        "wr": 38.0
      },
      "2002": {
        "total": 62,
        "wr": 38.3
      },
      "2003": {
        "total": 63,
        "wr": 38.6
      },
      "2004": {
        "total": 65,
        "wr": 39.0
      },
      "2005": {
        "total": 66,
        "wr": 39.4
      },
      "2006": {
        "total": 68,
        "wr": 39.9
      },
      "2007": {
        "total": 69,
        "wr": 40.3
      },
      "2008": {
        "total": 71,
        "wr": 40.8
      },
      "2009": {
        "total": 72,
        "wr": 41.3
      },
      "2010": {
        "total": 74,
        "wr": 41.8
      },
      "2011": {
        "total": 75,
        "wr": 42.3
      },
      "2012": {
        "total": 76,
        "wr": 42.8
      },
      "2013": {
        "total": 78,
        "wr": 43.3
      },
      "2014": {
        "total": 79,
        "wr": 43.8
      },
      "2015": {
        "total": 81,
        "wr": 44.2
      },
      "2016": {
        "total": 82,
        "wr": 44.7
      },
      "2017": {
        "total": 84,
        "wr": 45.1
      },
      "2018": {
        "total": 85,
        "wr": 45.5
      },
      "2019": {
        "total": 87,
        "wr": 45.8
      },
      "2020": {
        "total": 88,
        "wr": 46.1
      },
      "2021": {
        "total": 90,
        "wr": 46.4
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
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
        "mo": 13,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "460": {
    "nos_code": "460",
    "label": "Deportation (Other)",
    "category": "gov",
    "sub": "deportation related",
    "total": 5600,
    "mo": 13,
    "wr": 19.8,
    "sp": 65.2,
    "sol": "Varies by INA",
    "af": "Hourly ($300-500/hr)",
    "rng": {
      "lo": 0,
      "md": 0,
      "hi": 45
    },
    "rp": 9.2,
    "ps": {
      "wr": 5,
      "total": 3651
    },
    "rr": {
      "wr": 21.8,
      "total": 1949
    },
    "cw": 24.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 65.2,
        "c": "#0D9488",
        "n": 3651
      },
      {
        "l": "Dismissed",
        "p": 15.7,
        "c": "#94A3B8",
        "n": 877
      },
      {
        "l": "Other",
        "p": 8.7,
        "c": "#475569",
        "n": 487
      },
      {
        "l": "Summary Judgment",
        "p": 7.0,
        "c": "#D97706",
        "n": 389
      },
      {
        "l": "Default Judgment",
        "p": 2.4,
        "c": "#DB2777",
        "n": 136
      },
      {
        "l": "Trial",
        "p": 0.7,
        "c": "#7C3AED",
        "n": 38
      },
      {
        "l": "Consent",
        "p": 0.3,
        "c": "#2563EB",
        "n": 19
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.3,
      "trial_loss": 0.7,
      "dismiss": 57.1,
      "fav_set": 21.8,
      "set_mo": 11,
      "trial_med": "N/A"
    },
    "circuit_rates": {
      "1": 20.8,
      "2": 19.3,
      "3": 21.3,
      "4": 19.8,
      "5": 17.8,
      "6": 20.3,
      "7": 20.8,
      "8": 19.8,
      "9": 18.3,
      "10": 20.3,
      "11": 18.8,
      "dc": 17.3
    },
    "state_rates": {
      "PA": 24.6,
      "MI": 23.0,
      "VI": 10.2,
      "MD": 17.4,
      "NC": 21.4,
      "TX": 13.4,
      "SC": 22.2,
      "VA": 18.2,
      "WV": 16.6,
      "LA": 15.8,
      "KY": 18.2,
      "MS": 15.0,
      "OH": 19.0,
      "TN": 18.2,
      "IL": 21.4,
      "IN": 22.2,
      "WI": 20.6,
      "AR": 20.6,
      "IA": 21.4,
      "MN": 20.6,
      "MO": 19.0,
      "NE": 22.2,
      "ND": 21.4,
      "SD": 21.4,
      "AK": 13.4,
      "AZ": 19.8,
      "CA": 12.6,
      "HI": 20.6,
      "ID": 19.8,
      "MT": 21.4,
      "NV": 11.8,
      "OR": 20.6,
      "WA": 18.2,
      "CO": 19.8,
      "KS": 22.2,
      "NM": 21.4,
      "OK": 20.6,
      "UT": 20.6,
      "WY": 23.0,
      "AL": 12.6,
      "FL": 13.4,
      "GA": 17.4,
      "DC": 14.2,
      "ME": 21.4,
      "MA": 19.8,
      "NH": 19.8,
      "RI": 21.4,
      "PR": 15.8,
      "CT": 20.6,
      "NY": 11.8,
      "VT": 23.0,
      "DE": 21.4,
      "NJ": 20.6,
      "GU": 24.6
    },
    "yearly_trend": {
      "1990": {
        "total": 140,
        "wr": 15.4
      },
      "1991": {
        "total": 144,
        "wr": 15.2
      },
      "1992": {
        "total": 149,
        "wr": 15.0
      },
      "1993": {
        "total": 153,
        "wr": 14.9
      },
      "1994": {
        "total": 158,
        "wr": 14.8
      },
      "1995": {
        "total": 162,
        "wr": 14.8
      },
      "1996": {
        "total": 167,
        "wr": 14.8
      },
      "1997": {
        "total": 171,
        "wr": 14.9
      },
      "1998": {
        "total": 176,
        "wr": 15.0
      },
      "1999": {
        "total": 180,
        "wr": 15.2
      },
      "2000": {
        "total": 185,
        "wr": 15.4
      },
      "2001": {
        "total": 189,
        "wr": 15.7
      },
      "2002": {
        "total": 194,
        "wr": 16.0
      },
      "2003": {
        "total": 198,
        "wr": 16.3
      },
      "2004": {
        "total": 203,
        "wr": 16.7
      },
      "2005": {
        "total": 207,
        "wr": 17.1
      },
      "2006": {
        "total": 212,
        "wr": 17.6
      },
      "2007": {
        "total": 216,
        "wr": 18.0
      },
      "2008": {
        "total": 221,
        "wr": 18.5
      },
      "2009": {
        "total": 225,
        "wr": 19.0
      },
      "2010": {
        "total": 230,
        "wr": 19.5
      },
      "2011": {
        "total": 234,
        "wr": 20.0
      },
      "2012": {
        "total": 239,
        "wr": 20.5
      },
      "2013": {
        "total": 243,
        "wr": 21.0
      },
      "2014": {
        "total": 248,
        "wr": 21.5
      },
      "2015": {
        "total": 252,
        "wr": 21.9
      },
      "2016": {
        "total": 257,
        "wr": 22.4
      },
      "2017": {
        "total": 261,
        "wr": 22.8
      },
      "2018": {
        "total": 266,
        "wr": 23.2
      },
      "2019": {
        "total": 270,
        "wr": 23.5
      },
      "2020": {
        "total": 275,
        "wr": 23.8
      },
      "2021": {
        "total": 280,
        "wr": 24.1
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
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
        "mo": 13,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "462": {
    "nos_code": "462",
    "label": "Deportation",
    "category": "gov",
    "sub": "deportation",
    "total": 42800,
    "mo": 14,
    "wr": 18.2,
    "sp": 68.4,
    "sol": "Varies by INA",
    "af": "Hourly ($300-500/hr), some pro bono",
    "rng": {
      "lo": 0,
      "md": 0,
      "hi": 50
    },
    "rp": 22.4,
    "ps": {
      "wr": 5,
      "total": 29275
    },
    "rr": {
      "wr": 20.2,
      "total": 13525
    },
    "cw": 23.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 68.4,
        "c": "#0D9488",
        "n": 29275
      },
      {
        "l": "Dismissed",
        "p": 14.2,
        "c": "#94A3B8",
        "n": 6086
      },
      {
        "l": "Other",
        "p": 7.9,
        "c": "#475569",
        "n": 3381
      },
      {
        "l": "Summary Judgment",
        "p": 6.3,
        "c": "#D97706",
        "n": 2705
      },
      {
        "l": "Default Judgment",
        "p": 2.2,
        "c": "#DB2777",
        "n": 946
      },
      {
        "l": "Trial",
        "p": 0.6,
        "c": "#7C3AED",
        "n": 270
      },
      {
        "l": "Consent",
        "p": 0.3,
        "c": "#2563EB",
        "n": 135
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.4,
      "trial_loss": 0.8,
      "dismiss": 58.2,
      "fav_set": 20.1,
      "set_mo": 12,
      "trial_med": "N/A"
    },
    "circuit_rates": {
      "1": 19.2,
      "2": 17.7,
      "3": 19.7,
      "4": 18.2,
      "5": 16.2,
      "6": 18.7,
      "7": 19.2,
      "8": 18.2,
      "9": 16.7,
      "10": 18.7,
      "11": 17.2,
      "dc": 15.7
    },
    "state_rates": {
      "PA": 23.0,
      "MI": 21.4,
      "VI": 8.6,
      "MD": 15.8,
      "NC": 19.8,
      "TX": 11.8,
      "SC": 20.6,
      "VA": 16.6,
      "WV": 15.0,
      "LA": 14.2,
      "KY": 16.6,
      "MS": 13.4,
      "OH": 17.4,
      "TN": 16.6,
      "IL": 19.8,
      "IN": 20.6,
      "WI": 19.0,
      "AR": 19.0,
      "IA": 19.8,
      "MN": 19.0,
      "MO": 17.4,
      "NE": 20.6,
      "ND": 19.8,
      "SD": 19.8,
      "AK": 11.8,
      "AZ": 18.2,
      "CA": 11.0,
      "HI": 19.0,
      "ID": 18.2,
      "MT": 19.8,
      "NV": 10.2,
      "OR": 19.0,
      "WA": 16.6,
      "CO": 18.2,
      "KS": 20.6,
      "NM": 19.8,
      "OK": 19.0,
      "UT": 19.0,
      "WY": 21.4,
      "AL": 11.0,
      "FL": 11.8,
      "GA": 15.8,
      "DC": 12.6,
      "ME": 19.8,
      "MA": 18.2,
      "NH": 18.2,
      "RI": 19.8,
      "PR": 14.2,
      "CT": 19.0,
      "NY": 10.2,
      "VT": 21.4,
      "DE": 19.8,
      "NJ": 19.0,
      "GU": 23.0
    },
    "yearly_trend": {
      "1990": {
        "total": 1070,
        "wr": 13.8
      },
      "1991": {
        "total": 1104,
        "wr": 13.6
      },
      "1992": {
        "total": 1139,
        "wr": 13.4
      },
      "1993": {
        "total": 1173,
        "wr": 13.3
      },
      "1994": {
        "total": 1208,
        "wr": 13.2
      },
      "1995": {
        "total": 1242,
        "wr": 13.2
      },
      "1996": {
        "total": 1277,
        "wr": 13.2
      },
      "1997": {
        "total": 1311,
        "wr": 13.3
      },
      "1998": {
        "total": 1346,
        "wr": 13.4
      },
      "1999": {
        "total": 1380,
        "wr": 13.6
      },
      "2000": {
        "total": 1415,
        "wr": 13.8
      },
      "2001": {
        "total": 1449,
        "wr": 14.1
      },
      "2002": {
        "total": 1484,
        "wr": 14.4
      },
      "2003": {
        "total": 1518,
        "wr": 14.7
      },
      "2004": {
        "total": 1553,
        "wr": 15.1
      },
      "2005": {
        "total": 1587,
        "wr": 15.5
      },
      "2006": {
        "total": 1622,
        "wr": 16.0
      },
      "2007": {
        "total": 1656,
        "wr": 16.4
      },
      "2008": {
        "total": 1691,
        "wr": 16.9
      },
      "2009": {
        "total": 1725,
        "wr": 17.4
      },
      "2010": {
        "total": 1760,
        "wr": 17.9
      },
      "2011": {
        "total": 1794,
        "wr": 18.4
      },
      "2012": {
        "total": 1829,
        "wr": 18.9
      },
      "2013": {
        "total": 1863,
        "wr": 19.4
      },
      "2014": {
        "total": 1898,
        "wr": 19.9
      },
      "2015": {
        "total": 1932,
        "wr": 20.3
      },
      "2016": {
        "total": 1967,
        "wr": 20.8
      },
      "2017": {
        "total": 2001,
        "wr": 21.2
      },
      "2018": {
        "total": 2036,
        "wr": 21.6
      },
      "2019": {
        "total": 2070,
        "wr": 21.9
      },
      "2020": {
        "total": 2105,
        "wr": 22.2
      },
      "2021": {
        "total": 2140,
        "wr": 22.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 7,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 9,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 14,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "463": {
    "nos_code": "463",
    "label": "Habeas Corpus - Alien Detainee",
    "category": "gov",
    "sub": "alien detainee habeas",
    "total": 8200,
    "mo": 10,
    "wr": 22.4,
    "sp": 62.1,
    "sol": "Various federal",
    "af": "Court appointed / pro bono",
    "rng": {
      "lo": 0,
      "md": 0,
      "hi": 35
    },
    "rp": 12.4,
    "ps": {
      "wr": 5,
      "total": 5092
    },
    "rr": {
      "wr": 24.4,
      "total": 3108
    },
    "cw": 27.4,
    "ends": [
      {
        "l": "Settlement",
        "p": 62.1,
        "c": "#0D9488",
        "n": 5092
      },
      {
        "l": "Dismissed",
        "p": 17.1,
        "c": "#94A3B8",
        "n": 1398
      },
      {
        "l": "Other",
        "p": 9.5,
        "c": "#475569",
        "n": 777
      },
      {
        "l": "Summary Judgment",
        "p": 7.6,
        "c": "#D97706",
        "n": 621
      },
      {
        "l": "Default Judgment",
        "p": 2.7,
        "c": "#DB2777",
        "n": 217
      },
      {
        "l": "Trial",
        "p": 0.8,
        "c": "#7C3AED",
        "n": 62
      },
      {
        "l": "Consent",
        "p": 0.4,
        "c": "#2563EB",
        "n": 31
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.3,
      "trial_loss": 0.6,
      "dismiss": 52.3,
      "fav_set": 24.1,
      "set_mo": 9,
      "trial_med": "N/A"
    },
    "circuit_rates": {
      "1": 23.4,
      "2": 21.9,
      "3": 23.9,
      "4": 22.4,
      "5": 20.4,
      "6": 22.9,
      "7": 23.4,
      "8": 22.4,
      "9": 20.9,
      "10": 22.9,
      "11": 21.4,
      "dc": 19.9
    },
    "state_rates": {
      "PA": 27.2,
      "MI": 25.6,
      "VI": 12.8,
      "MD": 20.0,
      "NC": 24.0,
      "TX": 16.0,
      "SC": 24.8,
      "VA": 20.8,
      "WV": 19.2,
      "LA": 18.4,
      "KY": 20.8,
      "MS": 17.6,
      "OH": 21.6,
      "TN": 20.8,
      "IL": 24.0,
      "IN": 24.8,
      "WI": 23.2,
      "AR": 23.2,
      "IA": 24.0,
      "MN": 23.2,
      "MO": 21.6,
      "NE": 24.8,
      "ND": 24.0,
      "SD": 24.0,
      "AK": 16.0,
      "AZ": 22.4,
      "CA": 15.2,
      "HI": 23.2,
      "ID": 22.4,
      "MT": 24.0,
      "NV": 14.4,
      "OR": 23.2,
      "WA": 20.8,
      "CO": 22.4,
      "KS": 24.8,
      "NM": 24.0,
      "OK": 23.2,
      "UT": 23.2,
      "WY": 25.6,
      "AL": 15.2,
      "FL": 16.0,
      "GA": 20.0,
      "DC": 16.8,
      "ME": 24.0,
      "MA": 22.4,
      "NH": 22.4,
      "RI": 24.0,
      "PR": 18.4,
      "CT": 23.2,
      "NY": 14.4,
      "VT": 25.6,
      "DE": 24.0,
      "NJ": 23.2,
      "GU": 27.2
    },
    "yearly_trend": {
      "1990": {
        "total": 205,
        "wr": 18.0
      },
      "1991": {
        "total": 211,
        "wr": 17.8
      },
      "1992": {
        "total": 218,
        "wr": 17.6
      },
      "1993": {
        "total": 224,
        "wr": 17.5
      },
      "1994": {
        "total": 231,
        "wr": 17.4
      },
      "1995": {
        "total": 238,
        "wr": 17.4
      },
      "1996": {
        "total": 244,
        "wr": 17.4
      },
      "1997": {
        "total": 251,
        "wr": 17.5
      },
      "1998": {
        "total": 257,
        "wr": 17.6
      },
      "1999": {
        "total": 264,
        "wr": 17.8
      },
      "2000": {
        "total": 271,
        "wr": 18.0
      },
      "2001": {
        "total": 277,
        "wr": 18.3
      },
      "2002": {
        "total": 284,
        "wr": 18.6
      },
      "2003": {
        "total": 290,
        "wr": 18.9
      },
      "2004": {
        "total": 297,
        "wr": 19.3
      },
      "2005": {
        "total": 304,
        "wr": 19.7
      },
      "2006": {
        "total": 310,
        "wr": 20.2
      },
      "2007": {
        "total": 317,
        "wr": 20.6
      },
      "2008": {
        "total": 324,
        "wr": 21.1
      },
      "2009": {
        "total": 330,
        "wr": 21.6
      },
      "2010": {
        "total": 337,
        "wr": 22.1
      },
      "2011": {
        "total": 343,
        "wr": 22.6
      },
      "2012": {
        "total": 350,
        "wr": 23.1
      },
      "2013": {
        "total": 357,
        "wr": 23.6
      },
      "2014": {
        "total": 363,
        "wr": 24.1
      },
      "2015": {
        "total": 370,
        "wr": 24.5
      },
      "2016": {
        "total": 376,
        "wr": 25.0
      },
      "2017": {
        "total": 383,
        "wr": 25.4
      },
      "2018": {
        "total": 390,
        "wr": 25.8
      },
      "2019": {
        "total": 396,
        "wr": 26.1
      },
      "2020": {
        "total": 403,
        "wr": 26.4
      },
      "2021": {
        "total": 410,
        "wr": 26.7
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "465": {
    "nos_code": "465",
    "label": "Other Immigration",
    "category": "gov",
    "sub": "other immigration matter",
    "total": 12600,
    "mo": 11,
    "wr": 26.3,
    "sp": 61.2,
    "sol": "Varies by INA",
    "af": "Hourly ($300-500/hr)",
    "rng": {
      "lo": 0,
      "md": 5,
      "hi": 60
    },
    "rp": 8.6,
    "ps": {
      "wr": 8.3,
      "total": 7711
    },
    "rr": {
      "wr": 28.3,
      "total": 4889
    },
    "cw": 31.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 61.2,
        "c": "#0D9488",
        "n": 7711
      },
      {
        "l": "Dismissed",
        "p": 17.5,
        "c": "#94A3B8",
        "n": 2200
      },
      {
        "l": "Other",
        "p": 9.7,
        "c": "#475569",
        "n": 1222
      },
      {
        "l": "Summary Judgment",
        "p": 7.8,
        "c": "#D97706",
        "n": 977
      },
      {
        "l": "Default Judgment",
        "p": 2.7,
        "c": "#DB2777",
        "n": 342
      },
      {
        "l": "Trial",
        "p": 0.8,
        "c": "#7C3AED",
        "n": 97
      },
      {
        "l": "Consent",
        "p": 0.4,
        "c": "#2563EB",
        "n": 48
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.5,
      "trial_loss": 0.9,
      "dismiss": 48.4,
      "fav_set": 28.3,
      "set_mo": 10,
      "trial_med": "$2"
    },
    "circuit_rates": {
      "1": 27.3,
      "2": 25.8,
      "3": 27.8,
      "4": 26.3,
      "5": 24.3,
      "6": 26.8,
      "7": 27.3,
      "8": 26.3,
      "9": 24.8,
      "10": 26.8,
      "11": 25.3,
      "dc": 23.8
    },
    "state_rates": {
      "PA": 31.1,
      "MI": 29.5,
      "VI": 16.7,
      "MD": 23.9,
      "NC": 27.9,
      "TX": 19.9,
      "SC": 28.7,
      "VA": 24.7,
      "WV": 23.1,
      "LA": 22.3,
      "KY": 24.7,
      "MS": 21.5,
      "OH": 25.5,
      "TN": 24.7,
      "IL": 27.9,
      "IN": 28.7,
      "WI": 27.1,
      "AR": 27.1,
      "IA": 27.9,
      "MN": 27.1,
      "MO": 25.5,
      "NE": 28.7,
      "ND": 27.9,
      "SD": 27.9,
      "AK": 19.9,
      "AZ": 26.3,
      "CA": 19.1,
      "HI": 27.1,
      "ID": 26.3,
      "MT": 27.9,
      "NV": 18.3,
      "OR": 27.1,
      "WA": 24.7,
      "CO": 26.3,
      "KS": 28.7,
      "NM": 27.9,
      "OK": 27.1,
      "UT": 27.1,
      "WY": 29.5,
      "AL": 19.1,
      "FL": 19.9,
      "GA": 23.9,
      "DC": 20.7,
      "ME": 27.9,
      "MA": 26.3,
      "NH": 26.3,
      "RI": 27.9,
      "PR": 22.3,
      "CT": 27.1,
      "NY": 18.3,
      "VT": 29.5,
      "DE": 27.9,
      "NJ": 27.1,
      "GU": 31.1
    },
    "yearly_trend": {
      "1990": {
        "total": 315,
        "wr": 21.9
      },
      "1991": {
        "total": 325,
        "wr": 21.7
      },
      "1992": {
        "total": 335,
        "wr": 21.5
      },
      "1993": {
        "total": 345,
        "wr": 21.4
      },
      "1994": {
        "total": 355,
        "wr": 21.3
      },
      "1995": {
        "total": 365,
        "wr": 21.3
      },
      "1996": {
        "total": 375,
        "wr": 21.3
      },
      "1997": {
        "total": 386,
        "wr": 21.4
      },
      "1998": {
        "total": 396,
        "wr": 21.5
      },
      "1999": {
        "total": 406,
        "wr": 21.7
      },
      "2000": {
        "total": 416,
        "wr": 21.9
      },
      "2001": {
        "total": 426,
        "wr": 22.2
      },
      "2002": {
        "total": 436,
        "wr": 22.5
      },
      "2003": {
        "total": 447,
        "wr": 22.8
      },
      "2004": {
        "total": 457,
        "wr": 23.2
      },
      "2005": {
        "total": 467,
        "wr": 23.6
      },
      "2006": {
        "total": 477,
        "wr": 24.1
      },
      "2007": {
        "total": 487,
        "wr": 24.5
      },
      "2008": {
        "total": 497,
        "wr": 25.0
      },
      "2009": {
        "total": 508,
        "wr": 25.5
      },
      "2010": {
        "total": 518,
        "wr": 26.0
      },
      "2011": {
        "total": 528,
        "wr": 26.5
      },
      "2012": {
        "total": 538,
        "wr": 27.0
      },
      "2013": {
        "total": 548,
        "wr": 27.5
      },
      "2014": {
        "total": 558,
        "wr": 28.0
      },
      "2015": {
        "total": 569,
        "wr": 28.4
      },
      "2016": {
        "total": 579,
        "wr": 28.9
      },
      "2017": {
        "total": 589,
        "wr": 29.3
      },
      "2018": {
        "total": 599,
        "wr": 29.7
      },
      "2019": {
        "total": 609,
        "wr": 30.0
      },
      "2020": {
        "total": 619,
        "wr": 30.3
      },
      "2021": {
        "total": 630,
        "wr": 30.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "470": {
    "nos_code": "470",
    "label": "RICO",
    "category": "money",
    "sub": "RICO violation",
    "total": 5800,
    "mo": 18,
    "wr": 38.4,
    "sp": 48.1,
    "sol": "4 years statute",
    "af": "Contingency or hourly ($350-600/hr)",
    "rng": {
      "lo": 140,
      "md": 620,
      "hi": 3600
    },
    "rp": 2.4,
    "ps": {
      "wr": 20.4,
      "total": 2789
    },
    "rr": {
      "wr": 40.4,
      "total": 3011
    },
    "cw": 43.4,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.1,
        "c": "#0D9488",
        "n": 2789
      },
      {
        "l": "Dismissed",
        "p": 23.4,
        "c": "#94A3B8",
        "n": 1354
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 752
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 602
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 210
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 60
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 30
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.8,
      "trial_loss": 2.2,
      "dismiss": 28.4,
      "fav_set": 42.3,
      "set_mo": 16,
      "trial_med": "$310"
    },
    "circuit_rates": {
      "1": 39.4,
      "2": 37.9,
      "3": 39.9,
      "4": 38.4,
      "5": 36.4,
      "6": 38.9,
      "7": 39.4,
      "8": 38.4,
      "9": 36.9,
      "10": 38.9,
      "11": 37.4,
      "dc": 35.9
    },
    "state_rates": {
      "PA": 43.2,
      "MI": 41.6,
      "VI": 28.8,
      "MD": 36.0,
      "NC": 40.0,
      "TX": 32.0,
      "SC": 40.8,
      "VA": 36.8,
      "WV": 35.2,
      "LA": 34.4,
      "KY": 36.8,
      "MS": 33.6,
      "OH": 37.6,
      "TN": 36.8,
      "IL": 40.0,
      "IN": 40.8,
      "WI": 39.2,
      "AR": 39.2,
      "IA": 40.0,
      "MN": 39.2,
      "MO": 37.6,
      "NE": 40.8,
      "ND": 40.0,
      "SD": 40.0,
      "AK": 32.0,
      "AZ": 38.4,
      "CA": 31.2,
      "HI": 39.2,
      "ID": 38.4,
      "MT": 40.0,
      "NV": 30.4,
      "OR": 39.2,
      "WA": 36.8,
      "CO": 38.4,
      "KS": 40.8,
      "NM": 40.0,
      "OK": 39.2,
      "UT": 39.2,
      "WY": 41.6,
      "AL": 31.2,
      "FL": 32.0,
      "GA": 36.0,
      "DC": 32.8,
      "ME": 40.0,
      "MA": 38.4,
      "NH": 38.4,
      "RI": 40.0,
      "PR": 34.4,
      "CT": 39.2,
      "NY": 30.4,
      "VT": 41.6,
      "DE": 40.0,
      "NJ": 39.2,
      "GU": 43.2
    },
    "yearly_trend": {
      "1990": {
        "total": 145,
        "wr": 34.0
      },
      "1991": {
        "total": 149,
        "wr": 33.8
      },
      "1992": {
        "total": 154,
        "wr": 33.6
      },
      "1993": {
        "total": 159,
        "wr": 33.5
      },
      "1994": {
        "total": 163,
        "wr": 33.4
      },
      "1995": {
        "total": 168,
        "wr": 33.4
      },
      "1996": {
        "total": 173,
        "wr": 33.4
      },
      "1997": {
        "total": 177,
        "wr": 33.5
      },
      "1998": {
        "total": 182,
        "wr": 33.6
      },
      "1999": {
        "total": 187,
        "wr": 33.8
      },
      "2000": {
        "total": 191,
        "wr": 34.0
      },
      "2001": {
        "total": 196,
        "wr": 34.3
      },
      "2002": {
        "total": 201,
        "wr": 34.6
      },
      "2003": {
        "total": 205,
        "wr": 34.9
      },
      "2004": {
        "total": 210,
        "wr": 35.3
      },
      "2005": {
        "total": 215,
        "wr": 35.7
      },
      "2006": {
        "total": 219,
        "wr": 36.2
      },
      "2007": {
        "total": 224,
        "wr": 36.6
      },
      "2008": {
        "total": 229,
        "wr": 37.1
      },
      "2009": {
        "total": 233,
        "wr": 37.6
      },
      "2010": {
        "total": 238,
        "wr": 38.1
      },
      "2011": {
        "total": 243,
        "wr": 38.6
      },
      "2012": {
        "total": 247,
        "wr": 39.1
      },
      "2013": {
        "total": 252,
        "wr": 39.6
      },
      "2014": {
        "total": 257,
        "wr": 40.1
      },
      "2015": {
        "total": 261,
        "wr": 40.5
      },
      "2016": {
        "total": 266,
        "wr": 41.0
      },
      "2017": {
        "total": 271,
        "wr": 41.4
      },
      "2018": {
        "total": 275,
        "wr": 41.8
      },
      "2019": {
        "total": 280,
        "wr": 42.1
      },
      "2020": {
        "total": 285,
        "wr": 42.4
      },
      "2021": {
        "total": 290,
        "wr": 42.7
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 6,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 9,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 12,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 18,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "480": {
    "nos_code": "480",
    "label": "Consumer Credit",
    "category": "consumer",
    "sub": "consumer credit dispute",
    "total": 35800,
    "mo": 8,
    "wr": 42.1,
    "sp": 58.4,
    "sol": "3-6 years varies",
    "af": "Contingency (33%) + statutory fees",
    "rng": {
      "lo": 8,
      "md": 42,
      "hi": 280
    },
    "rp": 5.2,
    "ps": {
      "wr": 24.1,
      "total": 20907
    },
    "rr": {
      "wr": 44.1,
      "total": 14893
    },
    "cw": 47.1,
    "ends": [
      {
        "l": "Settlement",
        "p": 58.4,
        "c": "#0D9488",
        "n": 20907
      },
      {
        "l": "Dismissed",
        "p": 18.7,
        "c": "#94A3B8",
        "n": 6701
      },
      {
        "l": "Other",
        "p": 10.4,
        "c": "#475569",
        "n": 3723
      },
      {
        "l": "Summary Judgment",
        "p": 8.3,
        "c": "#D97706",
        "n": 2978
      },
      {
        "l": "Default Judgment",
        "p": 2.9,
        "c": "#DB2777",
        "n": 1042
      },
      {
        "l": "Trial",
        "p": 0.8,
        "c": "#7C3AED",
        "n": 297
      },
      {
        "l": "Consent",
        "p": 0.4,
        "c": "#2563EB",
        "n": 148
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.8,
      "trial_loss": 1.2,
      "dismiss": 31.6,
      "fav_set": 51.3,
      "set_mo": 8,
      "trial_med": "$21"
    },
    "circuit_rates": {
      "1": 43.1,
      "2": 41.6,
      "3": 43.6,
      "4": 42.1,
      "5": 40.1,
      "6": 42.6,
      "7": 43.1,
      "8": 42.1,
      "9": 40.6,
      "10": 42.6,
      "11": 41.1,
      "dc": 39.6
    },
    "state_rates": {
      "PA": 46.9,
      "MI": 45.3,
      "VI": 32.5,
      "MD": 39.7,
      "NC": 43.7,
      "TX": 35.7,
      "SC": 44.5,
      "VA": 40.5,
      "WV": 38.9,
      "LA": 38.1,
      "KY": 40.5,
      "MS": 37.3,
      "OH": 41.3,
      "TN": 40.5,
      "IL": 43.7,
      "IN": 44.5,
      "WI": 42.9,
      "AR": 42.9,
      "IA": 43.7,
      "MN": 42.9,
      "MO": 41.3,
      "NE": 44.5,
      "ND": 43.7,
      "SD": 43.7,
      "AK": 35.7,
      "AZ": 42.1,
      "CA": 34.9,
      "HI": 42.9,
      "ID": 42.1,
      "MT": 43.7,
      "NV": 34.1,
      "OR": 42.9,
      "WA": 40.5,
      "CO": 42.1,
      "KS": 44.5,
      "NM": 43.7,
      "OK": 42.9,
      "UT": 42.9,
      "WY": 45.3,
      "AL": 34.9,
      "FL": 35.7,
      "GA": 39.7,
      "DC": 36.5,
      "ME": 43.7,
      "MA": 42.1,
      "NH": 42.1,
      "RI": 43.7,
      "PR": 38.1,
      "CT": 42.9,
      "NY": 34.1,
      "VT": 45.3,
      "DE": 43.7,
      "NJ": 42.9,
      "GU": 46.9
    },
    "yearly_trend": {
      "1990": {
        "total": 895,
        "wr": 37.7
      },
      "1991": {
        "total": 923,
        "wr": 37.5
      },
      "1992": {
        "total": 952,
        "wr": 37.3
      },
      "1993": {
        "total": 981,
        "wr": 37.2
      },
      "1994": {
        "total": 1010,
        "wr": 37.1
      },
      "1995": {
        "total": 1039,
        "wr": 37.1
      },
      "1996": {
        "total": 1068,
        "wr": 37.1
      },
      "1997": {
        "total": 1097,
        "wr": 37.2
      },
      "1998": {
        "total": 1125,
        "wr": 37.3
      },
      "1999": {
        "total": 1154,
        "wr": 37.5
      },
      "2000": {
        "total": 1183,
        "wr": 37.7
      },
      "2001": {
        "total": 1212,
        "wr": 38.0
      },
      "2002": {
        "total": 1241,
        "wr": 38.3
      },
      "2003": {
        "total": 1270,
        "wr": 38.6
      },
      "2004": {
        "total": 1299,
        "wr": 39.0
      },
      "2005": {
        "total": 1328,
        "wr": 39.4
      },
      "2006": {
        "total": 1356,
        "wr": 39.9
      },
      "2007": {
        "total": 1385,
        "wr": 40.3
      },
      "2008": {
        "total": 1414,
        "wr": 40.8
      },
      "2009": {
        "total": 1443,
        "wr": 41.3
      },
      "2010": {
        "total": 1472,
        "wr": 41.8
      },
      "2011": {
        "total": 1501,
        "wr": 42.3
      },
      "2012": {
        "total": 1530,
        "wr": 42.8
      },
      "2013": {
        "total": 1559,
        "wr": 43.3
      },
      "2014": {
        "total": 1587,
        "wr": 43.8
      },
      "2015": {
        "total": 1616,
        "wr": 44.2
      },
      "2016": {
        "total": 1645,
        "wr": 44.7
      },
      "2017": {
        "total": 1674,
        "wr": 45.1
      },
      "2018": {
        "total": 1703,
        "wr": 45.5
      },
      "2019": {
        "total": 1732,
        "wr": 45.8
      },
      "2020": {
        "total": 1761,
        "wr": 46.1
      },
      "2021": {
        "total": 1790,
        "wr": 46.4
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 5,
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
  "485": {
    "nos_code": "485",
    "label": "Telephone Consumer",
    "category": "consumer",
    "sub": "TCPA violation",
    "total": 67400,
    "mo": 7,
    "wr": 48.3,
    "sp": 62.1,
    "sol": "4 years statute",
    "af": "$500-1500 per violation + attorney fees",
    "rng": {
      "lo": 5,
      "md": 18,
      "hi": 125
    },
    "rp": 8.6,
    "ps": {
      "wr": 30.299999999999997,
      "total": 41855
    },
    "rr": {
      "wr": 50.3,
      "total": 25545
    },
    "cw": 53.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 62.1,
        "c": "#0D9488",
        "n": 41855
      },
      {
        "l": "Dismissed",
        "p": 17.1,
        "c": "#94A3B8",
        "n": 11495
      },
      {
        "l": "Other",
        "p": 9.5,
        "c": "#475569",
        "n": 6386
      },
      {
        "l": "Summary Judgment",
        "p": 7.6,
        "c": "#D97706",
        "n": 5109
      },
      {
        "l": "Default Judgment",
        "p": 2.7,
        "c": "#DB2777",
        "n": 1788
      },
      {
        "l": "Trial",
        "p": 0.8,
        "c": "#7C3AED",
        "n": 510
      },
      {
        "l": "Consent",
        "p": 0.4,
        "c": "#2563EB",
        "n": 255
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.1,
      "trial_loss": 0.9,
      "dismiss": 28.4,
      "fav_set": 58.2,
      "set_mo": 7,
      "trial_med": "$9"
    },
    "circuit_rates": {
      "1": 49.3,
      "2": 47.8,
      "3": 49.8,
      "4": 48.3,
      "5": 46.3,
      "6": 48.8,
      "7": 49.3,
      "8": 48.3,
      "9": 46.8,
      "10": 48.8,
      "11": 47.3,
      "dc": 45.8
    },
    "state_rates": {
      "PA": 53.1,
      "MI": 51.5,
      "VI": 38.7,
      "MD": 45.9,
      "NC": 49.9,
      "TX": 41.9,
      "SC": 50.7,
      "VA": 46.7,
      "WV": 45.1,
      "LA": 44.3,
      "KY": 46.7,
      "MS": 43.5,
      "OH": 47.5,
      "TN": 46.7,
      "IL": 49.9,
      "IN": 50.7,
      "WI": 49.1,
      "AR": 49.1,
      "IA": 49.9,
      "MN": 49.1,
      "MO": 47.5,
      "NE": 50.7,
      "ND": 49.9,
      "SD": 49.9,
      "AK": 41.9,
      "AZ": 48.3,
      "CA": 41.1,
      "HI": 49.1,
      "ID": 48.3,
      "MT": 49.9,
      "NV": 40.3,
      "OR": 49.1,
      "WA": 46.7,
      "CO": 48.3,
      "KS": 50.7,
      "NM": 49.9,
      "OK": 49.1,
      "UT": 49.1,
      "WY": 51.5,
      "AL": 41.1,
      "FL": 41.9,
      "GA": 45.9,
      "DC": 42.7,
      "ME": 49.9,
      "MA": 48.3,
      "NH": 48.3,
      "RI": 49.9,
      "PR": 44.3,
      "CT": 49.1,
      "NY": 40.3,
      "VT": 51.5,
      "DE": 49.9,
      "NJ": 49.1,
      "GU": 53.1
    },
    "yearly_trend": {
      "1990": {
        "total": 1685,
        "wr": 43.9
      },
      "1991": {
        "total": 1739,
        "wr": 43.7
      },
      "1992": {
        "total": 1793,
        "wr": 43.5
      },
      "1993": {
        "total": 1848,
        "wr": 43.4
      },
      "1994": {
        "total": 1902,
        "wr": 43.3
      },
      "1995": {
        "total": 1956,
        "wr": 43.3
      },
      "1996": {
        "total": 2011,
        "wr": 43.3
      },
      "1997": {
        "total": 2065,
        "wr": 43.4
      },
      "1998": {
        "total": 2119,
        "wr": 43.5
      },
      "1999": {
        "total": 2174,
        "wr": 43.7
      },
      "2000": {
        "total": 2228,
        "wr": 43.9
      },
      "2001": {
        "total": 2282,
        "wr": 44.2
      },
      "2002": {
        "total": 2337,
        "wr": 44.5
      },
      "2003": {
        "total": 2391,
        "wr": 44.8
      },
      "2004": {
        "total": 2445,
        "wr": 45.2
      },
      "2005": {
        "total": 2500,
        "wr": 45.6
      },
      "2006": {
        "total": 2554,
        "wr": 46.1
      },
      "2007": {
        "total": 2609,
        "wr": 46.5
      },
      "2008": {
        "total": 2663,
        "wr": 47.0
      },
      "2009": {
        "total": 2717,
        "wr": 47.5
      },
      "2010": {
        "total": 2772,
        "wr": 48.0
      },
      "2011": {
        "total": 2826,
        "wr": 48.5
      },
      "2012": {
        "total": 2880,
        "wr": 49.0
      },
      "2013": {
        "total": 2935,
        "wr": 49.5
      },
      "2014": {
        "total": 2989,
        "wr": 50.0
      },
      "2015": {
        "total": 3043,
        "wr": 50.4
      },
      "2016": {
        "total": 3098,
        "wr": 50.9
      },
      "2017": {
        "total": 3152,
        "wr": 51.3
      },
      "2018": {
        "total": 3206,
        "wr": 51.7
      },
      "2019": {
        "total": 3261,
        "wr": 52.0
      },
      "2020": {
        "total": 3315,
        "wr": 52.3
      },
      "2021": {
        "total": 3370,
        "wr": 52.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 7,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "490": {
    "nos_code": "490",
    "label": "Cable/Satellite TV",
    "category": "consumer",
    "sub": "cable/satellite dispute",
    "total": 2600,
    "mo": 8,
    "wr": 38.2,
    "sp": 52.1,
    "sol": "Varies",
    "af": "Small claims or hourly",
    "rng": {
      "lo": 8,
      "md": 35,
      "hi": 220
    },
    "rp": 1.8,
    "ps": {
      "wr": 20.200000000000003,
      "total": 1354
    },
    "rr": {
      "wr": 40.2,
      "total": 1246
    },
    "cw": 43.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 52.1,
        "c": "#0D9488",
        "n": 1354
      },
      {
        "l": "Dismissed",
        "p": 21.6,
        "c": "#94A3B8",
        "n": 560
      },
      {
        "l": "Other",
        "p": 12.0,
        "c": "#475569",
        "n": 311
      },
      {
        "l": "Summary Judgment",
        "p": 9.6,
        "c": "#D97706",
        "n": 249
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 87
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 24
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 12
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.2,
      "trial_loss": 1.1,
      "dismiss": 32.4,
      "fav_set": 44.2,
      "set_mo": 8,
      "trial_med": "$17"
    },
    "circuit_rates": {
      "1": 39.2,
      "2": 37.7,
      "3": 39.7,
      "4": 38.2,
      "5": 36.2,
      "6": 38.7,
      "7": 39.2,
      "8": 38.2,
      "9": 36.7,
      "10": 38.7,
      "11": 37.2,
      "dc": 35.7
    },
    "state_rates": {
      "PA": 43.0,
      "MI": 41.4,
      "VI": 28.6,
      "MD": 35.8,
      "NC": 39.8,
      "TX": 31.8,
      "SC": 40.6,
      "VA": 36.6,
      "WV": 35.0,
      "LA": 34.2,
      "KY": 36.6,
      "MS": 33.4,
      "OH": 37.4,
      "TN": 36.6,
      "IL": 39.8,
      "IN": 40.6,
      "WI": 39.0,
      "AR": 39.0,
      "IA": 39.8,
      "MN": 39.0,
      "MO": 37.4,
      "NE": 40.6,
      "ND": 39.8,
      "SD": 39.8,
      "AK": 31.8,
      "AZ": 38.2,
      "CA": 31.0,
      "HI": 39.0,
      "ID": 38.2,
      "MT": 39.8,
      "NV": 30.2,
      "OR": 39.0,
      "WA": 36.6,
      "CO": 38.2,
      "KS": 40.6,
      "NM": 39.8,
      "OK": 39.0,
      "UT": 39.0,
      "WY": 41.4,
      "AL": 31.0,
      "FL": 31.8,
      "GA": 35.8,
      "DC": 32.6,
      "ME": 39.8,
      "MA": 38.2,
      "NH": 38.2,
      "RI": 39.8,
      "PR": 34.2,
      "CT": 39.0,
      "NY": 30.2,
      "VT": 41.4,
      "DE": 39.8,
      "NJ": 39.0,
      "GU": 43.0
    },
    "yearly_trend": {
      "1990": {
        "total": 65,
        "wr": 33.8
      },
      "1991": {
        "total": 67,
        "wr": 33.6
      },
      "1992": {
        "total": 69,
        "wr": 33.4
      },
      "1993": {
        "total": 71,
        "wr": 33.3
      },
      "1994": {
        "total": 73,
        "wr": 33.2
      },
      "1995": {
        "total": 75,
        "wr": 33.2
      },
      "1996": {
        "total": 77,
        "wr": 33.2
      },
      "1997": {
        "total": 79,
        "wr": 33.3
      },
      "1998": {
        "total": 81,
        "wr": 33.4
      },
      "1999": {
        "total": 83,
        "wr": 33.6
      },
      "2000": {
        "total": 85,
        "wr": 33.8
      },
      "2001": {
        "total": 88,
        "wr": 34.1
      },
      "2002": {
        "total": 90,
        "wr": 34.4
      },
      "2003": {
        "total": 92,
        "wr": 34.7
      },
      "2004": {
        "total": 94,
        "wr": 35.1
      },
      "2005": {
        "total": 96,
        "wr": 35.5
      },
      "2006": {
        "total": 98,
        "wr": 36.0
      },
      "2007": {
        "total": 100,
        "wr": 36.4
      },
      "2008": {
        "total": 102,
        "wr": 36.9
      },
      "2009": {
        "total": 104,
        "wr": 37.4
      },
      "2010": {
        "total": 106,
        "wr": 37.9
      },
      "2011": {
        "total": 109,
        "wr": 38.4
      },
      "2012": {
        "total": 111,
        "wr": 38.9
      },
      "2013": {
        "total": 113,
        "wr": 39.4
      },
      "2014": {
        "total": 115,
        "wr": 39.9
      },
      "2015": {
        "total": 117,
        "wr": 40.3
      },
      "2016": {
        "total": 119,
        "wr": 40.8
      },
      "2017": {
        "total": 121,
        "wr": 41.2
      },
      "2018": {
        "total": 123,
        "wr": 41.6
      },
      "2019": {
        "total": 125,
        "wr": 41.9
      },
      "2020": {
        "total": 127,
        "wr": 42.2
      },
      "2021": {
        "total": 130,
        "wr": 42.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 5,
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
  "510": {
    "nos_code": "510",
    "label": "Motions to Vacate",
    "category": "gov",
    "sub": "habeas corpus petition",
    "total": 28400,
    "mo": 8,
    "wr": 8.2,
    "sp": 35.1,
    "sol": "1 year AEDPA",
    "af": "Pro bono / court appointed",
    "rng": {
      "lo": 0,
      "md": 0,
      "hi": 15
    },
    "rp": 12.8,
    "ps": {
      "wr": 5,
      "total": 9968
    },
    "rr": {
      "wr": 10.2,
      "total": 18432
    },
    "cw": 13.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 35.1,
        "c": "#0D9488",
        "n": 9968
      },
      {
        "l": "Dismissed",
        "p": 29.2,
        "c": "#94A3B8",
        "n": 8294
      },
      {
        "l": "Other",
        "p": 16.2,
        "c": "#475569",
        "n": 4608
      },
      {
        "l": "Summary Judgment",
        "p": 13.0,
        "c": "#D97706",
        "n": 3686
      },
      {
        "l": "Default Judgment",
        "p": 4.5,
        "c": "#DB2777",
        "n": 1290
      },
      {
        "l": "Trial",
        "p": 1.3,
        "c": "#7C3AED",
        "n": 368
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 184
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.1,
      "trial_loss": 0.3,
      "dismiss": 58.2,
      "fav_set": 9.1,
      "set_mo": 6,
      "trial_med": "N/A"
    },
    "circuit_rates": {
      "1": 9.2,
      "2": 7.7,
      "3": 9.7,
      "4": 8.2,
      "5": 6.2,
      "6": 8.7,
      "7": 9.2,
      "8": 8.2,
      "9": 6.7,
      "10": 8.7,
      "11": 7.2,
      "dc": 5.7
    },
    "state_rates": {
      "PA": 13.0,
      "MI": 11.4,
      "VI": 5,
      "MD": 5.8,
      "NC": 9.8,
      "TX": 5,
      "SC": 10.6,
      "VA": 6.6,
      "WV": 5,
      "LA": 5,
      "KY": 6.6,
      "MS": 5,
      "OH": 7.4,
      "TN": 6.6,
      "IL": 9.8,
      "IN": 10.6,
      "WI": 9.0,
      "AR": 9.0,
      "IA": 9.8,
      "MN": 9.0,
      "MO": 7.4,
      "NE": 10.6,
      "ND": 9.8,
      "SD": 9.8,
      "AK": 5,
      "AZ": 8.2,
      "CA": 5,
      "HI": 9.0,
      "ID": 8.2,
      "MT": 9.8,
      "NV": 5,
      "OR": 9.0,
      "WA": 6.6,
      "CO": 8.2,
      "KS": 10.6,
      "NM": 9.8,
      "OK": 9.0,
      "UT": 9.0,
      "WY": 11.4,
      "AL": 5,
      "FL": 5,
      "GA": 5.8,
      "DC": 5,
      "ME": 9.8,
      "MA": 8.2,
      "NH": 8.2,
      "RI": 9.8,
      "PR": 5,
      "CT": 9.0,
      "NY": 5,
      "VT": 11.4,
      "DE": 9.8,
      "NJ": 9.0,
      "GU": 13.0
    },
    "yearly_trend": {
      "1990": {
        "total": 710,
        "wr": 5
      },
      "1991": {
        "total": 732,
        "wr": 5
      },
      "1992": {
        "total": 755,
        "wr": 5
      },
      "1993": {
        "total": 778,
        "wr": 5
      },
      "1994": {
        "total": 801,
        "wr": 5
      },
      "1995": {
        "total": 824,
        "wr": 5
      },
      "1996": {
        "total": 847,
        "wr": 5
      },
      "1997": {
        "total": 870,
        "wr": 5
      },
      "1998": {
        "total": 893,
        "wr": 5
      },
      "1999": {
        "total": 916,
        "wr": 5
      },
      "2000": {
        "total": 939,
        "wr": 5
      },
      "2001": {
        "total": 961,
        "wr": 5
      },
      "2002": {
        "total": 984,
        "wr": 5
      },
      "2003": {
        "total": 1007,
        "wr": 5
      },
      "2004": {
        "total": 1030,
        "wr": 5.1
      },
      "2005": {
        "total": 1053,
        "wr": 5.5
      },
      "2006": {
        "total": 1076,
        "wr": 6.0
      },
      "2007": {
        "total": 1099,
        "wr": 6.4
      },
      "2008": {
        "total": 1122,
        "wr": 6.9
      },
      "2009": {
        "total": 1145,
        "wr": 7.4
      },
      "2010": {
        "total": 1168,
        "wr": 7.9
      },
      "2011": {
        "total": 1190,
        "wr": 8.4
      },
      "2012": {
        "total": 1213,
        "wr": 8.9
      },
      "2013": {
        "total": 1236,
        "wr": 9.4
      },
      "2014": {
        "total": 1259,
        "wr": 9.9
      },
      "2015": {
        "total": 1282,
        "wr": 10.3
      },
      "2016": {
        "total": 1305,
        "wr": 10.8
      },
      "2017": {
        "total": 1328,
        "wr": 11.2
      },
      "2018": {
        "total": 1351,
        "wr": 11.6
      },
      "2019": {
        "total": 1374,
        "wr": 11.9
      },
      "2020": {
        "total": 1397,
        "wr": 12.2
      },
      "2021": {
        "total": 1420,
        "wr": 12.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 5,
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
  "530": {
    "nos_code": "530",
    "label": "Habeas Corpus - General",
    "category": "gov",
    "sub": "habeas corpus general",
    "total": 54200,
    "mo": 9,
    "wr": 12.4,
    "sp": 42.3,
    "sol": "1 year AEDPA",
    "af": "Pro bono / court appointed",
    "rng": {
      "lo": 0,
      "md": 0,
      "hi": 25
    },
    "rp": 18.6,
    "ps": {
      "wr": 5,
      "total": 22926
    },
    "rr": {
      "wr": 14.4,
      "total": 31274
    },
    "cw": 17.4,
    "ends": [
      {
        "l": "Settlement",
        "p": 42.3,
        "c": "#0D9488",
        "n": 22926
      },
      {
        "l": "Dismissed",
        "p": 26.0,
        "c": "#94A3B8",
        "n": 14073
      },
      {
        "l": "Other",
        "p": 14.4,
        "c": "#475569",
        "n": 7818
      },
      {
        "l": "Summary Judgment",
        "p": 11.5,
        "c": "#D97706",
        "n": 6254
      },
      {
        "l": "Default Judgment",
        "p": 4.0,
        "c": "#DB2777",
        "n": 2189
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 625
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 312
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.2,
      "trial_loss": 0.4,
      "dismiss": 62.1,
      "fav_set": 11.8,
      "set_mo": 7,
      "trial_med": "N/A"
    },
    "circuit_rates": {
      "1": 13.4,
      "2": 11.9,
      "3": 13.9,
      "4": 12.4,
      "5": 10.4,
      "6": 12.9,
      "7": 13.4,
      "8": 12.4,
      "9": 10.9,
      "10": 12.9,
      "11": 11.4,
      "dc": 9.9
    },
    "state_rates": {
      "PA": 17.2,
      "MI": 15.6,
      "VI": 5,
      "MD": 10.0,
      "NC": 14.0,
      "TX": 6.0,
      "SC": 14.8,
      "VA": 10.8,
      "WV": 9.2,
      "LA": 8.4,
      "KY": 10.8,
      "MS": 7.6,
      "OH": 11.6,
      "TN": 10.8,
      "IL": 14.0,
      "IN": 14.8,
      "WI": 13.2,
      "AR": 13.2,
      "IA": 14.0,
      "MN": 13.2,
      "MO": 11.6,
      "NE": 14.8,
      "ND": 14.0,
      "SD": 14.0,
      "AK": 6.0,
      "AZ": 12.4,
      "CA": 5.2,
      "HI": 13.2,
      "ID": 12.4,
      "MT": 14.0,
      "NV": 5,
      "OR": 13.2,
      "WA": 10.8,
      "CO": 12.4,
      "KS": 14.8,
      "NM": 14.0,
      "OK": 13.2,
      "UT": 13.2,
      "WY": 15.6,
      "AL": 5.2,
      "FL": 6.0,
      "GA": 10.0,
      "DC": 6.8,
      "ME": 14.0,
      "MA": 12.4,
      "NH": 12.4,
      "RI": 14.0,
      "PR": 8.4,
      "CT": 13.2,
      "NY": 5,
      "VT": 15.6,
      "DE": 14.0,
      "NJ": 13.2,
      "GU": 17.2
    },
    "yearly_trend": {
      "1990": {
        "total": 1355,
        "wr": 8.0
      },
      "1991": {
        "total": 1398,
        "wr": 7.8
      },
      "1992": {
        "total": 1442,
        "wr": 7.6
      },
      "1993": {
        "total": 1486,
        "wr": 7.5
      },
      "1994": {
        "total": 1529,
        "wr": 7.4
      },
      "1995": {
        "total": 1573,
        "wr": 7.4
      },
      "1996": {
        "total": 1617,
        "wr": 7.4
      },
      "1997": {
        "total": 1660,
        "wr": 7.5
      },
      "1998": {
        "total": 1704,
        "wr": 7.6
      },
      "1999": {
        "total": 1748,
        "wr": 7.8
      },
      "2000": {
        "total": 1792,
        "wr": 8.0
      },
      "2001": {
        "total": 1835,
        "wr": 8.3
      },
      "2002": {
        "total": 1879,
        "wr": 8.6
      },
      "2003": {
        "total": 1923,
        "wr": 8.9
      },
      "2004": {
        "total": 1966,
        "wr": 9.3
      },
      "2005": {
        "total": 2010,
        "wr": 9.7
      },
      "2006": {
        "total": 2054,
        "wr": 10.2
      },
      "2007": {
        "total": 2098,
        "wr": 10.6
      },
      "2008": {
        "total": 2141,
        "wr": 11.1
      },
      "2009": {
        "total": 2185,
        "wr": 11.6
      },
      "2010": {
        "total": 2229,
        "wr": 12.1
      },
      "2011": {
        "total": 2272,
        "wr": 12.6
      },
      "2012": {
        "total": 2316,
        "wr": 13.1
      },
      "2013": {
        "total": 2360,
        "wr": 13.6
      },
      "2014": {
        "total": 2404,
        "wr": 14.1
      },
      "2015": {
        "total": 2447,
        "wr": 14.5
      },
      "2016": {
        "total": 2491,
        "wr": 15.0
      },
      "2017": {
        "total": 2535,
        "wr": 15.4
      },
      "2018": {
        "total": 2578,
        "wr": 15.8
      },
      "2019": {
        "total": 2622,
        "wr": 16.1
      },
      "2020": {
        "total": 2666,
        "wr": 16.4
      },
      "2021": {
        "total": 2710,
        "wr": 16.7
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
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
        "mo": 9,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "535": {
    "nos_code": "535",
    "label": "Habeas Corpus - Death Penalty",
    "category": "gov",
    "sub": "death penalty habeas",
    "total": 8200,
    "mo": 18,
    "wr": 18.6,
    "sp": 54.2,
    "sol": "Various federal",
    "af": "Court appointed / pro bono",
    "rng": {
      "lo": 0,
      "md": 0,
      "hi": 50
    },
    "rp": 8.2,
    "ps": {
      "wr": 5,
      "total": 4444
    },
    "rr": {
      "wr": 20.6,
      "total": 3756
    },
    "cw": 23.6,
    "ends": [
      {
        "l": "Settlement",
        "p": 54.2,
        "c": "#0D9488",
        "n": 4444
      },
      {
        "l": "Dismissed",
        "p": 20.6,
        "c": "#94A3B8",
        "n": 1690
      },
      {
        "l": "Other",
        "p": 11.5,
        "c": "#475569",
        "n": 939
      },
      {
        "l": "Summary Judgment",
        "p": 9.2,
        "c": "#D97706",
        "n": 751
      },
      {
        "l": "Default Judgment",
        "p": 3.2,
        "c": "#DB2777",
        "n": 262
      },
      {
        "l": "Trial",
        "p": 0.9,
        "c": "#7C3AED",
        "n": 75
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 37
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.8,
      "trial_loss": 0.6,
      "dismiss": 48.3,
      "fav_set": 19.2,
      "set_mo": 16,
      "trial_med": "N/A"
    },
    "circuit_rates": {
      "1": 19.6,
      "2": 18.1,
      "3": 20.1,
      "4": 18.6,
      "5": 16.6,
      "6": 19.1,
      "7": 19.6,
      "8": 18.6,
      "9": 17.1,
      "10": 19.1,
      "11": 17.6,
      "dc": 16.1
    },
    "state_rates": {
      "PA": 23.4,
      "MI": 21.8,
      "VI": 9.0,
      "MD": 16.2,
      "NC": 20.2,
      "TX": 12.2,
      "SC": 21.0,
      "VA": 17.0,
      "WV": 15.4,
      "LA": 14.6,
      "KY": 17.0,
      "MS": 13.8,
      "OH": 17.8,
      "TN": 17.0,
      "IL": 20.2,
      "IN": 21.0,
      "WI": 19.4,
      "AR": 19.4,
      "IA": 20.2,
      "MN": 19.4,
      "MO": 17.8,
      "NE": 21.0,
      "ND": 20.2,
      "SD": 20.2,
      "AK": 12.2,
      "AZ": 18.6,
      "CA": 11.4,
      "HI": 19.4,
      "ID": 18.6,
      "MT": 20.2,
      "NV": 10.6,
      "OR": 19.4,
      "WA": 17.0,
      "CO": 18.6,
      "KS": 21.0,
      "NM": 20.2,
      "OK": 19.4,
      "UT": 19.4,
      "WY": 21.8,
      "AL": 11.4,
      "FL": 12.2,
      "GA": 16.2,
      "DC": 13.0,
      "ME": 20.2,
      "MA": 18.6,
      "NH": 18.6,
      "RI": 20.2,
      "PR": 14.6,
      "CT": 19.4,
      "NY": 10.6,
      "VT": 21.8,
      "DE": 20.2,
      "NJ": 19.4,
      "GU": 23.4
    },
    "yearly_trend": {
      "1990": {
        "total": 205,
        "wr": 14.2
      },
      "1991": {
        "total": 211,
        "wr": 14.0
      },
      "1992": {
        "total": 218,
        "wr": 13.8
      },
      "1993": {
        "total": 224,
        "wr": 13.7
      },
      "1994": {
        "total": 231,
        "wr": 13.6
      },
      "1995": {
        "total": 238,
        "wr": 13.6
      },
      "1996": {
        "total": 244,
        "wr": 13.6
      },
      "1997": {
        "total": 251,
        "wr": 13.7
      },
      "1998": {
        "total": 257,
        "wr": 13.8
      },
      "1999": {
        "total": 264,
        "wr": 14.0
      },
      "2000": {
        "total": 271,
        "wr": 14.2
      },
      "2001": {
        "total": 277,
        "wr": 14.5
      },
      "2002": {
        "total": 284,
        "wr": 14.8
      },
      "2003": {
        "total": 290,
        "wr": 15.1
      },
      "2004": {
        "total": 297,
        "wr": 15.5
      },
      "2005": {
        "total": 304,
        "wr": 15.9
      },
      "2006": {
        "total": 310,
        "wr": 16.4
      },
      "2007": {
        "total": 317,
        "wr": 16.8
      },
      "2008": {
        "total": 324,
        "wr": 17.3
      },
      "2009": {
        "total": 330,
        "wr": 17.8
      },
      "2010": {
        "total": 337,
        "wr": 18.3
      },
      "2011": {
        "total": 343,
        "wr": 18.8
      },
      "2012": {
        "total": 350,
        "wr": 19.3
      },
      "2013": {
        "total": 357,
        "wr": 19.8
      },
      "2014": {
        "total": 363,
        "wr": 20.3
      },
      "2015": {
        "total": 370,
        "wr": 20.7
      },
      "2016": {
        "total": 376,
        "wr": 21.2
      },
      "2017": {
        "total": 383,
        "wr": 21.6
      },
      "2018": {
        "total": 390,
        "wr": 22.0
      },
      "2019": {
        "total": 396,
        "wr": 22.3
      },
      "2020": {
        "total": 403,
        "wr": 22.6
      },
      "2021": {
        "total": 410,
        "wr": 22.9
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 6,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 9,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 12,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 18,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "540": {
    "nos_code": "540",
    "label": "Mandamus/Other",
    "category": "gov",
    "sub": "mandamus petition",
    "total": 12400,
    "mo": 7,
    "wr": 22.1,
    "sp": 46.2,
    "sol": "Varies",
    "af": "Pro bono / court appointed",
    "rng": {
      "lo": 0,
      "md": 5,
      "hi": 35
    },
    "rp": 6.2,
    "ps": {
      "wr": 5,
      "total": 5728
    },
    "rr": {
      "wr": 24.1,
      "total": 6672
    },
    "cw": 27.1,
    "ends": [
      {
        "l": "Settlement",
        "p": 46.2,
        "c": "#0D9488",
        "n": 5728
      },
      {
        "l": "Dismissed",
        "p": 24.2,
        "c": "#94A3B8",
        "n": 3002
      },
      {
        "l": "Other",
        "p": 13.5,
        "c": "#475569",
        "n": 1668
      },
      {
        "l": "Summary Judgment",
        "p": 10.8,
        "c": "#D97706",
        "n": 1334
      },
      {
        "l": "Default Judgment",
        "p": 3.8,
        "c": "#DB2777",
        "n": 467
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 133
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 66
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.3,
      "trial_loss": 0.5,
      "dismiss": 55.4,
      "fav_set": 23.8,
      "set_mo": 6,
      "trial_med": "$2"
    },
    "circuit_rates": {
      "1": 23.1,
      "2": 21.6,
      "3": 23.6,
      "4": 22.1,
      "5": 20.1,
      "6": 22.6,
      "7": 23.1,
      "8": 22.1,
      "9": 20.6,
      "10": 22.6,
      "11": 21.1,
      "dc": 19.6
    },
    "state_rates": {
      "PA": 26.9,
      "MI": 25.3,
      "VI": 12.5,
      "MD": 19.7,
      "NC": 23.7,
      "TX": 15.7,
      "SC": 24.5,
      "VA": 20.5,
      "WV": 18.9,
      "LA": 18.1,
      "KY": 20.5,
      "MS": 17.3,
      "OH": 21.3,
      "TN": 20.5,
      "IL": 23.7,
      "IN": 24.5,
      "WI": 22.9,
      "AR": 22.9,
      "IA": 23.7,
      "MN": 22.9,
      "MO": 21.3,
      "NE": 24.5,
      "ND": 23.7,
      "SD": 23.7,
      "AK": 15.7,
      "AZ": 22.1,
      "CA": 14.9,
      "HI": 22.9,
      "ID": 22.1,
      "MT": 23.7,
      "NV": 14.1,
      "OR": 22.9,
      "WA": 20.5,
      "CO": 22.1,
      "KS": 24.5,
      "NM": 23.7,
      "OK": 22.9,
      "UT": 22.9,
      "WY": 25.3,
      "AL": 14.9,
      "FL": 15.7,
      "GA": 19.7,
      "DC": 16.5,
      "ME": 23.7,
      "MA": 22.1,
      "NH": 22.1,
      "RI": 23.7,
      "PR": 18.1,
      "CT": 22.9,
      "NY": 14.1,
      "VT": 25.3,
      "DE": 23.7,
      "NJ": 22.9,
      "GU": 26.9
    },
    "yearly_trend": {
      "1990": {
        "total": 310,
        "wr": 17.7
      },
      "1991": {
        "total": 320,
        "wr": 17.5
      },
      "1992": {
        "total": 330,
        "wr": 17.3
      },
      "1993": {
        "total": 340,
        "wr": 17.2
      },
      "1994": {
        "total": 350,
        "wr": 17.1
      },
      "1995": {
        "total": 360,
        "wr": 17.1
      },
      "1996": {
        "total": 370,
        "wr": 17.1
      },
      "1997": {
        "total": 380,
        "wr": 17.2
      },
      "1998": {
        "total": 390,
        "wr": 17.3
      },
      "1999": {
        "total": 400,
        "wr": 17.5
      },
      "2000": {
        "total": 410,
        "wr": 17.7
      },
      "2001": {
        "total": 420,
        "wr": 18.0
      },
      "2002": {
        "total": 430,
        "wr": 18.3
      },
      "2003": {
        "total": 440,
        "wr": 18.6
      },
      "2004": {
        "total": 450,
        "wr": 19.0
      },
      "2005": {
        "total": 460,
        "wr": 19.4
      },
      "2006": {
        "total": 470,
        "wr": 19.9
      },
      "2007": {
        "total": 480,
        "wr": 20.3
      },
      "2008": {
        "total": 490,
        "wr": 20.8
      },
      "2009": {
        "total": 500,
        "wr": 21.3
      },
      "2010": {
        "total": 510,
        "wr": 21.8
      },
      "2011": {
        "total": 520,
        "wr": 22.3
      },
      "2012": {
        "total": 530,
        "wr": 22.8
      },
      "2013": {
        "total": 540,
        "wr": 23.3
      },
      "2014": {
        "total": 550,
        "wr": 23.8
      },
      "2015": {
        "total": 560,
        "wr": 24.2
      },
      "2016": {
        "total": 570,
        "wr": 24.7
      },
      "2017": {
        "total": 580,
        "wr": 25.1
      },
      "2018": {
        "total": 590,
        "wr": 25.5
      },
      "2019": {
        "total": 600,
        "wr": 25.8
      },
      "2020": {
        "total": 610,
        "wr": 26.1
      },
      "2021": {
        "total": 620,
        "wr": 26.4
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 7,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "550": {
    "nos_code": "550",
    "label": "Civil Rights",
    "category": "rights",
    "sub": "prison conditions",
    "total": 18600,
    "mo": 10,
    "wr": 26.3,
    "sp": 48.1,
    "sol": "2 years PLRA",
    "af": "Contingency + statutory fees (42 USC 1988)",
    "rng": {
      "lo": 8,
      "md": 35,
      "hi": 220
    },
    "rp": 5.8,
    "ps": {
      "wr": 8.3,
      "total": 8946
    },
    "rr": {
      "wr": 28.3,
      "total": 9654
    },
    "cw": 31.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.1,
        "c": "#0D9488",
        "n": 8946
      },
      {
        "l": "Dismissed",
        "p": 23.4,
        "c": "#94A3B8",
        "n": 4344
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 2413
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 1930
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 675
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 193
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 96
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.6,
      "trial_loss": 0.9,
      "dismiss": 45.2,
      "fav_set": 28.1,
      "set_mo": 9,
      "trial_med": "$17"
    },
    "circuit_rates": {
      "1": 27.3,
      "2": 25.8,
      "3": 27.8,
      "4": 26.3,
      "5": 24.3,
      "6": 26.8,
      "7": 27.3,
      "8": 26.3,
      "9": 24.8,
      "10": 26.8,
      "11": 25.3,
      "dc": 23.8
    },
    "state_rates": {
      "PA": 31.1,
      "MI": 29.5,
      "VI": 16.7,
      "MD": 23.9,
      "NC": 27.9,
      "TX": 19.9,
      "SC": 28.7,
      "VA": 24.7,
      "WV": 23.1,
      "LA": 22.3,
      "KY": 24.7,
      "MS": 21.5,
      "OH": 25.5,
      "TN": 24.7,
      "IL": 27.9,
      "IN": 28.7,
      "WI": 27.1,
      "AR": 27.1,
      "IA": 27.9,
      "MN": 27.1,
      "MO": 25.5,
      "NE": 28.7,
      "ND": 27.9,
      "SD": 27.9,
      "AK": 19.9,
      "AZ": 26.3,
      "CA": 19.1,
      "HI": 27.1,
      "ID": 26.3,
      "MT": 27.9,
      "NV": 18.3,
      "OR": 27.1,
      "WA": 24.7,
      "CO": 26.3,
      "KS": 28.7,
      "NM": 27.9,
      "OK": 27.1,
      "UT": 27.1,
      "WY": 29.5,
      "AL": 19.1,
      "FL": 19.9,
      "GA": 23.9,
      "DC": 20.7,
      "ME": 27.9,
      "MA": 26.3,
      "NH": 26.3,
      "RI": 27.9,
      "PR": 22.3,
      "CT": 27.1,
      "NY": 18.3,
      "VT": 29.5,
      "DE": 27.9,
      "NJ": 27.1,
      "GU": 31.1
    },
    "yearly_trend": {
      "1990": {
        "total": 465,
        "wr": 21.9
      },
      "1991": {
        "total": 480,
        "wr": 21.7
      },
      "1992": {
        "total": 495,
        "wr": 21.5
      },
      "1993": {
        "total": 510,
        "wr": 21.4
      },
      "1994": {
        "total": 525,
        "wr": 21.3
      },
      "1995": {
        "total": 540,
        "wr": 21.3
      },
      "1996": {
        "total": 555,
        "wr": 21.3
      },
      "1997": {
        "total": 570,
        "wr": 21.4
      },
      "1998": {
        "total": 585,
        "wr": 21.5
      },
      "1999": {
        "total": 600,
        "wr": 21.7
      },
      "2000": {
        "total": 615,
        "wr": 21.9
      },
      "2001": {
        "total": 630,
        "wr": 22.2
      },
      "2002": {
        "total": 645,
        "wr": 22.5
      },
      "2003": {
        "total": 660,
        "wr": 22.8
      },
      "2004": {
        "total": 675,
        "wr": 23.2
      },
      "2005": {
        "total": 690,
        "wr": 23.6
      },
      "2006": {
        "total": 705,
        "wr": 24.1
      },
      "2007": {
        "total": 720,
        "wr": 24.5
      },
      "2008": {
        "total": 735,
        "wr": 25.0
      },
      "2009": {
        "total": 750,
        "wr": 25.5
      },
      "2010": {
        "total": 765,
        "wr": 26.0
      },
      "2011": {
        "total": 779,
        "wr": 26.5
      },
      "2012": {
        "total": 795,
        "wr": 27.0
      },
      "2013": {
        "total": 810,
        "wr": 27.5
      },
      "2014": {
        "total": 825,
        "wr": 28.0
      },
      "2015": {
        "total": 840,
        "wr": 28.4
      },
      "2016": {
        "total": 855,
        "wr": 28.9
      },
      "2017": {
        "total": 870,
        "wr": 29.3
      },
      "2018": {
        "total": 885,
        "wr": 29.7
      },
      "2019": {
        "total": 900,
        "wr": 30.0
      },
      "2020": {
        "total": 915,
        "wr": 30.3
      },
      "2021": {
        "total": 930,
        "wr": 30.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "555": {
    "nos_code": "555",
    "label": "Prison Condition",
    "category": "rights",
    "sub": "prison conditions",
    "total": 21200,
    "mo": 11,
    "wr": 28.5,
    "sp": 49.3,
    "sol": "2 years PLRA",
    "af": "Contingency + statutory fees",
    "rng": {
      "lo": 12,
      "md": 48,
      "hi": 310
    },
    "rp": 6.4,
    "ps": {
      "wr": 10.5,
      "total": 10451
    },
    "rr": {
      "wr": 30.5,
      "total": 10749
    },
    "cw": 33.5,
    "ends": [
      {
        "l": "Settlement",
        "p": 49.3,
        "c": "#0D9488",
        "n": 10451
      },
      {
        "l": "Dismissed",
        "p": 22.8,
        "c": "#94A3B8",
        "n": 4837
      },
      {
        "l": "Other",
        "p": 12.7,
        "c": "#475569",
        "n": 2687
      },
      {
        "l": "Summary Judgment",
        "p": 10.1,
        "c": "#D97706",
        "n": 2149
      },
      {
        "l": "Default Judgment",
        "p": 3.5,
        "c": "#DB2777",
        "n": 752
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 214
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 107
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.7,
      "trial_loss": 1.1,
      "dismiss": 42.8,
      "fav_set": 30.2,
      "set_mo": 10,
      "trial_med": "$24"
    },
    "circuit_rates": {
      "1": 29.5,
      "2": 28.0,
      "3": 30.0,
      "4": 28.5,
      "5": 26.5,
      "6": 29.0,
      "7": 29.5,
      "8": 28.5,
      "9": 27.0,
      "10": 29.0,
      "11": 27.5,
      "dc": 26.0
    },
    "state_rates": {
      "PA": 33.3,
      "MI": 31.7,
      "VI": 18.9,
      "MD": 26.1,
      "NC": 30.1,
      "TX": 22.1,
      "SC": 30.9,
      "VA": 26.9,
      "WV": 25.3,
      "LA": 24.5,
      "KY": 26.9,
      "MS": 23.7,
      "OH": 27.7,
      "TN": 26.9,
      "IL": 30.1,
      "IN": 30.9,
      "WI": 29.3,
      "AR": 29.3,
      "IA": 30.1,
      "MN": 29.3,
      "MO": 27.7,
      "NE": 30.9,
      "ND": 30.1,
      "SD": 30.1,
      "AK": 22.1,
      "AZ": 28.5,
      "CA": 21.3,
      "HI": 29.3,
      "ID": 28.5,
      "MT": 30.1,
      "NV": 20.5,
      "OR": 29.3,
      "WA": 26.9,
      "CO": 28.5,
      "KS": 30.9,
      "NM": 30.1,
      "OK": 29.3,
      "UT": 29.3,
      "WY": 31.7,
      "AL": 21.3,
      "FL": 22.1,
      "GA": 26.1,
      "DC": 22.9,
      "ME": 30.1,
      "MA": 28.5,
      "NH": 28.5,
      "RI": 30.1,
      "PR": 24.5,
      "CT": 29.3,
      "NY": 20.5,
      "VT": 31.7,
      "DE": 30.1,
      "NJ": 29.3,
      "GU": 33.3
    },
    "yearly_trend": {
      "1990": {
        "total": 530,
        "wr": 24.1
      },
      "1991": {
        "total": 547,
        "wr": 23.9
      },
      "1992": {
        "total": 564,
        "wr": 23.7
      },
      "1993": {
        "total": 581,
        "wr": 23.6
      },
      "1994": {
        "total": 598,
        "wr": 23.5
      },
      "1995": {
        "total": 615,
        "wr": 23.5
      },
      "1996": {
        "total": 632,
        "wr": 23.5
      },
      "1997": {
        "total": 649,
        "wr": 23.6
      },
      "1998": {
        "total": 666,
        "wr": 23.7
      },
      "1999": {
        "total": 683,
        "wr": 23.9
      },
      "2000": {
        "total": 700,
        "wr": 24.1
      },
      "2001": {
        "total": 718,
        "wr": 24.4
      },
      "2002": {
        "total": 735,
        "wr": 24.7
      },
      "2003": {
        "total": 752,
        "wr": 25.0
      },
      "2004": {
        "total": 769,
        "wr": 25.4
      },
      "2005": {
        "total": 786,
        "wr": 25.8
      },
      "2006": {
        "total": 803,
        "wr": 26.3
      },
      "2007": {
        "total": 820,
        "wr": 26.7
      },
      "2008": {
        "total": 837,
        "wr": 27.2
      },
      "2009": {
        "total": 854,
        "wr": 27.7
      },
      "2010": {
        "total": 871,
        "wr": 28.2
      },
      "2011": {
        "total": 889,
        "wr": 28.7
      },
      "2012": {
        "total": 906,
        "wr": 29.2
      },
      "2013": {
        "total": 923,
        "wr": 29.7
      },
      "2014": {
        "total": 940,
        "wr": 30.2
      },
      "2015": {
        "total": 957,
        "wr": 30.6
      },
      "2016": {
        "total": 974,
        "wr": 31.1
      },
      "2017": {
        "total": 991,
        "wr": 31.5
      },
      "2018": {
        "total": 1008,
        "wr": 31.9
      },
      "2019": {
        "total": 1025,
        "wr": 32.2
      },
      "2020": {
        "total": 1042,
        "wr": 32.5
      },
      "2021": {
        "total": 1060,
        "wr": 32.8
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "720": {
    "nos_code": "720",
    "label": "Labor/Management Relations",
    "category": "work",
    "sub": "labor union dispute",
    "total": 5400,
    "mo": 11,
    "wr": 34.2,
    "sp": 48.1,
    "sol": "Varies, NLRA specifics",
    "af": "Hourly or contingency",
    "rng": {
      "lo": 28,
      "md": 125,
      "hi": 680
    },
    "rp": 2.1,
    "ps": {
      "wr": 16.200000000000003,
      "total": 2597
    },
    "rr": {
      "wr": 36.2,
      "total": 2803
    },
    "cw": 39.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.1,
        "c": "#0D9488",
        "n": 2597
      },
      {
        "l": "Dismissed",
        "p": 23.4,
        "c": "#94A3B8",
        "n": 1261
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 700
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 560
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 196
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 56
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 28
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.4,
      "trial_loss": 1.2,
      "dismiss": 29.8,
      "fav_set": 42.1,
      "set_mo": 10,
      "trial_med": "$62"
    },
    "circuit_rates": {
      "1": 35.2,
      "2": 33.7,
      "3": 35.7,
      "4": 34.2,
      "5": 32.2,
      "6": 34.7,
      "7": 35.2,
      "8": 34.2,
      "9": 32.7,
      "10": 34.7,
      "11": 33.2,
      "dc": 31.7
    },
    "state_rates": {
      "PA": 39.0,
      "MI": 37.4,
      "VI": 24.6,
      "MD": 31.8,
      "NC": 35.8,
      "TX": 27.8,
      "SC": 36.6,
      "VA": 32.6,
      "WV": 31.0,
      "LA": 30.2,
      "KY": 32.6,
      "MS": 29.4,
      "OH": 33.4,
      "TN": 32.6,
      "IL": 35.8,
      "IN": 36.6,
      "WI": 35.0,
      "AR": 35.0,
      "IA": 35.8,
      "MN": 35.0,
      "MO": 33.4,
      "NE": 36.6,
      "ND": 35.8,
      "SD": 35.8,
      "AK": 27.8,
      "AZ": 34.2,
      "CA": 27.0,
      "HI": 35.0,
      "ID": 34.2,
      "MT": 35.8,
      "NV": 26.2,
      "OR": 35.0,
      "WA": 32.6,
      "CO": 34.2,
      "KS": 36.6,
      "NM": 35.8,
      "OK": 35.0,
      "UT": 35.0,
      "WY": 37.4,
      "AL": 27.0,
      "FL": 27.8,
      "GA": 31.8,
      "DC": 28.6,
      "ME": 35.8,
      "MA": 34.2,
      "NH": 34.2,
      "RI": 35.8,
      "PR": 30.2,
      "CT": 35.0,
      "NY": 26.2,
      "VT": 37.4,
      "DE": 35.8,
      "NJ": 35.0,
      "GU": 39.0
    },
    "yearly_trend": {
      "1990": {
        "total": 135,
        "wr": 29.8
      },
      "1991": {
        "total": 139,
        "wr": 29.6
      },
      "1992": {
        "total": 143,
        "wr": 29.4
      },
      "1993": {
        "total": 148,
        "wr": 29.3
      },
      "1994": {
        "total": 152,
        "wr": 29.2
      },
      "1995": {
        "total": 156,
        "wr": 29.2
      },
      "1996": {
        "total": 161,
        "wr": 29.2
      },
      "1997": {
        "total": 165,
        "wr": 29.3
      },
      "1998": {
        "total": 169,
        "wr": 29.4
      },
      "1999": {
        "total": 174,
        "wr": 29.6
      },
      "2000": {
        "total": 178,
        "wr": 29.8
      },
      "2001": {
        "total": 182,
        "wr": 30.1
      },
      "2002": {
        "total": 187,
        "wr": 30.4
      },
      "2003": {
        "total": 191,
        "wr": 30.7
      },
      "2004": {
        "total": 195,
        "wr": 31.1
      },
      "2005": {
        "total": 200,
        "wr": 31.5
      },
      "2006": {
        "total": 204,
        "wr": 32.0
      },
      "2007": {
        "total": 209,
        "wr": 32.4
      },
      "2008": {
        "total": 213,
        "wr": 32.9
      },
      "2009": {
        "total": 217,
        "wr": 33.4
      },
      "2010": {
        "total": 222,
        "wr": 33.9
      },
      "2011": {
        "total": 226,
        "wr": 34.4
      },
      "2012": {
        "total": 230,
        "wr": 34.9
      },
      "2013": {
        "total": 235,
        "wr": 35.4
      },
      "2014": {
        "total": 239,
        "wr": 35.9
      },
      "2015": {
        "total": 243,
        "wr": 36.3
      },
      "2016": {
        "total": 248,
        "wr": 36.8
      },
      "2017": {
        "total": 252,
        "wr": 37.2
      },
      "2018": {
        "total": 256,
        "wr": 37.6
      },
      "2019": {
        "total": 261,
        "wr": 37.9
      },
      "2020": {
        "total": 265,
        "wr": 38.2
      },
      "2021": {
        "total": 270,
        "wr": 38.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "740": {
    "nos_code": "740",
    "label": "Railway Labor Act",
    "category": "work",
    "sub": "railway labor dispute",
    "total": 1600,
    "mo": 12,
    "wr": 31.8,
    "sp": 49.2,
    "sol": "120 days RLA procedure",
    "af": "Hourly ($300-500/hr)",
    "rng": {
      "lo": 18,
      "md": 85,
      "hi": 480
    },
    "rp": 0.9,
    "ps": {
      "wr": 13.8,
      "total": 787
    },
    "rr": {
      "wr": 33.8,
      "total": 813
    },
    "cw": 36.8,
    "ends": [
      {
        "l": "Settlement",
        "p": 49.2,
        "c": "#0D9488",
        "n": 787
      },
      {
        "l": "Dismissed",
        "p": 22.9,
        "c": "#94A3B8",
        "n": 365
      },
      {
        "l": "Other",
        "p": 12.7,
        "c": "#475569",
        "n": 203
      },
      {
        "l": "Summary Judgment",
        "p": 10.2,
        "c": "#D97706",
        "n": 162
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 56
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 16
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 8
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.1,
      "trial_loss": 0.9,
      "dismiss": 31.2,
      "fav_set": 39.4,
      "set_mo": 11,
      "trial_med": "$42"
    },
    "circuit_rates": {
      "1": 32.8,
      "2": 31.3,
      "3": 33.3,
      "4": 31.8,
      "5": 29.8,
      "6": 32.3,
      "7": 32.8,
      "8": 31.8,
      "9": 30.3,
      "10": 32.3,
      "11": 30.8,
      "dc": 29.3
    },
    "state_rates": {
      "PA": 36.6,
      "MI": 35.0,
      "VI": 22.2,
      "MD": 29.4,
      "NC": 33.4,
      "TX": 25.4,
      "SC": 34.2,
      "VA": 30.2,
      "WV": 28.6,
      "LA": 27.8,
      "KY": 30.2,
      "MS": 27.0,
      "OH": 31.0,
      "TN": 30.2,
      "IL": 33.4,
      "IN": 34.2,
      "WI": 32.6,
      "AR": 32.6,
      "IA": 33.4,
      "MN": 32.6,
      "MO": 31.0,
      "NE": 34.2,
      "ND": 33.4,
      "SD": 33.4,
      "AK": 25.4,
      "AZ": 31.8,
      "CA": 24.6,
      "HI": 32.6,
      "ID": 31.8,
      "MT": 33.4,
      "NV": 23.8,
      "OR": 32.6,
      "WA": 30.2,
      "CO": 31.8,
      "KS": 34.2,
      "NM": 33.4,
      "OK": 32.6,
      "UT": 32.6,
      "WY": 35.0,
      "AL": 24.6,
      "FL": 25.4,
      "GA": 29.4,
      "DC": 26.2,
      "ME": 33.4,
      "MA": 31.8,
      "NH": 31.8,
      "RI": 33.4,
      "PR": 27.8,
      "CT": 32.6,
      "NY": 23.8,
      "VT": 35.0,
      "DE": 33.4,
      "NJ": 32.6,
      "GU": 36.6
    },
    "yearly_trend": {
      "1990": {
        "total": 40,
        "wr": 27.4
      },
      "1991": {
        "total": 41,
        "wr": 27.2
      },
      "1992": {
        "total": 42,
        "wr": 27.0
      },
      "1993": {
        "total": 43,
        "wr": 26.9
      },
      "1994": {
        "total": 45,
        "wr": 26.8
      },
      "1995": {
        "total": 46,
        "wr": 26.8
      },
      "1996": {
        "total": 47,
        "wr": 26.8
      },
      "1997": {
        "total": 49,
        "wr": 26.9
      },
      "1998": {
        "total": 50,
        "wr": 27.0
      },
      "1999": {
        "total": 51,
        "wr": 27.2
      },
      "2000": {
        "total": 52,
        "wr": 27.4
      },
      "2001": {
        "total": 54,
        "wr": 27.7
      },
      "2002": {
        "total": 55,
        "wr": 28.0
      },
      "2003": {
        "total": 56,
        "wr": 28.3
      },
      "2004": {
        "total": 58,
        "wr": 28.7
      },
      "2005": {
        "total": 59,
        "wr": 29.1
      },
      "2006": {
        "total": 60,
        "wr": 29.6
      },
      "2007": {
        "total": 61,
        "wr": 30.0
      },
      "2008": {
        "total": 63,
        "wr": 30.5
      },
      "2009": {
        "total": 64,
        "wr": 31.0
      },
      "2010": {
        "total": 65,
        "wr": 31.5
      },
      "2011": {
        "total": 67,
        "wr": 32.0
      },
      "2012": {
        "total": 68,
        "wr": 32.5
      },
      "2013": {
        "total": 69,
        "wr": 33.0
      },
      "2014": {
        "total": 70,
        "wr": 33.5
      },
      "2015": {
        "total": 72,
        "wr": 33.9
      },
      "2016": {
        "total": 73,
        "wr": 34.4
      },
      "2017": {
        "total": 74,
        "wr": 34.8
      },
      "2018": {
        "total": 76,
        "wr": 35.2
      },
      "2019": {
        "total": 77,
        "wr": 35.5
      },
      "2020": {
        "total": 78,
        "wr": 35.8
      },
      "2021": {
        "total": 80,
        "wr": 36.1
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
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
        "mo": 12,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "751": {
    "nos_code": "751",
    "label": "Family Medical Leave Act",
    "category": "work",
    "sub": "FMLA violation",
    "total": 8900,
    "mo": 12,
    "wr": 35.4,
    "sp": 51.8,
    "sol": "2-3 years",
    "af": "Contingency (33-40%), fee-shifting",
    "rng": {
      "lo": 22,
      "md": 92,
      "hi": 540
    },
    "rp": 3.2,
    "ps": {
      "wr": 17.4,
      "total": 4610
    },
    "rr": {
      "wr": 37.4,
      "total": 4290
    },
    "cw": 40.4,
    "ends": [
      {
        "l": "Settlement",
        "p": 51.8,
        "c": "#0D9488",
        "n": 4610
      },
      {
        "l": "Dismissed",
        "p": 21.7,
        "c": "#94A3B8",
        "n": 1930
      },
      {
        "l": "Other",
        "p": 12.1,
        "c": "#475569",
        "n": 1072
      },
      {
        "l": "Summary Judgment",
        "p": 9.6,
        "c": "#D97706",
        "n": 858
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 300
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 85
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 42
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.2,
      "trial_loss": 0.8,
      "dismiss": 28.4,
      "fav_set": 48.2,
      "set_mo": 10,
      "trial_med": "$46"
    },
    "circuit_rates": {
      "1": 36.4,
      "2": 34.9,
      "3": 36.9,
      "4": 35.4,
      "5": 33.4,
      "6": 35.9,
      "7": 36.4,
      "8": 35.4,
      "9": 33.9,
      "10": 35.9,
      "11": 34.4,
      "dc": 32.9
    },
    "state_rates": {
      "PA": 40.2,
      "MI": 38.6,
      "VI": 25.8,
      "MD": 33.0,
      "NC": 37.0,
      "TX": 29.0,
      "SC": 37.8,
      "VA": 33.8,
      "WV": 32.2,
      "LA": 31.4,
      "KY": 33.8,
      "MS": 30.6,
      "OH": 34.6,
      "TN": 33.8,
      "IL": 37.0,
      "IN": 37.8,
      "WI": 36.2,
      "AR": 36.2,
      "IA": 37.0,
      "MN": 36.2,
      "MO": 34.6,
      "NE": 37.8,
      "ND": 37.0,
      "SD": 37.0,
      "AK": 29.0,
      "AZ": 35.4,
      "CA": 28.2,
      "HI": 36.2,
      "ID": 35.4,
      "MT": 37.0,
      "NV": 27.4,
      "OR": 36.2,
      "WA": 33.8,
      "CO": 35.4,
      "KS": 37.8,
      "NM": 37.0,
      "OK": 36.2,
      "UT": 36.2,
      "WY": 38.6,
      "AL": 28.2,
      "FL": 29.0,
      "GA": 33.0,
      "DC": 29.8,
      "ME": 37.0,
      "MA": 35.4,
      "NH": 35.4,
      "RI": 37.0,
      "PR": 31.4,
      "CT": 36.2,
      "NY": 27.4,
      "VT": 38.6,
      "DE": 37.0,
      "NJ": 36.2,
      "GU": 40.2
    },
    "yearly_trend": {
      "1990": {
        "total": 222,
        "wr": 31.0
      },
      "1991": {
        "total": 229,
        "wr": 30.8
      },
      "1992": {
        "total": 236,
        "wr": 30.6
      },
      "1993": {
        "total": 244,
        "wr": 30.5
      },
      "1994": {
        "total": 251,
        "wr": 30.4
      },
      "1995": {
        "total": 258,
        "wr": 30.4
      },
      "1996": {
        "total": 265,
        "wr": 30.4
      },
      "1997": {
        "total": 272,
        "wr": 30.5
      },
      "1998": {
        "total": 279,
        "wr": 30.6
      },
      "1999": {
        "total": 287,
        "wr": 30.8
      },
      "2000": {
        "total": 294,
        "wr": 31.0
      },
      "2001": {
        "total": 301,
        "wr": 31.3
      },
      "2002": {
        "total": 308,
        "wr": 31.6
      },
      "2003": {
        "total": 315,
        "wr": 31.9
      },
      "2004": {
        "total": 322,
        "wr": 32.3
      },
      "2005": {
        "total": 330,
        "wr": 32.7
      },
      "2006": {
        "total": 337,
        "wr": 33.2
      },
      "2007": {
        "total": 344,
        "wr": 33.6
      },
      "2008": {
        "total": 351,
        "wr": 34.1
      },
      "2009": {
        "total": 358,
        "wr": 34.6
      },
      "2010": {
        "total": 366,
        "wr": 35.1
      },
      "2011": {
        "total": 373,
        "wr": 35.6
      },
      "2012": {
        "total": 380,
        "wr": 36.1
      },
      "2013": {
        "total": 387,
        "wr": 36.6
      },
      "2014": {
        "total": 394,
        "wr": 37.1
      },
      "2015": {
        "total": 401,
        "wr": 37.5
      },
      "2016": {
        "total": 409,
        "wr": 38.0
      },
      "2017": {
        "total": 416,
        "wr": 38.4
      },
      "2018": {
        "total": 423,
        "wr": 38.8
      },
      "2019": {
        "total": 430,
        "wr": 39.1
      },
      "2020": {
        "total": 437,
        "wr": 39.4
      },
      "2021": {
        "total": 445,
        "wr": 39.7
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
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
        "mo": 12,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "791": {
    "nos_code": "791",
    "label": "ERISA",
    "category": "work",
    "sub": "ERISA benefits denial",
    "total": 23400,
    "mo": 10,
    "wr": 31.2,
    "sp": 46.1,
    "sol": "Varies by plan",
    "af": "Contingency or hourly",
    "rng": {
      "lo": 18,
      "md": 75,
      "hi": 420
    },
    "rp": 4.8,
    "ps": {
      "wr": 13.2,
      "total": 10787
    },
    "rr": {
      "wr": 33.2,
      "total": 12613
    },
    "cw": 36.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 46.1,
        "c": "#0D9488",
        "n": 10787
      },
      {
        "l": "Dismissed",
        "p": 24.3,
        "c": "#94A3B8",
        "n": 5675
      },
      {
        "l": "Other",
        "p": 13.5,
        "c": "#475569",
        "n": 3153
      },
      {
        "l": "Summary Judgment",
        "p": 10.8,
        "c": "#D97706",
        "n": 2522
      },
      {
        "l": "Default Judgment",
        "p": 3.8,
        "c": "#DB2777",
        "n": 882
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 252
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 126
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_loss": 1.1,
      "dismiss": 32.8,
      "fav_set": 45.3,
      "set_mo": 9,
      "trial_med": "$37"
    },
    "circuit_rates": {
      "1": 32.2,
      "2": 30.7,
      "3": 32.7,
      "4": 31.2,
      "5": 29.2,
      "6": 31.7,
      "7": 32.2,
      "8": 31.2,
      "9": 29.7,
      "10": 31.7,
      "11": 30.2,
      "dc": 28.7
    },
    "state_rates": {
      "PA": 36.0,
      "MI": 34.4,
      "VI": 21.6,
      "MD": 28.8,
      "NC": 32.8,
      "TX": 24.8,
      "SC": 33.6,
      "VA": 29.6,
      "WV": 28.0,
      "LA": 27.2,
      "KY": 29.6,
      "MS": 26.4,
      "OH": 30.4,
      "TN": 29.6,
      "IL": 32.8,
      "IN": 33.6,
      "WI": 32.0,
      "AR": 32.0,
      "IA": 32.8,
      "MN": 32.0,
      "MO": 30.4,
      "NE": 33.6,
      "ND": 32.8,
      "SD": 32.8,
      "AK": 24.8,
      "AZ": 31.2,
      "CA": 24.0,
      "HI": 32.0,
      "ID": 31.2,
      "MT": 32.8,
      "NV": 23.2,
      "OR": 32.0,
      "WA": 29.6,
      "CO": 31.2,
      "KS": 33.6,
      "NM": 32.8,
      "OK": 32.0,
      "UT": 32.0,
      "WY": 34.4,
      "AL": 24.0,
      "FL": 24.8,
      "GA": 28.8,
      "DC": 25.6,
      "ME": 32.8,
      "MA": 31.2,
      "NH": 31.2,
      "RI": 32.8,
      "PR": 27.2,
      "CT": 32.0,
      "NY": 23.2,
      "VT": 34.4,
      "DE": 32.8,
      "NJ": 32.0,
      "GU": 36.0
    },
    "yearly_trend": {
      "1990": {
        "total": 585,
        "wr": 26.8
      },
      "1991": {
        "total": 603,
        "wr": 26.6
      },
      "1992": {
        "total": 622,
        "wr": 26.4
      },
      "1993": {
        "total": 641,
        "wr": 26.3
      },
      "1994": {
        "total": 660,
        "wr": 26.2
      },
      "1995": {
        "total": 679,
        "wr": 26.2
      },
      "1996": {
        "total": 698,
        "wr": 26.2
      },
      "1997": {
        "total": 717,
        "wr": 26.3
      },
      "1998": {
        "total": 735,
        "wr": 26.4
      },
      "1999": {
        "total": 754,
        "wr": 26.6
      },
      "2000": {
        "total": 773,
        "wr": 26.8
      },
      "2001": {
        "total": 792,
        "wr": 27.1
      },
      "2002": {
        "total": 811,
        "wr": 27.4
      },
      "2003": {
        "total": 830,
        "wr": 27.7
      },
      "2004": {
        "total": 849,
        "wr": 28.1
      },
      "2005": {
        "total": 868,
        "wr": 28.5
      },
      "2006": {
        "total": 886,
        "wr": 29.0
      },
      "2007": {
        "total": 905,
        "wr": 29.4
      },
      "2008": {
        "total": 924,
        "wr": 29.9
      },
      "2009": {
        "total": 943,
        "wr": 30.4
      },
      "2010": {
        "total": 962,
        "wr": 30.9
      },
      "2011": {
        "total": 981,
        "wr": 31.4
      },
      "2012": {
        "total": 1000,
        "wr": 31.9
      },
      "2013": {
        "total": 1019,
        "wr": 32.4
      },
      "2014": {
        "total": 1037,
        "wr": 32.9
      },
      "2015": {
        "total": 1056,
        "wr": 33.3
      },
      "2016": {
        "total": 1075,
        "wr": 33.8
      },
      "2017": {
        "total": 1094,
        "wr": 34.2
      },
      "2018": {
        "total": 1113,
        "wr": 34.6
      },
      "2019": {
        "total": 1132,
        "wr": 34.9
      },
      "2020": {
        "total": 1151,
        "wr": 35.2
      },
      "2021": {
        "total": 1170,
        "wr": 35.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "810": {
    "nos_code": "810",
    "label": "Social Security ID",
    "category": "gov",
    "sub": "social security dispute",
    "total": 6200,
    "mo": 8,
    "wr": 24.1,
    "sp": 39.2,
    "sol": "60 days appeal",
    "af": "Court appointed if appeal from SSA",
    "rng": {
      "lo": 0,
      "md": 0,
      "hi": 28
    },
    "rp": 4.2,
    "ps": {
      "wr": 6.100000000000001,
      "total": 2430
    },
    "rr": {
      "wr": 26.1,
      "total": 3770
    },
    "cw": 29.1,
    "ends": [
      {
        "l": "Settlement",
        "p": 39.2,
        "c": "#0D9488",
        "n": 2430
      },
      {
        "l": "Dismissed",
        "p": 27.4,
        "c": "#94A3B8",
        "n": 1696
      },
      {
        "l": "Other",
        "p": 15.2,
        "c": "#475569",
        "n": 942
      },
      {
        "l": "Summary Judgment",
        "p": 12.2,
        "c": "#D97706",
        "n": 754
      },
      {
        "l": "Default Judgment",
        "p": 4.3,
        "c": "#DB2777",
        "n": 263
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 75
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 37
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.2,
      "trial_loss": 0.4,
      "dismiss": 51.2,
      "fav_set": 25.3,
      "set_mo": 7,
      "trial_med": "N/A"
    },
    "circuit_rates": {
      "1": 25.1,
      "2": 23.6,
      "3": 25.6,
      "4": 24.1,
      "5": 22.1,
      "6": 24.6,
      "7": 25.1,
      "8": 24.1,
      "9": 22.6,
      "10": 24.6,
      "11": 23.1,
      "dc": 21.6
    },
    "state_rates": {
      "PA": 28.9,
      "MI": 27.3,
      "VI": 14.5,
      "MD": 21.7,
      "NC": 25.7,
      "TX": 17.7,
      "SC": 26.5,
      "VA": 22.5,
      "WV": 20.9,
      "LA": 20.1,
      "KY": 22.5,
      "MS": 19.3,
      "OH": 23.3,
      "TN": 22.5,
      "IL": 25.7,
      "IN": 26.5,
      "WI": 24.9,
      "AR": 24.9,
      "IA": 25.7,
      "MN": 24.9,
      "MO": 23.3,
      "NE": 26.5,
      "ND": 25.7,
      "SD": 25.7,
      "AK": 17.7,
      "AZ": 24.1,
      "CA": 16.9,
      "HI": 24.9,
      "ID": 24.1,
      "MT": 25.7,
      "NV": 16.1,
      "OR": 24.9,
      "WA": 22.5,
      "CO": 24.1,
      "KS": 26.5,
      "NM": 25.7,
      "OK": 24.9,
      "UT": 24.9,
      "WY": 27.3,
      "AL": 16.9,
      "FL": 17.7,
      "GA": 21.7,
      "DC": 18.5,
      "ME": 25.7,
      "MA": 24.1,
      "NH": 24.1,
      "RI": 25.7,
      "PR": 20.1,
      "CT": 24.9,
      "NY": 16.1,
      "VT": 27.3,
      "DE": 25.7,
      "NJ": 24.9,
      "GU": 28.9
    },
    "yearly_trend": {
      "1990": {
        "total": 155,
        "wr": 19.7
      },
      "1991": {
        "total": 160,
        "wr": 19.5
      },
      "1992": {
        "total": 165,
        "wr": 19.3
      },
      "1993": {
        "total": 170,
        "wr": 19.2
      },
      "1994": {
        "total": 175,
        "wr": 19.1
      },
      "1995": {
        "total": 180,
        "wr": 19.1
      },
      "1996": {
        "total": 185,
        "wr": 19.1
      },
      "1997": {
        "total": 190,
        "wr": 19.2
      },
      "1998": {
        "total": 195,
        "wr": 19.3
      },
      "1999": {
        "total": 200,
        "wr": 19.5
      },
      "2000": {
        "total": 205,
        "wr": 19.7
      },
      "2001": {
        "total": 210,
        "wr": 20.0
      },
      "2002": {
        "total": 215,
        "wr": 20.3
      },
      "2003": {
        "total": 220,
        "wr": 20.6
      },
      "2004": {
        "total": 225,
        "wr": 21.0
      },
      "2005": {
        "total": 230,
        "wr": 21.4
      },
      "2006": {
        "total": 235,
        "wr": 21.9
      },
      "2007": {
        "total": 240,
        "wr": 22.3
      },
      "2008": {
        "total": 245,
        "wr": 22.8
      },
      "2009": {
        "total": 250,
        "wr": 23.3
      },
      "2010": {
        "total": 255,
        "wr": 23.8
      },
      "2011": {
        "total": 260,
        "wr": 24.3
      },
      "2012": {
        "total": 265,
        "wr": 24.8
      },
      "2013": {
        "total": 270,
        "wr": 25.3
      },
      "2014": {
        "total": 275,
        "wr": 25.8
      },
      "2015": {
        "total": 280,
        "wr": 26.2
      },
      "2016": {
        "total": 285,
        "wr": 26.7
      },
      "2017": {
        "total": 290,
        "wr": 27.1
      },
      "2018": {
        "total": 295,
        "wr": 27.5
      },
      "2019": {
        "total": 300,
        "wr": 27.8
      },
      "2020": {
        "total": 305,
        "wr": 28.1
      },
      "2021": {
        "total": 310,
        "wr": 28.4
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 5,
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
  "820": {
    "nos_code": "820",
    "label": "Copyright",
    "category": "money",
    "sub": "copyright infringement",
    "total": 18400,
    "mo": 16,
    "wr": 52.3,
    "sp": 48.1,
    "sol": "3 years statute",
    "af": "Contingency or hourly ($400-700/hr)",
    "rng": {
      "lo": 120,
      "md": 560,
      "hi": 3200
    },
    "rp": 3.4,
    "ps": {
      "wr": 34.3,
      "total": 8850
    },
    "rr": {
      "wr": 54.3,
      "total": 9550
    },
    "cw": 57.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.1,
        "c": "#0D9488",
        "n": 8850
      },
      {
        "l": "Dismissed",
        "p": 23.4,
        "c": "#94A3B8",
        "n": 4297
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 2387
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 1910
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 668
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 191
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 95
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.8,
      "trial_loss": 2.1,
      "dismiss": 19.3,
      "fav_set": 51.4,
      "set_mo": 15,
      "trial_med": "$280"
    },
    "circuit_rates": {
      "1": 53.3,
      "2": 51.8,
      "3": 53.8,
      "4": 52.3,
      "5": 50.3,
      "6": 52.8,
      "7": 53.3,
      "8": 52.3,
      "9": 50.8,
      "10": 52.8,
      "11": 51.3,
      "dc": 49.8
    },
    "state_rates": {
      "PA": 57.1,
      "MI": 55.5,
      "VI": 42.7,
      "MD": 49.9,
      "NC": 53.9,
      "TX": 45.9,
      "SC": 54.7,
      "VA": 50.7,
      "WV": 49.1,
      "LA": 48.3,
      "KY": 50.7,
      "MS": 47.5,
      "OH": 51.5,
      "TN": 50.7,
      "IL": 53.9,
      "IN": 54.7,
      "WI": 53.1,
      "AR": 53.1,
      "IA": 53.9,
      "MN": 53.1,
      "MO": 51.5,
      "NE": 54.7,
      "ND": 53.9,
      "SD": 53.9,
      "AK": 45.9,
      "AZ": 52.3,
      "CA": 45.1,
      "HI": 53.1,
      "ID": 52.3,
      "MT": 53.9,
      "NV": 44.3,
      "OR": 53.1,
      "WA": 50.7,
      "CO": 52.3,
      "KS": 54.7,
      "NM": 53.9,
      "OK": 53.1,
      "UT": 53.1,
      "WY": 55.5,
      "AL": 45.1,
      "FL": 45.9,
      "GA": 49.9,
      "DC": 46.7,
      "ME": 53.9,
      "MA": 52.3,
      "NH": 52.3,
      "RI": 53.9,
      "PR": 48.3,
      "CT": 53.1,
      "NY": 44.3,
      "VT": 55.5,
      "DE": 53.9,
      "NJ": 53.1,
      "GU": 57.1
    },
    "yearly_trend": {
      "1990": {
        "total": 460,
        "wr": 47.9
      },
      "1991": {
        "total": 474,
        "wr": 47.7
      },
      "1992": {
        "total": 489,
        "wr": 47.5
      },
      "1993": {
        "total": 504,
        "wr": 47.4
      },
      "1994": {
        "total": 519,
        "wr": 47.3
      },
      "1995": {
        "total": 534,
        "wr": 47.3
      },
      "1996": {
        "total": 549,
        "wr": 47.3
      },
      "1997": {
        "total": 563,
        "wr": 47.4
      },
      "1998": {
        "total": 578,
        "wr": 47.5
      },
      "1999": {
        "total": 593,
        "wr": 47.7
      },
      "2000": {
        "total": 608,
        "wr": 47.9
      },
      "2001": {
        "total": 623,
        "wr": 48.2
      },
      "2002": {
        "total": 638,
        "wr": 48.5
      },
      "2003": {
        "total": 652,
        "wr": 48.8
      },
      "2004": {
        "total": 667,
        "wr": 49.2
      },
      "2005": {
        "total": 682,
        "wr": 49.6
      },
      "2006": {
        "total": 697,
        "wr": 50.1
      },
      "2007": {
        "total": 712,
        "wr": 50.5
      },
      "2008": {
        "total": 727,
        "wr": 51.0
      },
      "2009": {
        "total": 741,
        "wr": 51.5
      },
      "2010": {
        "total": 756,
        "wr": 52.0
      },
      "2011": {
        "total": 771,
        "wr": 52.5
      },
      "2012": {
        "total": 786,
        "wr": 53.0
      },
      "2013": {
        "total": 801,
        "wr": 53.5
      },
      "2014": {
        "total": 816,
        "wr": 54.0
      },
      "2015": {
        "total": 830,
        "wr": 54.4
      },
      "2016": {
        "total": 845,
        "wr": 54.9
      },
      "2017": {
        "total": 860,
        "wr": 55.3
      },
      "2018": {
        "total": 875,
        "wr": 55.7
      },
      "2019": {
        "total": 890,
        "wr": 56.0
      },
      "2020": {
        "total": 905,
        "wr": 56.3
      },
      "2021": {
        "total": 920,
        "wr": 56.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 5,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 8,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 11,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 16,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "830": {
    "nos_code": "830",
    "label": "Patent",
    "category": "money",
    "sub": "patent infringement",
    "total": 42600,
    "mo": 22,
    "wr": 44.2,
    "sp": 42.1,
    "sol": "6 years statute",
    "af": "Hourly ($500-1000/hr) or contingency",
    "rng": {
      "lo": 280,
      "md": 1200,
      "hi": 7200
    },
    "rp": 5.2,
    "ps": {
      "wr": 26.200000000000003,
      "total": 17934
    },
    "rr": {
      "wr": 46.2,
      "total": 24666
    },
    "cw": 49.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 42.1,
        "c": "#0D9488",
        "n": 17934
      },
      {
        "l": "Dismissed",
        "p": 26.1,
        "c": "#94A3B8",
        "n": 11099
      },
      {
        "l": "Other",
        "p": 14.5,
        "c": "#475569",
        "n": 6166
      },
      {
        "l": "Summary Judgment",
        "p": 11.6,
        "c": "#D97706",
        "n": 4933
      },
      {
        "l": "Default Judgment",
        "p": 4.1,
        "c": "#DB2777",
        "n": 1726
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 493
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 246
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.4,
      "trial_loss": 3.2,
      "dismiss": 18.4,
      "fav_set": 48.3,
      "set_mo": 20,
      "trial_med": "$600"
    },
    "circuit_rates": {
      "1": 45.2,
      "2": 43.7,
      "3": 45.7,
      "4": 44.2,
      "5": 42.2,
      "6": 44.7,
      "7": 45.2,
      "8": 44.2,
      "9": 42.7,
      "10": 44.7,
      "11": 43.2,
      "dc": 41.7
    },
    "state_rates": {
      "PA": 49.0,
      "MI": 47.4,
      "VI": 34.6,
      "MD": 41.8,
      "NC": 45.8,
      "TX": 37.8,
      "SC": 46.6,
      "VA": 42.6,
      "WV": 41.0,
      "LA": 40.2,
      "KY": 42.6,
      "MS": 39.4,
      "OH": 43.4,
      "TN": 42.6,
      "IL": 45.8,
      "IN": 46.6,
      "WI": 45.0,
      "AR": 45.0,
      "IA": 45.8,
      "MN": 45.0,
      "MO": 43.4,
      "NE": 46.6,
      "ND": 45.8,
      "SD": 45.8,
      "AK": 37.8,
      "AZ": 44.2,
      "CA": 37.0,
      "HI": 45.0,
      "ID": 44.2,
      "MT": 45.8,
      "NV": 36.2,
      "OR": 45.0,
      "WA": 42.6,
      "CO": 44.2,
      "KS": 46.6,
      "NM": 45.8,
      "OK": 45.0,
      "UT": 45.0,
      "WY": 47.4,
      "AL": 37.0,
      "FL": 37.8,
      "GA": 41.8,
      "DC": 38.6,
      "ME": 45.8,
      "MA": 44.2,
      "NH": 44.2,
      "RI": 45.8,
      "PR": 40.2,
      "CT": 45.0,
      "NY": 36.2,
      "VT": 47.4,
      "DE": 45.8,
      "NJ": 45.0,
      "GU": 49.0
    },
    "yearly_trend": {
      "1990": {
        "total": 1065,
        "wr": 39.8
      },
      "1991": {
        "total": 1099,
        "wr": 39.6
      },
      "1992": {
        "total": 1133,
        "wr": 39.4
      },
      "1993": {
        "total": 1168,
        "wr": 39.3
      },
      "1994": {
        "total": 1202,
        "wr": 39.2
      },
      "1995": {
        "total": 1236,
        "wr": 39.2
      },
      "1996": {
        "total": 1271,
        "wr": 39.2
      },
      "1997": {
        "total": 1305,
        "wr": 39.3
      },
      "1998": {
        "total": 1339,
        "wr": 39.4
      },
      "1999": {
        "total": 1374,
        "wr": 39.6
      },
      "2000": {
        "total": 1408,
        "wr": 39.8
      },
      "2001": {
        "total": 1442,
        "wr": 40.1
      },
      "2002": {
        "total": 1477,
        "wr": 40.4
      },
      "2003": {
        "total": 1511,
        "wr": 40.7
      },
      "2004": {
        "total": 1545,
        "wr": 41.1
      },
      "2005": {
        "total": 1580,
        "wr": 41.5
      },
      "2006": {
        "total": 1614,
        "wr": 42.0
      },
      "2007": {
        "total": 1649,
        "wr": 42.4
      },
      "2008": {
        "total": 1683,
        "wr": 42.9
      },
      "2009": {
        "total": 1717,
        "wr": 43.4
      },
      "2010": {
        "total": 1752,
        "wr": 43.9
      },
      "2011": {
        "total": 1786,
        "wr": 44.4
      },
      "2012": {
        "total": 1820,
        "wr": 44.9
      },
      "2013": {
        "total": 1855,
        "wr": 45.4
      },
      "2014": {
        "total": 1889,
        "wr": 45.9
      },
      "2015": {
        "total": 1923,
        "wr": 46.3
      },
      "2016": {
        "total": 1958,
        "wr": 46.8
      },
      "2017": {
        "total": 1992,
        "wr": 47.2
      },
      "2018": {
        "total": 2026,
        "wr": 47.6
      },
      "2019": {
        "total": 2061,
        "wr": 47.9
      },
      "2020": {
        "total": 2095,
        "wr": 48.2
      },
      "2021": {
        "total": 2130,
        "wr": 48.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 7,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 11,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 15,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 22,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "840": {
    "nos_code": "840",
    "label": "Trademark",
    "category": "money",
    "sub": "trademark infringement",
    "total": 28900,
    "mo": 14,
    "wr": 56.1,
    "sp": 45.2,
    "sol": "3 years statute",
    "af": "Hourly ($400-700/hr) or contingency",
    "rng": {
      "lo": 95,
      "md": 420,
      "hi": 2400
    },
    "rp": 4.1,
    "ps": {
      "wr": 38.1,
      "total": 13062
    },
    "rr": {
      "wr": 58.1,
      "total": 15838
    },
    "cw": 61.1,
    "ends": [
      {
        "l": "Settlement",
        "p": 45.2,
        "c": "#0D9488",
        "n": 13062
      },
      {
        "l": "Dismissed",
        "p": 24.7,
        "c": "#94A3B8",
        "n": 7127
      },
      {
        "l": "Other",
        "p": 13.7,
        "c": "#475569",
        "n": 3959
      },
      {
        "l": "Summary Judgment",
        "p": 11.0,
        "c": "#D97706",
        "n": 3167
      },
      {
        "l": "Default Judgment",
        "p": 3.8,
        "c": "#DB2777",
        "n": 1108
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 316
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 158
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.6,
      "trial_loss": 1.8,
      "dismiss": 17.2,
      "fav_set": 54.2,
      "set_mo": 13,
      "trial_med": "$210"
    },
    "circuit_rates": {
      "1": 57.1,
      "2": 55.6,
      "3": 57.6,
      "4": 56.1,
      "5": 54.1,
      "6": 56.6,
      "7": 57.1,
      "8": 56.1,
      "9": 54.6,
      "10": 56.6,
      "11": 55.1,
      "dc": 53.6
    },
    "state_rates": {
      "PA": 60.9,
      "MI": 59.3,
      "VI": 46.5,
      "MD": 53.7,
      "NC": 57.7,
      "TX": 49.7,
      "SC": 58.5,
      "VA": 54.5,
      "WV": 52.9,
      "LA": 52.1,
      "KY": 54.5,
      "MS": 51.3,
      "OH": 55.3,
      "TN": 54.5,
      "IL": 57.7,
      "IN": 58.5,
      "WI": 56.9,
      "AR": 56.9,
      "IA": 57.7,
      "MN": 56.9,
      "MO": 55.3,
      "NE": 58.5,
      "ND": 57.7,
      "SD": 57.7,
      "AK": 49.7,
      "AZ": 56.1,
      "CA": 48.9,
      "HI": 56.9,
      "ID": 56.1,
      "MT": 57.7,
      "NV": 48.1,
      "OR": 56.9,
      "WA": 54.5,
      "CO": 56.1,
      "KS": 58.5,
      "NM": 57.7,
      "OK": 56.9,
      "UT": 56.9,
      "WY": 59.3,
      "AL": 48.9,
      "FL": 49.7,
      "GA": 53.7,
      "DC": 50.5,
      "ME": 57.7,
      "MA": 56.1,
      "NH": 56.1,
      "RI": 57.7,
      "PR": 52.1,
      "CT": 56.9,
      "NY": 48.1,
      "VT": 59.3,
      "DE": 57.7,
      "NJ": 56.9,
      "GU": 60.9
    },
    "yearly_trend": {
      "1990": {
        "total": 722,
        "wr": 51.7
      },
      "1991": {
        "total": 745,
        "wr": 51.5
      },
      "1992": {
        "total": 769,
        "wr": 51.3
      },
      "1993": {
        "total": 792,
        "wr": 51.2
      },
      "1994": {
        "total": 815,
        "wr": 51.1
      },
      "1995": {
        "total": 839,
        "wr": 51.1
      },
      "1996": {
        "total": 862,
        "wr": 51.1
      },
      "1997": {
        "total": 885,
        "wr": 51.2
      },
      "1998": {
        "total": 908,
        "wr": 51.3
      },
      "1999": {
        "total": 932,
        "wr": 51.5
      },
      "2000": {
        "total": 955,
        "wr": 51.7
      },
      "2001": {
        "total": 978,
        "wr": 52.0
      },
      "2002": {
        "total": 1002,
        "wr": 52.3
      },
      "2003": {
        "total": 1025,
        "wr": 52.6
      },
      "2004": {
        "total": 1048,
        "wr": 53.0
      },
      "2005": {
        "total": 1072,
        "wr": 53.4
      },
      "2006": {
        "total": 1095,
        "wr": 53.9
      },
      "2007": {
        "total": 1118,
        "wr": 54.3
      },
      "2008": {
        "total": 1142,
        "wr": 54.8
      },
      "2009": {
        "total": 1165,
        "wr": 55.3
      },
      "2010": {
        "total": 1188,
        "wr": 55.8
      },
      "2011": {
        "total": 1211,
        "wr": 56.3
      },
      "2012": {
        "total": 1235,
        "wr": 56.8
      },
      "2013": {
        "total": 1258,
        "wr": 57.3
      },
      "2014": {
        "total": 1281,
        "wr": 57.8
      },
      "2015": {
        "total": 1305,
        "wr": 58.2
      },
      "2016": {
        "total": 1328,
        "wr": 58.7
      },
      "2017": {
        "total": 1351,
        "wr": 59.1
      },
      "2018": {
        "total": 1375,
        "wr": 59.5
      },
      "2019": {
        "total": 1398,
        "wr": 59.8
      },
      "2020": {
        "total": 1421,
        "wr": 60.1
      },
      "2021": {
        "total": 1445,
        "wr": 60.4
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 7,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 9,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 14,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "850": {
    "nos_code": "850",
    "label": "Securities/Commodities/Exchange",
    "category": "money",
    "sub": "securities fraud",
    "total": 24500,
    "mo": 18,
    "wr": 28.6,
    "sp": 41.2,
    "sol": "5 years statute",
    "af": "Contingency (25-33%) or hourly",
    "rng": {
      "lo": 180,
      "md": 850,
      "hi": 5200
    },
    "rp": 4.6,
    "ps": {
      "wr": 10.600000000000001,
      "total": 10094
    },
    "rr": {
      "wr": 30.6,
      "total": 14406
    },
    "cw": 33.6,
    "ends": [
      {
        "l": "Settlement",
        "p": 41.2,
        "c": "#0D9488",
        "n": 10094
      },
      {
        "l": "Dismissed",
        "p": 26.5,
        "c": "#94A3B8",
        "n": 6482
      },
      {
        "l": "Other",
        "p": 14.7,
        "c": "#475569",
        "n": 3601
      },
      {
        "l": "Summary Judgment",
        "p": 11.8,
        "c": "#D97706",
        "n": 2881
      },
      {
        "l": "Default Judgment",
        "p": 4.1,
        "c": "#DB2777",
        "n": 1008
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 288
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 144
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.1,
      "trial_loss": 2.3,
      "dismiss": 38.4,
      "fav_set": 35.2,
      "set_mo": 16,
      "trial_med": "$425"
    },
    "circuit_rates": {
      "1": 29.6,
      "2": 28.1,
      "3": 30.1,
      "4": 28.6,
      "5": 26.6,
      "6": 29.1,
      "7": 29.6,
      "8": 28.6,
      "9": 27.1,
      "10": 29.1,
      "11": 27.6,
      "dc": 26.1
    },
    "state_rates": {
      "PA": 33.4,
      "MI": 31.8,
      "VI": 19.0,
      "MD": 26.2,
      "NC": 30.2,
      "TX": 22.2,
      "SC": 31.0,
      "VA": 27.0,
      "WV": 25.4,
      "LA": 24.6,
      "KY": 27.0,
      "MS": 23.8,
      "OH": 27.8,
      "TN": 27.0,
      "IL": 30.2,
      "IN": 31.0,
      "WI": 29.4,
      "AR": 29.4,
      "IA": 30.2,
      "MN": 29.4,
      "MO": 27.8,
      "NE": 31.0,
      "ND": 30.2,
      "SD": 30.2,
      "AK": 22.2,
      "AZ": 28.6,
      "CA": 21.4,
      "HI": 29.4,
      "ID": 28.6,
      "MT": 30.2,
      "NV": 20.6,
      "OR": 29.4,
      "WA": 27.0,
      "CO": 28.6,
      "KS": 31.0,
      "NM": 30.2,
      "OK": 29.4,
      "UT": 29.4,
      "WY": 31.8,
      "AL": 21.4,
      "FL": 22.2,
      "GA": 26.2,
      "DC": 23.0,
      "ME": 30.2,
      "MA": 28.6,
      "NH": 28.6,
      "RI": 30.2,
      "PR": 24.6,
      "CT": 29.4,
      "NY": 20.6,
      "VT": 31.8,
      "DE": 30.2,
      "NJ": 29.4,
      "GU": 33.4
    },
    "yearly_trend": {
      "1990": {
        "total": 612,
        "wr": 24.2
      },
      "1991": {
        "total": 632,
        "wr": 24.0
      },
      "1992": {
        "total": 652,
        "wr": 23.8
      },
      "1993": {
        "total": 671,
        "wr": 23.7
      },
      "1994": {
        "total": 691,
        "wr": 23.6
      },
      "1995": {
        "total": 711,
        "wr": 23.6
      },
      "1996": {
        "total": 731,
        "wr": 23.6
      },
      "1997": {
        "total": 750,
        "wr": 23.7
      },
      "1998": {
        "total": 770,
        "wr": 23.8
      },
      "1999": {
        "total": 790,
        "wr": 24.0
      },
      "2000": {
        "total": 810,
        "wr": 24.2
      },
      "2001": {
        "total": 829,
        "wr": 24.5
      },
      "2002": {
        "total": 849,
        "wr": 24.8
      },
      "2003": {
        "total": 869,
        "wr": 25.1
      },
      "2004": {
        "total": 889,
        "wr": 25.5
      },
      "2005": {
        "total": 908,
        "wr": 25.9
      },
      "2006": {
        "total": 928,
        "wr": 26.4
      },
      "2007": {
        "total": 948,
        "wr": 26.8
      },
      "2008": {
        "total": 968,
        "wr": 27.3
      },
      "2009": {
        "total": 987,
        "wr": 27.8
      },
      "2010": {
        "total": 1007,
        "wr": 28.3
      },
      "2011": {
        "total": 1027,
        "wr": 28.8
      },
      "2012": {
        "total": 1047,
        "wr": 29.3
      },
      "2013": {
        "total": 1066,
        "wr": 29.8
      },
      "2014": {
        "total": 1086,
        "wr": 30.3
      },
      "2015": {
        "total": 1106,
        "wr": 30.7
      },
      "2016": {
        "total": 1126,
        "wr": 31.2
      },
      "2017": {
        "total": 1145,
        "wr": 31.6
      },
      "2018": {
        "total": 1165,
        "wr": 32.0
      },
      "2019": {
        "total": 1185,
        "wr": 32.3
      },
      "2020": {
        "total": 1205,
        "wr": 32.6
      },
      "2021": {
        "total": 1225,
        "wr": 32.9
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 6,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 9,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 12,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 18,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "860": {
    "nos_code": "860",
    "label": "Social Security",
    "category": "gov",
    "sub": "social security benefits",
    "total": 89400,
    "mo": 11,
    "wr": 34.2,
    "sp": 45.1,
    "sol": "60 days appeal",
    "af": "Contingency (25% capped $6K) if appeal",
    "rng": {
      "lo": 0,
      "md": 18,
      "hi": 125
    },
    "rp": 18.2,
    "ps": {
      "wr": 16.200000000000003,
      "total": 40319
    },
    "rr": {
      "wr": 36.2,
      "total": 49081
    },
    "cw": 39.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 45.1,
        "c": "#0D9488",
        "n": 40319
      },
      {
        "l": "Dismissed",
        "p": 24.7,
        "c": "#94A3B8",
        "n": 22086
      },
      {
        "l": "Other",
        "p": 13.7,
        "c": "#475569",
        "n": 12270
      },
      {
        "l": "Summary Judgment",
        "p": 11.0,
        "c": "#D97706",
        "n": 9816
      },
      {
        "l": "Default Judgment",
        "p": 3.8,
        "c": "#DB2777",
        "n": 3435
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 981
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 490
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 0.1,
      "trial_loss": 0.3,
      "dismiss": 42.1,
      "fav_set": 31.8,
      "set_mo": 8,
      "trial_med": "$9"
    },
    "circuit_rates": {
      "1": 35.2,
      "2": 33.7,
      "3": 35.7,
      "4": 34.2,
      "5": 32.2,
      "6": 34.7,
      "7": 35.2,
      "8": 34.2,
      "9": 32.7,
      "10": 34.7,
      "11": 33.2,
      "dc": 31.7
    },
    "state_rates": {
      "PA": 39.0,
      "MI": 37.4,
      "VI": 24.6,
      "MD": 31.8,
      "NC": 35.8,
      "TX": 27.8,
      "SC": 36.6,
      "VA": 32.6,
      "WV": 31.0,
      "LA": 30.2,
      "KY": 32.6,
      "MS": 29.4,
      "OH": 33.4,
      "TN": 32.6,
      "IL": 35.8,
      "IN": 36.6,
      "WI": 35.0,
      "AR": 35.0,
      "IA": 35.8,
      "MN": 35.0,
      "MO": 33.4,
      "NE": 36.6,
      "ND": 35.8,
      "SD": 35.8,
      "AK": 27.8,
      "AZ": 34.2,
      "CA": 27.0,
      "HI": 35.0,
      "ID": 34.2,
      "MT": 35.8,
      "NV": 26.2,
      "OR": 35.0,
      "WA": 32.6,
      "CO": 34.2,
      "KS": 36.6,
      "NM": 35.8,
      "OK": 35.0,
      "UT": 35.0,
      "WY": 37.4,
      "AL": 27.0,
      "FL": 27.8,
      "GA": 31.8,
      "DC": 28.6,
      "ME": 35.8,
      "MA": 34.2,
      "NH": 34.2,
      "RI": 35.8,
      "PR": 30.2,
      "CT": 35.0,
      "NY": 26.2,
      "VT": 37.4,
      "DE": 35.8,
      "NJ": 35.0,
      "GU": 39.0
    },
    "yearly_trend": {
      "1990": {
        "total": 2235,
        "wr": 29.8
      },
      "1991": {
        "total": 2307,
        "wr": 29.6
      },
      "1992": {
        "total": 2379,
        "wr": 29.4
      },
      "1993": {
        "total": 2451,
        "wr": 29.3
      },
      "1994": {
        "total": 2523,
        "wr": 29.2
      },
      "1995": {
        "total": 2595,
        "wr": 29.2
      },
      "1996": {
        "total": 2667,
        "wr": 29.2
      },
      "1997": {
        "total": 2739,
        "wr": 29.3
      },
      "1998": {
        "total": 2811,
        "wr": 29.4
      },
      "1999": {
        "total": 2883,
        "wr": 29.6
      },
      "2000": {
        "total": 2955,
        "wr": 29.8
      },
      "2001": {
        "total": 3028,
        "wr": 30.1
      },
      "2002": {
        "total": 3100,
        "wr": 30.4
      },
      "2003": {
        "total": 3172,
        "wr": 30.7
      },
      "2004": {
        "total": 3244,
        "wr": 31.1
      },
      "2005": {
        "total": 3316,
        "wr": 31.5
      },
      "2006": {
        "total": 3388,
        "wr": 32.0
      },
      "2007": {
        "total": 3460,
        "wr": 32.4
      },
      "2008": {
        "total": 3532,
        "wr": 32.9
      },
      "2009": {
        "total": 3604,
        "wr": 33.4
      },
      "2010": {
        "total": 3676,
        "wr": 33.9
      },
      "2011": {
        "total": 3749,
        "wr": 34.4
      },
      "2012": {
        "total": 3821,
        "wr": 34.9
      },
      "2013": {
        "total": 3893,
        "wr": 35.4
      },
      "2014": {
        "total": 3965,
        "wr": 35.9
      },
      "2015": {
        "total": 4037,
        "wr": 36.3
      },
      "2016": {
        "total": 4109,
        "wr": 36.8
      },
      "2017": {
        "total": 4181,
        "wr": 37.2
      },
      "2018": {
        "total": 4253,
        "wr": 37.6
      },
      "2019": {
        "total": 4325,
        "wr": 37.9
      },
      "2020": {
        "total": 4397,
        "wr": 38.2
      },
      "2021": {
        "total": 4470,
        "wr": 38.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "871": {
    "nos_code": "871",
    "label": "IRS Taxes",
    "category": "gov",
    "sub": "tax dispute",
    "total": 12200,
    "mo": 20,
    "wr": 28.4,
    "sp": 29.1,
    "sol": "10-15 years statute",
    "af": "Hourly ($400-600/hr)",
    "rng": {
      "lo": 85,
      "md": 420,
      "hi": 2600
    },
    "rp": 4.2,
    "ps": {
      "wr": 10.399999999999999,
      "total": 3550
    },
    "rr": {
      "wr": 30.4,
      "total": 8650
    },
    "cw": 33.4,
    "ends": [
      {
        "l": "Settlement",
        "p": 29.1,
        "c": "#0D9488",
        "n": 3550
      },
      {
        "l": "Dismissed",
        "p": 31.9,
        "c": "#94A3B8",
        "n": 3892
      },
      {
        "l": "Other",
        "p": 17.7,
        "c": "#475569",
        "n": 2162
      },
      {
        "l": "Summary Judgment",
        "p": 14.2,
        "c": "#D97706",
        "n": 1730
      },
      {
        "l": "Default Judgment",
        "p": 5.0,
        "c": "#DB2777",
        "n": 605
      },
      {
        "l": "Trial",
        "p": 1.4,
        "c": "#7C3AED",
        "n": 173
      },
      {
        "l": "Consent",
        "p": 0.7,
        "c": "#2563EB",
        "n": 86
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.2,
      "trial_loss": 1.6,
      "dismiss": 48.2,
      "fav_set": 29.4,
      "set_mo": 11,
      "trial_med": "$210"
    },
    "circuit_rates": {
      "1": 29.4,
      "2": 27.9,
      "3": 29.9,
      "4": 28.4,
      "5": 26.4,
      "6": 28.9,
      "7": 29.4,
      "8": 28.4,
      "9": 26.9,
      "10": 28.9,
      "11": 27.4,
      "dc": 25.9
    },
    "state_rates": {
      "PA": 33.2,
      "MI": 31.6,
      "VI": 18.8,
      "MD": 26.0,
      "NC": 30.0,
      "TX": 22.0,
      "SC": 30.8,
      "VA": 26.8,
      "WV": 25.2,
      "LA": 24.4,
      "KY": 26.8,
      "MS": 23.6,
      "OH": 27.6,
      "TN": 26.8,
      "IL": 30.0,
      "IN": 30.8,
      "WI": 29.2,
      "AR": 29.2,
      "IA": 30.0,
      "MN": 29.2,
      "MO": 27.6,
      "NE": 30.8,
      "ND": 30.0,
      "SD": 30.0,
      "AK": 22.0,
      "AZ": 28.4,
      "CA": 21.2,
      "HI": 29.2,
      "ID": 28.4,
      "MT": 30.0,
      "NV": 20.4,
      "OR": 29.2,
      "WA": 26.8,
      "CO": 28.4,
      "KS": 30.8,
      "NM": 30.0,
      "OK": 29.2,
      "UT": 29.2,
      "WY": 31.6,
      "AL": 21.2,
      "FL": 22.0,
      "GA": 26.0,
      "DC": 22.8,
      "ME": 30.0,
      "MA": 28.4,
      "NH": 28.4,
      "RI": 30.0,
      "PR": 24.4,
      "CT": 29.2,
      "NY": 20.4,
      "VT": 31.6,
      "DE": 30.0,
      "NJ": 29.2,
      "GU": 33.2
    },
    "yearly_trend": {
      "1990": {
        "total": 305,
        "wr": 24.0
      },
      "1991": {
        "total": 314,
        "wr": 23.8
      },
      "1992": {
        "total": 324,
        "wr": 23.6
      },
      "1993": {
        "total": 334,
        "wr": 23.5
      },
      "1994": {
        "total": 344,
        "wr": 23.4
      },
      "1995": {
        "total": 354,
        "wr": 23.4
      },
      "1996": {
        "total": 364,
        "wr": 23.4
      },
      "1997": {
        "total": 373,
        "wr": 23.5
      },
      "1998": {
        "total": 383,
        "wr": 23.6
      },
      "1999": {
        "total": 393,
        "wr": 23.8
      },
      "2000": {
        "total": 403,
        "wr": 24.0
      },
      "2001": {
        "total": 413,
        "wr": 24.3
      },
      "2002": {
        "total": 423,
        "wr": 24.6
      },
      "2003": {
        "total": 432,
        "wr": 24.9
      },
      "2004": {
        "total": 442,
        "wr": 25.3
      },
      "2005": {
        "total": 452,
        "wr": 25.7
      },
      "2006": {
        "total": 462,
        "wr": 26.2
      },
      "2007": {
        "total": 472,
        "wr": 26.6
      },
      "2008": {
        "total": 482,
        "wr": 27.1
      },
      "2009": {
        "total": 491,
        "wr": 27.6
      },
      "2010": {
        "total": 501,
        "wr": 28.1
      },
      "2011": {
        "total": 511,
        "wr": 28.6
      },
      "2012": {
        "total": 521,
        "wr": 29.1
      },
      "2013": {
        "total": 531,
        "wr": 29.6
      },
      "2014": {
        "total": 541,
        "wr": 30.1
      },
      "2015": {
        "total": 550,
        "wr": 30.5
      },
      "2016": {
        "total": 560,
        "wr": 31.0
      },
      "2017": {
        "total": 570,
        "wr": 31.4
      },
      "2018": {
        "total": 580,
        "wr": 31.8
      },
      "2019": {
        "total": 590,
        "wr": 32.1
      },
      "2020": {
        "total": 600,
        "wr": 32.4
      },
      "2021": {
        "total": 610,
        "wr": 32.7
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 6,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 10,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 14,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 20,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "890": {
    "nos_code": "890",
    "label": "Other Statutory Actions",
    "category": "money",
    "sub": "other statutory action",
    "total": 35200,
    "mo": 10,
    "wr": 41.3,
    "sp": 46.2,
    "sol": "Varies by statute",
    "af": "Varies",
    "rng": {
      "lo": 42,
      "md": 185,
      "hi": 1100
    },
    "rp": 5.4,
    "ps": {
      "wr": 23.299999999999997,
      "total": 16262
    },
    "rr": {
      "wr": 43.3,
      "total": 18938
    },
    "cw": 46.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 46.2,
        "c": "#0D9488",
        "n": 16262
      },
      {
        "l": "Dismissed",
        "p": 24.2,
        "c": "#94A3B8",
        "n": 8522
      },
      {
        "l": "Other",
        "p": 13.5,
        "c": "#475569",
        "n": 4734
      },
      {
        "l": "Summary Judgment",
        "p": 10.8,
        "c": "#D97706",
        "n": 3787
      },
      {
        "l": "Default Judgment",
        "p": 3.8,
        "c": "#DB2777",
        "n": 1325
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 378
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 189
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_loss": 1.4,
      "dismiss": 35.2,
      "fav_set": 43.1,
      "set_mo": 9,
      "trial_med": "$92"
    },
    "circuit_rates": {
      "1": 42.3,
      "2": 40.8,
      "3": 42.8,
      "4": 41.3,
      "5": 39.3,
      "6": 41.8,
      "7": 42.3,
      "8": 41.3,
      "9": 39.8,
      "10": 41.8,
      "11": 40.3,
      "dc": 38.8
    },
    "state_rates": {
      "PA": 46.1,
      "MI": 44.5,
      "VI": 31.7,
      "MD": 38.9,
      "NC": 42.9,
      "TX": 34.9,
      "SC": 43.7,
      "VA": 39.7,
      "WV": 38.1,
      "LA": 37.3,
      "KY": 39.7,
      "MS": 36.5,
      "OH": 40.5,
      "TN": 39.7,
      "IL": 42.9,
      "IN": 43.7,
      "WI": 42.1,
      "AR": 42.1,
      "IA": 42.9,
      "MN": 42.1,
      "MO": 40.5,
      "NE": 43.7,
      "ND": 42.9,
      "SD": 42.9,
      "AK": 34.9,
      "AZ": 41.3,
      "CA": 34.1,
      "HI": 42.1,
      "ID": 41.3,
      "MT": 42.9,
      "NV": 33.3,
      "OR": 42.1,
      "WA": 39.7,
      "CO": 41.3,
      "KS": 43.7,
      "NM": 42.9,
      "OK": 42.1,
      "UT": 42.1,
      "WY": 44.5,
      "AL": 34.1,
      "FL": 34.9,
      "GA": 38.9,
      "DC": 35.7,
      "ME": 42.9,
      "MA": 41.3,
      "NH": 41.3,
      "RI": 42.9,
      "PR": 37.3,
      "CT": 42.1,
      "NY": 33.3,
      "VT": 44.5,
      "DE": 42.9,
      "NJ": 42.1,
      "GU": 46.1
    },
    "yearly_trend": {
      "1990": {
        "total": 880,
        "wr": 36.9
      },
      "1991": {
        "total": 908,
        "wr": 36.7
      },
      "1992": {
        "total": 936,
        "wr": 36.5
      },
      "1993": {
        "total": 965,
        "wr": 36.4
      },
      "1994": {
        "total": 993,
        "wr": 36.3
      },
      "1995": {
        "total": 1021,
        "wr": 36.3
      },
      "1996": {
        "total": 1050,
        "wr": 36.3
      },
      "1997": {
        "total": 1078,
        "wr": 36.4
      },
      "1998": {
        "total": 1107,
        "wr": 36.5
      },
      "1999": {
        "total": 1135,
        "wr": 36.7
      },
      "2000": {
        "total": 1163,
        "wr": 36.9
      },
      "2001": {
        "total": 1192,
        "wr": 37.2
      },
      "2002": {
        "total": 1220,
        "wr": 37.5
      },
      "2003": {
        "total": 1249,
        "wr": 37.8
      },
      "2004": {
        "total": 1277,
        "wr": 38.2
      },
      "2005": {
        "total": 1305,
        "wr": 38.6
      },
      "2006": {
        "total": 1334,
        "wr": 39.1
      },
      "2007": {
        "total": 1362,
        "wr": 39.5
      },
      "2008": {
        "total": 1390,
        "wr": 40.0
      },
      "2009": {
        "total": 1419,
        "wr": 40.5
      },
      "2010": {
        "total": 1447,
        "wr": 41.0
      },
      "2011": {
        "total": 1476,
        "wr": 41.5
      },
      "2012": {
        "total": 1504,
        "wr": 42.0
      },
      "2013": {
        "total": 1532,
        "wr": 42.5
      },
      "2014": {
        "total": 1561,
        "wr": 43.0
      },
      "2015": {
        "total": 1589,
        "wr": 43.4
      },
      "2016": {
        "total": 1618,
        "wr": 43.9
      },
      "2017": {
        "total": 1646,
        "wr": 44.3
      },
      "2018": {
        "total": 1674,
        "wr": 44.7
      },
      "2019": {
        "total": 1703,
        "wr": 45.0
      },
      "2020": {
        "total": 1731,
        "wr": 45.3
      },
      "2021": {
        "total": 1760,
        "wr": 45.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "891": {
    "nos_code": "891",
    "label": "Agricultural Acts",
    "category": "money",
    "sub": "agricultural regulation",
    "total": 1400,
    "mo": 9,
    "wr": 38.2,
    "sp": 42.1,
    "sol": "Varies",
    "af": "Hourly or contingency",
    "rng": {
      "lo": 18,
      "md": 85,
      "hi": 520
    },
    "rp": 0.8,
    "ps": {
      "wr": 20.200000000000003,
      "total": 589
    },
    "rr": {
      "wr": 40.2,
      "total": 811
    },
    "cw": 43.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 42.1,
        "c": "#0D9488",
        "n": 589
      },
      {
        "l": "Dismissed",
        "p": 26.1,
        "c": "#94A3B8",
        "n": 364
      },
      {
        "l": "Other",
        "p": 14.5,
        "c": "#475569",
        "n": 202
      },
      {
        "l": "Summary Judgment",
        "p": 11.6,
        "c": "#D97706",
        "n": 162
      },
      {
        "l": "Default Judgment",
        "p": 4.1,
        "c": "#DB2777",
        "n": 56
      },
      {
        "l": "Trial",
        "p": 1.2,
        "c": "#7C3AED",
        "n": 16
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 8
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.1,
      "trial_loss": 1.3,
      "dismiss": 38.4,
      "fav_set": 40.2,
      "set_mo": 8,
      "trial_med": "$42"
    },
    "circuit_rates": {
      "1": 39.2,
      "2": 37.7,
      "3": 39.7,
      "4": 38.2,
      "5": 36.2,
      "6": 38.7,
      "7": 39.2,
      "8": 38.2,
      "9": 36.7,
      "10": 38.7,
      "11": 37.2,
      "dc": 35.7
    },
    "state_rates": {
      "PA": 43.0,
      "MI": 41.4,
      "VI": 28.6,
      "MD": 35.8,
      "NC": 39.8,
      "TX": 31.8,
      "SC": 40.6,
      "VA": 36.6,
      "WV": 35.0,
      "LA": 34.2,
      "KY": 36.6,
      "MS": 33.4,
      "OH": 37.4,
      "TN": 36.6,
      "IL": 39.8,
      "IN": 40.6,
      "WI": 39.0,
      "AR": 39.0,
      "IA": 39.8,
      "MN": 39.0,
      "MO": 37.4,
      "NE": 40.6,
      "ND": 39.8,
      "SD": 39.8,
      "AK": 31.8,
      "AZ": 38.2,
      "CA": 31.0,
      "HI": 39.0,
      "ID": 38.2,
      "MT": 39.8,
      "NV": 30.2,
      "OR": 39.0,
      "WA": 36.6,
      "CO": 38.2,
      "KS": 40.6,
      "NM": 39.8,
      "OK": 39.0,
      "UT": 39.0,
      "WY": 41.4,
      "AL": 31.0,
      "FL": 31.8,
      "GA": 35.8,
      "DC": 32.6,
      "ME": 39.8,
      "MA": 38.2,
      "NH": 38.2,
      "RI": 39.8,
      "PR": 34.2,
      "CT": 39.0,
      "NY": 30.2,
      "VT": 41.4,
      "DE": 39.8,
      "NJ": 39.0,
      "GU": 43.0
    },
    "yearly_trend": {
      "1990": {
        "total": 35,
        "wr": 33.8
      },
      "1991": {
        "total": 36,
        "wr": 33.6
      },
      "1992": {
        "total": 37,
        "wr": 33.4
      },
      "1993": {
        "total": 38,
        "wr": 33.3
      },
      "1994": {
        "total": 39,
        "wr": 33.2
      },
      "1995": {
        "total": 40,
        "wr": 33.2
      },
      "1996": {
        "total": 41,
        "wr": 33.2
      },
      "1997": {
        "total": 42,
        "wr": 33.3
      },
      "1998": {
        "total": 44,
        "wr": 33.4
      },
      "1999": {
        "total": 45,
        "wr": 33.6
      },
      "2000": {
        "total": 46,
        "wr": 33.8
      },
      "2001": {
        "total": 47,
        "wr": 34.1
      },
      "2002": {
        "total": 48,
        "wr": 34.4
      },
      "2003": {
        "total": 49,
        "wr": 34.7
      },
      "2004": {
        "total": 50,
        "wr": 35.1
      },
      "2005": {
        "total": 51,
        "wr": 35.5
      },
      "2006": {
        "total": 53,
        "wr": 36.0
      },
      "2007": {
        "total": 54,
        "wr": 36.4
      },
      "2008": {
        "total": 55,
        "wr": 36.9
      },
      "2009": {
        "total": 56,
        "wr": 37.4
      },
      "2010": {
        "total": 57,
        "wr": 37.9
      },
      "2011": {
        "total": 58,
        "wr": 38.4
      },
      "2012": {
        "total": 59,
        "wr": 38.9
      },
      "2013": {
        "total": 60,
        "wr": 39.4
      },
      "2014": {
        "total": 62,
        "wr": 39.9
      },
      "2015": {
        "total": 63,
        "wr": 40.3
      },
      "2016": {
        "total": 64,
        "wr": 40.8
      },
      "2017": {
        "total": 65,
        "wr": 41.2
      },
      "2018": {
        "total": 66,
        "wr": 41.6
      },
      "2019": {
        "total": 67,
        "wr": 41.9
      },
      "2020": {
        "total": 68,
        "wr": 42.2
      },
      "2021": {
        "total": 70,
        "wr": 42.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
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
        "mo": 9,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "893": {
    "nos_code": "893",
    "label": "Environmental Matters",
    "category": "gov",
    "sub": "environmental violation",
    "total": 8200,
    "mo": 14,
    "wr": 42.3,
    "sp": 48.4,
    "sol": "Varies by environmental law",
    "af": "Contingency or hourly ($300-500/hr)",
    "rng": {
      "lo": 125,
      "md": 540,
      "hi": 3200
    },
    "rp": 2.6,
    "ps": {
      "wr": 24.299999999999997,
      "total": 3968
    },
    "rr": {
      "wr": 44.3,
      "total": 4232
    },
    "cw": 47.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.4,
        "c": "#0D9488",
        "n": 3968
      },
      {
        "l": "Dismissed",
        "p": 23.2,
        "c": "#94A3B8",
        "n": 1904
      },
      {
        "l": "Other",
        "p": 12.9,
        "c": "#475569",
        "n": 1058
      },
      {
        "l": "Summary Judgment",
        "p": 10.3,
        "c": "#D97706",
        "n": 846
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 296
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 84
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 42
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.6,
      "trial_loss": 1.8,
      "dismiss": 28.2,
      "fav_set": 45.1,
      "set_mo": 13,
      "trial_med": "$270"
    },
    "circuit_rates": {
      "1": 43.3,
      "2": 41.8,
      "3": 43.8,
      "4": 42.3,
      "5": 40.3,
      "6": 42.8,
      "7": 43.3,
      "8": 42.3,
      "9": 40.8,
      "10": 42.8,
      "11": 41.3,
      "dc": 39.8
    },
    "state_rates": {
      "PA": 47.1,
      "MI": 45.5,
      "VI": 32.7,
      "MD": 39.9,
      "NC": 43.9,
      "TX": 35.9,
      "SC": 44.7,
      "VA": 40.7,
      "WV": 39.1,
      "LA": 38.3,
      "KY": 40.7,
      "MS": 37.5,
      "OH": 41.5,
      "TN": 40.7,
      "IL": 43.9,
      "IN": 44.7,
      "WI": 43.1,
      "AR": 43.1,
      "IA": 43.9,
      "MN": 43.1,
      "MO": 41.5,
      "NE": 44.7,
      "ND": 43.9,
      "SD": 43.9,
      "AK": 35.9,
      "AZ": 42.3,
      "CA": 35.1,
      "HI": 43.1,
      "ID": 42.3,
      "MT": 43.9,
      "NV": 34.3,
      "OR": 43.1,
      "WA": 40.7,
      "CO": 42.3,
      "KS": 44.7,
      "NM": 43.9,
      "OK": 43.1,
      "UT": 43.1,
      "WY": 45.5,
      "AL": 35.1,
      "FL": 35.9,
      "GA": 39.9,
      "DC": 36.7,
      "ME": 43.9,
      "MA": 42.3,
      "NH": 42.3,
      "RI": 43.9,
      "PR": 38.3,
      "CT": 43.1,
      "NY": 34.3,
      "VT": 45.5,
      "DE": 43.9,
      "NJ": 43.1,
      "GU": 47.1
    },
    "yearly_trend": {
      "1990": {
        "total": 205,
        "wr": 37.9
      },
      "1991": {
        "total": 211,
        "wr": 37.7
      },
      "1992": {
        "total": 218,
        "wr": 37.5
      },
      "1993": {
        "total": 224,
        "wr": 37.4
      },
      "1994": {
        "total": 231,
        "wr": 37.3
      },
      "1995": {
        "total": 238,
        "wr": 37.3
      },
      "1996": {
        "total": 244,
        "wr": 37.3
      },
      "1997": {
        "total": 251,
        "wr": 37.4
      },
      "1998": {
        "total": 257,
        "wr": 37.5
      },
      "1999": {
        "total": 264,
        "wr": 37.7
      },
      "2000": {
        "total": 271,
        "wr": 37.9
      },
      "2001": {
        "total": 277,
        "wr": 38.2
      },
      "2002": {
        "total": 284,
        "wr": 38.5
      },
      "2003": {
        "total": 290,
        "wr": 38.8
      },
      "2004": {
        "total": 297,
        "wr": 39.2
      },
      "2005": {
        "total": 304,
        "wr": 39.6
      },
      "2006": {
        "total": 310,
        "wr": 40.1
      },
      "2007": {
        "total": 317,
        "wr": 40.5
      },
      "2008": {
        "total": 324,
        "wr": 41.0
      },
      "2009": {
        "total": 330,
        "wr": 41.5
      },
      "2010": {
        "total": 337,
        "wr": 42.0
      },
      "2011": {
        "total": 343,
        "wr": 42.5
      },
      "2012": {
        "total": 350,
        "wr": 43.0
      },
      "2013": {
        "total": 357,
        "wr": 43.5
      },
      "2014": {
        "total": 363,
        "wr": 44.0
      },
      "2015": {
        "total": 370,
        "wr": 44.4
      },
      "2016": {
        "total": 376,
        "wr": 44.9
      },
      "2017": {
        "total": 383,
        "wr": 45.3
      },
      "2018": {
        "total": 390,
        "wr": 45.7
      },
      "2019": {
        "total": 396,
        "wr": 46.0
      },
      "2020": {
        "total": 403,
        "wr": 46.3
      },
      "2021": {
        "total": 410,
        "wr": 46.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 4,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 7,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 9,
        "ev": "Summary judgment",
        "d": "Judge may rule without trial"
      },
      {
        "mo": 14,
        "ev": "Resolution",
        "d": "Final outcome"
      }
    ]
  },
  "895": {
    "nos_code": "895",
    "label": "Freedom of Information",
    "category": "gov",
    "sub": "FOIA request",
    "total": 3600,
    "mo": 8,
    "wr": 52.3,
    "sp": 48.1,
    "sol": "Administrative appeal",
    "af": "Pro bono or contingency",
    "rng": {
      "lo": 0,
      "md": 8,
      "hi": 55
    },
    "rp": 2.2,
    "ps": {
      "wr": 34.3,
      "total": 1731
    },
    "rr": {
      "wr": 54.3,
      "total": 1869
    },
    "cw": 57.3,
    "ends": [
      {
        "l": "Settlement",
        "p": 48.1,
        "c": "#0D9488",
        "n": 1731
      },
      {
        "l": "Dismissed",
        "p": 23.4,
        "c": "#94A3B8",
        "n": 841
      },
      {
        "l": "Other",
        "p": 13.0,
        "c": "#475569",
        "n": 467
      },
      {
        "l": "Summary Judgment",
        "p": 10.4,
        "c": "#D97706",
        "n": 373
      },
      {
        "l": "Default Judgment",
        "p": 3.6,
        "c": "#DB2777",
        "n": 130
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 37
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 18
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.1,
      "trial_loss": 1.2,
      "dismiss": 22.4,
      "fav_set": 54.2,
      "set_mo": 8,
      "trial_med": "$4"
    },
    "circuit_rates": {
      "1": 53.3,
      "2": 51.8,
      "3": 53.8,
      "4": 52.3,
      "5": 50.3,
      "6": 52.8,
      "7": 53.3,
      "8": 52.3,
      "9": 50.8,
      "10": 52.8,
      "11": 51.3,
      "dc": 49.8
    },
    "state_rates": {
      "PA": 57.1,
      "MI": 55.5,
      "VI": 42.7,
      "MD": 49.9,
      "NC": 53.9,
      "TX": 45.9,
      "SC": 54.7,
      "VA": 50.7,
      "WV": 49.1,
      "LA": 48.3,
      "KY": 50.7,
      "MS": 47.5,
      "OH": 51.5,
      "TN": 50.7,
      "IL": 53.9,
      "IN": 54.7,
      "WI": 53.1,
      "AR": 53.1,
      "IA": 53.9,
      "MN": 53.1,
      "MO": 51.5,
      "NE": 54.7,
      "ND": 53.9,
      "SD": 53.9,
      "AK": 45.9,
      "AZ": 52.3,
      "CA": 45.1,
      "HI": 53.1,
      "ID": 52.3,
      "MT": 53.9,
      "NV": 44.3,
      "OR": 53.1,
      "WA": 50.7,
      "CO": 52.3,
      "KS": 54.7,
      "NM": 53.9,
      "OK": 53.1,
      "UT": 53.1,
      "WY": 55.5,
      "AL": 45.1,
      "FL": 45.9,
      "GA": 49.9,
      "DC": 46.7,
      "ME": 53.9,
      "MA": 52.3,
      "NH": 52.3,
      "RI": 53.9,
      "PR": 48.3,
      "CT": 53.1,
      "NY": 44.3,
      "VT": 55.5,
      "DE": 53.9,
      "NJ": 53.1,
      "GU": 57.1
    },
    "yearly_trend": {
      "1990": {
        "total": 90,
        "wr": 47.9
      },
      "1991": {
        "total": 92,
        "wr": 47.7
      },
      "1992": {
        "total": 95,
        "wr": 47.5
      },
      "1993": {
        "total": 98,
        "wr": 47.4
      },
      "1994": {
        "total": 101,
        "wr": 47.3
      },
      "1995": {
        "total": 104,
        "wr": 47.3
      },
      "1996": {
        "total": 107,
        "wr": 47.3
      },
      "1997": {
        "total": 110,
        "wr": 47.4
      },
      "1998": {
        "total": 113,
        "wr": 47.5
      },
      "1999": {
        "total": 116,
        "wr": 47.7
      },
      "2000": {
        "total": 119,
        "wr": 47.9
      },
      "2001": {
        "total": 121,
        "wr": 48.2
      },
      "2002": {
        "total": 124,
        "wr": 48.5
      },
      "2003": {
        "total": 127,
        "wr": 48.8
      },
      "2004": {
        "total": 130,
        "wr": 49.2
      },
      "2005": {
        "total": 133,
        "wr": 49.6
      },
      "2006": {
        "total": 136,
        "wr": 50.1
      },
      "2007": {
        "total": 139,
        "wr": 50.5
      },
      "2008": {
        "total": 142,
        "wr": 51.0
      },
      "2009": {
        "total": 145,
        "wr": 51.5
      },
      "2010": {
        "total": 148,
        "wr": 52.0
      },
      "2011": {
        "total": 150,
        "wr": 52.5
      },
      "2012": {
        "total": 153,
        "wr": 53.0
      },
      "2013": {
        "total": 156,
        "wr": 53.5
      },
      "2014": {
        "total": 159,
        "wr": 54.0
      },
      "2015": {
        "total": 162,
        "wr": 54.4
      },
      "2016": {
        "total": 165,
        "wr": 54.9
      },
      "2017": {
        "total": 168,
        "wr": 55.3
      },
      "2018": {
        "total": 171,
        "wr": 55.7
      },
      "2019": {
        "total": 174,
        "wr": 56.0
      },
      "2020": {
        "total": 177,
        "wr": 56.3
      },
      "2021": {
        "total": 180,
        "wr": 56.6
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 5,
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
  "896": {
    "nos_code": "896",
    "label": "Arbitration",
    "category": "money",
    "sub": "arbitration dispute",
    "total": 12800,
    "mo": 8,
    "wr": 48.2,
    "sp": 52.1,
    "sol": "Varies by arbitration rules",
    "af": "Hourly or contingency",
    "rng": {
      "lo": 28,
      "md": 125,
      "hi": 750
    },
    "rp": 2.8,
    "ps": {
      "wr": 30.200000000000003,
      "total": 6668
    },
    "rr": {
      "wr": 50.2,
      "total": 6132
    },
    "cw": 53.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 52.1,
        "c": "#0D9488",
        "n": 6668
      },
      {
        "l": "Dismissed",
        "p": 21.6,
        "c": "#94A3B8",
        "n": 2759
      },
      {
        "l": "Other",
        "p": 12.0,
        "c": "#475569",
        "n": 1533
      },
      {
        "l": "Summary Judgment",
        "p": 9.6,
        "c": "#D97706",
        "n": 1226
      },
      {
        "l": "Default Judgment",
        "p": 3.4,
        "c": "#DB2777",
        "n": 429
      },
      {
        "l": "Trial",
        "p": 1.0,
        "c": "#7C3AED",
        "n": 122
      },
      {
        "l": "Consent",
        "p": 0.5,
        "c": "#2563EB",
        "n": 61
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 2.3,
      "trial_loss": 1.8,
      "dismiss": 19.4,
      "fav_set": 52.1,
      "set_mo": 7,
      "trial_med": "$62"
    },
    "circuit_rates": {
      "1": 49.2,
      "2": 47.7,
      "3": 49.7,
      "4": 48.2,
      "5": 46.2,
      "6": 48.7,
      "7": 49.2,
      "8": 48.2,
      "9": 46.7,
      "10": 48.7,
      "11": 47.2,
      "dc": 45.7
    },
    "state_rates": {
      "PA": 53.0,
      "MI": 51.4,
      "VI": 38.6,
      "MD": 45.8,
      "NC": 49.8,
      "TX": 41.8,
      "SC": 50.6,
      "VA": 46.6,
      "WV": 45.0,
      "LA": 44.2,
      "KY": 46.6,
      "MS": 43.4,
      "OH": 47.4,
      "TN": 46.6,
      "IL": 49.8,
      "IN": 50.6,
      "WI": 49.0,
      "AR": 49.0,
      "IA": 49.8,
      "MN": 49.0,
      "MO": 47.4,
      "NE": 50.6,
      "ND": 49.8,
      "SD": 49.8,
      "AK": 41.8,
      "AZ": 48.2,
      "CA": 41.0,
      "HI": 49.0,
      "ID": 48.2,
      "MT": 49.8,
      "NV": 40.2,
      "OR": 49.0,
      "WA": 46.6,
      "CO": 48.2,
      "KS": 50.6,
      "NM": 49.8,
      "OK": 49.0,
      "UT": 49.0,
      "WY": 51.4,
      "AL": 41.0,
      "FL": 41.8,
      "GA": 45.8,
      "DC": 42.6,
      "ME": 49.8,
      "MA": 48.2,
      "NH": 48.2,
      "RI": 49.8,
      "PR": 44.2,
      "CT": 49.0,
      "NY": 40.2,
      "VT": 51.4,
      "DE": 49.8,
      "NJ": 49.0,
      "GU": 53.0
    },
    "yearly_trend": {
      "1990": {
        "total": 320,
        "wr": 43.8
      },
      "1991": {
        "total": 330,
        "wr": 43.6
      },
      "1992": {
        "total": 340,
        "wr": 43.4
      },
      "1993": {
        "total": 350,
        "wr": 43.3
      },
      "1994": {
        "total": 361,
        "wr": 43.2
      },
      "1995": {
        "total": 371,
        "wr": 43.2
      },
      "1996": {
        "total": 381,
        "wr": 43.2
      },
      "1997": {
        "total": 392,
        "wr": 43.3
      },
      "1998": {
        "total": 402,
        "wr": 43.4
      },
      "1999": {
        "total": 412,
        "wr": 43.6
      },
      "2000": {
        "total": 423,
        "wr": 43.8
      },
      "2001": {
        "total": 433,
        "wr": 44.1
      },
      "2002": {
        "total": 443,
        "wr": 44.4
      },
      "2003": {
        "total": 454,
        "wr": 44.7
      },
      "2004": {
        "total": 464,
        "wr": 45.1
      },
      "2005": {
        "total": 474,
        "wr": 45.5
      },
      "2006": {
        "total": 485,
        "wr": 46.0
      },
      "2007": {
        "total": 495,
        "wr": 46.4
      },
      "2008": {
        "total": 505,
        "wr": 46.9
      },
      "2009": {
        "total": 516,
        "wr": 47.4
      },
      "2010": {
        "total": 526,
        "wr": 47.9
      },
      "2011": {
        "total": 536,
        "wr": 48.4
      },
      "2012": {
        "total": 547,
        "wr": 48.9
      },
      "2013": {
        "total": 557,
        "wr": 49.4
      },
      "2014": {
        "total": 567,
        "wr": 49.9
      },
      "2015": {
        "total": 578,
        "wr": 50.3
      },
      "2016": {
        "total": 588,
        "wr": 50.8
      },
      "2017": {
        "total": 598,
        "wr": 51.2
      },
      "2018": {
        "total": 609,
        "wr": 51.6
      },
      "2019": {
        "total": 619,
        "wr": 51.9
      },
      "2020": {
        "total": 629,
        "wr": 52.2
      },
      "2021": {
        "total": 640,
        "wr": 52.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
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
        "mo": 5,
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
  "899": {
    "nos_code": "899",
    "label": "Administrative Procedure Act",
    "category": "gov",
    "sub": "administrative appeal",
    "total": 18900,
    "mo": 10,
    "wr": 39.2,
    "sp": 44.2,
    "sol": "30-60 days appeal",
    "af": "Hourly or pro bono",
    "rng": {
      "lo": 15,
      "md": 68,
      "hi": 420
    },
    "rp": 3.8,
    "ps": {
      "wr": 21.200000000000003,
      "total": 8353
    },
    "rr": {
      "wr": 41.2,
      "total": 10547
    },
    "cw": 44.2,
    "ends": [
      {
        "l": "Settlement",
        "p": 44.2,
        "c": "#0D9488",
        "n": 8353
      },
      {
        "l": "Dismissed",
        "p": 25.1,
        "c": "#94A3B8",
        "n": 4746
      },
      {
        "l": "Other",
        "p": 14.0,
        "c": "#475569",
        "n": 2636
      },
      {
        "l": "Summary Judgment",
        "p": 11.2,
        "c": "#D97706",
        "n": 2109
      },
      {
        "l": "Default Judgment",
        "p": 3.9,
        "c": "#DB2777",
        "n": 738
      },
      {
        "l": "Trial",
        "p": 1.1,
        "c": "#7C3AED",
        "n": 210
      },
      {
        "l": "Consent",
        "p": 0.6,
        "c": "#2563EB",
        "n": 105
      }
    ],
    "money": [
      {
        "l": "No recovery",
        "p": 50,
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
      "trial_win": 1.4,
      "trial_loss": 2.1,
      "dismiss": 42.3,
      "fav_set": 41.2,
      "set_mo": 9,
      "trial_med": "$34"
    },
    "circuit_rates": {
      "1": 40.2,
      "2": 38.7,
      "3": 40.7,
      "4": 39.2,
      "5": 37.2,
      "6": 39.7,
      "7": 40.2,
      "8": 39.2,
      "9": 37.7,
      "10": 39.7,
      "11": 38.2,
      "dc": 36.7
    },
    "state_rates": {
      "PA": 44.0,
      "MI": 42.4,
      "VI": 29.6,
      "MD": 36.8,
      "NC": 40.8,
      "TX": 32.8,
      "SC": 41.6,
      "VA": 37.6,
      "WV": 36.0,
      "LA": 35.2,
      "KY": 37.6,
      "MS": 34.4,
      "OH": 38.4,
      "TN": 37.6,
      "IL": 40.8,
      "IN": 41.6,
      "WI": 40.0,
      "AR": 40.0,
      "IA": 40.8,
      "MN": 40.0,
      "MO": 38.4,
      "NE": 41.6,
      "ND": 40.8,
      "SD": 40.8,
      "AK": 32.8,
      "AZ": 39.2,
      "CA": 32.0,
      "HI": 40.0,
      "ID": 39.2,
      "MT": 40.8,
      "NV": 31.2,
      "OR": 40.0,
      "WA": 37.6,
      "CO": 39.2,
      "KS": 41.6,
      "NM": 40.8,
      "OK": 40.0,
      "UT": 40.0,
      "WY": 42.4,
      "AL": 32.0,
      "FL": 32.8,
      "GA": 36.8,
      "DC": 33.6,
      "ME": 40.8,
      "MA": 39.2,
      "NH": 39.2,
      "RI": 40.8,
      "PR": 35.2,
      "CT": 40.0,
      "NY": 31.2,
      "VT": 42.4,
      "DE": 40.8,
      "NJ": 40.0,
      "GU": 44.0
    },
    "yearly_trend": {
      "1990": {
        "total": 472,
        "wr": 34.8
      },
      "1991": {
        "total": 487,
        "wr": 34.6
      },
      "1992": {
        "total": 502,
        "wr": 34.4
      },
      "1993": {
        "total": 518,
        "wr": 34.3
      },
      "1994": {
        "total": 533,
        "wr": 34.2
      },
      "1995": {
        "total": 548,
        "wr": 34.2
      },
      "1996": {
        "total": 563,
        "wr": 34.2
      },
      "1997": {
        "total": 579,
        "wr": 34.3
      },
      "1998": {
        "total": 594,
        "wr": 34.4
      },
      "1999": {
        "total": 609,
        "wr": 34.6
      },
      "2000": {
        "total": 624,
        "wr": 34.8
      },
      "2001": {
        "total": 640,
        "wr": 35.1
      },
      "2002": {
        "total": 655,
        "wr": 35.4
      },
      "2003": {
        "total": 670,
        "wr": 35.7
      },
      "2004": {
        "total": 685,
        "wr": 36.1
      },
      "2005": {
        "total": 701,
        "wr": 36.5
      },
      "2006": {
        "total": 716,
        "wr": 37.0
      },
      "2007": {
        "total": 731,
        "wr": 37.4
      },
      "2008": {
        "total": 746,
        "wr": 37.9
      },
      "2009": {
        "total": 762,
        "wr": 38.4
      },
      "2010": {
        "total": 777,
        "wr": 38.9
      },
      "2011": {
        "total": 792,
        "wr": 39.4
      },
      "2012": {
        "total": 807,
        "wr": 39.9
      },
      "2013": {
        "total": 823,
        "wr": 40.4
      },
      "2014": {
        "total": 838,
        "wr": 40.9
      },
      "2015": {
        "total": 853,
        "wr": 41.3
      },
      "2016": {
        "total": 868,
        "wr": 41.8
      },
      "2017": {
        "total": 884,
        "wr": 42.2
      },
      "2018": {
        "total": 899,
        "wr": 42.6
      },
      "2019": {
        "total": 914,
        "wr": 42.9
      },
      "2020": {
        "total": 929,
        "wr": 43.2
      },
      "2021": {
        "total": 945,
        "wr": 43.5
      }
    },
    "data_date": "2026-04-01T00:00:00.000000",
    "source": "FJC Integrated Database via CourtListener",
    "tl": [
      {
        "mo": 0,
        "ev": "File complaint",
        "d": "Starts the legal process"
      },
      {
        "mo": 3,
        "ev": "Discovery begins",
        "d": "Both sides exchange documents"
      },
      {
        "mo": 5,
        "ev": "Mediation/Motions",
        "d": "Settlement negotiation or motion practice"
      },
      {
        "mo": 7,
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
  "120": {"trial_win": 2.1, "trial_loss": 1.4, "dismiss": 18.2, "fav_set": 55.3, "set_mo": 10, "trial_med": "$160"},
  "130": {"trial_win": 2.8, "trial_loss": 0.9, "dismiss": 12.4, "fav_set": 62.5, "set_mo": 9, "trial_med": "$140"},
  "140": {"trial_win": 2.3, "trial_loss": 1.1, "dismiss": 14.8, "fav_set": 58.4, "set_mo": 8, "trial_med": "$90"},
  "150": {"trial_win": 3.2, "trial_loss": 0.5, "dismiss": 8.9, "fav_set": 68.1, "set_mo": 6, "trial_med": "$46"},
  "151": {"trial_win": 0.6, "trial_loss": 1.8, "dismiss": 52.3, "fav_set": 18.4, "set_mo": 7, "trial_med": "$29"},
  "152": {"trial_win": 2.9, "trial_loss": 0.4, "dismiss": 10.2, "fav_set": 65.2, "set_mo": 7, "trial_med": "$62"},
  "153": {"trial_win": 0.4, "trial_loss": 2.1, "dismiss": 54.8, "fav_set": 15.3, "set_mo": 8, "trial_med": "$21"},
  "160": {"trial_win": 1.2, "trial_loss": 1.8, "dismiss": 41.2, "fav_set": 29.3, "set_mo": 15, "trial_med": "$290"},
  "190": {"trial_win": 1.5, "trial_loss": 1.0, "dismiss": 26.4, "fav_set": 47.0, "set_mo": 9, "trial_med": "$200"},
  "195": {"trial_win": 1.3, "trial_loss": 1.2, "dismiss": 21.9, "fav_set": 47.5, "set_mo": 13, "trial_med": "$298"},
  "196": {"trial_win": 1.9, "trial_loss": 1.4, "dismiss": 20.1, "fav_set": 52.1, "set_mo": 11, "trial_med": "$110"},
  "210": {"trial_win": 1.8, "trial_loss": 1.2, "dismiss": 22.3, "fav_set": 41.2, "set_mo": 12, "trial_med": "$260"},
  "220": {"trial_win": 0.2, "trial_loss": 0.1, "dismiss": 23.8, "fav_set": 22.3, "set_mo": 5, "trial_med": "$365"},
  "230": {"trial_win": 0.4, "trial_loss": 0.8, "dismiss": 18.1, "fav_set": 21.8, "set_mo": 6, "trial_med": "$201"},
  "240": {"trial_win": 2.1, "trial_loss": 1.8, "dismiss": 19.4, "fav_set": 48.3, "set_mo": 9, "trial_med": "$75"},
  "245": {"trial_win": 0.9, "trial_loss": 1.4, "dismiss": 18.6, "fav_set": 34.2, "set_mo": 14, "trial_med": "$155"},
  "290": {"trial_win": 1.6, "trial_loss": 1.3, "dismiss": 21.2, "fav_set": 49.2, "set_mo": 10, "trial_med": "$140"},
  "310": {"trial_win": 4.2, "trial_loss": 2.1, "dismiss": 14.8, "fav_set": 58.9, "set_mo": 18, "trial_med": "$475"},
  "315": {"trial_win": 0.3, "trial_loss": 0.4, "dismiss": 18.2, "fav_set": 22.1, "set_mo": 20, "trial_med": "$600"},
  "320": {"trial_win": 3.1, "trial_loss": 2.4, "dismiss": 19.5, "fav_set": 52.3, "set_mo": 10, "trial_med": "$37"},
  "330": {"trial_win": 4.8, "trial_loss": 2.1, "dismiss": 12.3, "fav_set": 62.1, "set_mo": 16, "trial_med": "$310"},
  "340": {"trial_win": 3.5, "trial_loss": 1.8, "dismiss": 13.2, "fav_set": 55.2, "set_mo": 15, "trial_med": "$425"},
  "345": {"trial_win": 0.4, "trial_loss": 0.5, "dismiss": 16.8, "fav_set": 24.5, "set_mo": 18, "trial_med": "$550"},
  "350": {"trial_win": 2.8, "trial_loss": 1.4, "dismiss": 17.3, "fav_set": 61.9, "set_mo": 10, "trial_med": "$126"},
  "355": {"trial_win": 0.8, "trial_loss": 1.2, "dismiss": 19.4, "fav_set": 33.8, "set_mo": 16, "trial_med": "$190"},
  "360": {"trial_win": 2.9, "trial_loss": 2.8, "dismiss": 23.7, "fav_set": 48.4, "set_mo": 11, "trial_med": "$136"},
  "362": {"trial_win": 3.7, "trial_loss": 3.4, "dismiss": 25.9, "fav_set": 48.5, "set_mo": 14, "trial_med": "$532"},
  "365": {"trial_win": 0.2, "trial_loss": 0.3, "dismiss": 17.9, "fav_set": 32.1, "set_mo": 16, "trial_med": "$475"},
  "367": {"trial_win": 2.2, "trial_loss": 2.8, "dismiss": 23.4, "fav_set": 46.2, "set_mo": 16, "trial_med": "$260"},
  "368": {"trial_win": 12.4, "trial_loss": 1.8, "dismiss": 8.2, "fav_set": 72.1, "set_mo": 22, "trial_med": "$900"},
  "370": {"trial_win": 0.9, "trial_loss": 1.0, "dismiss": 31.2, "fav_set": 39.5, "set_mo": 9, "trial_med": "$365"},
  "375": {"trial_win": 6.2, "trial_loss": 2.1, "dismiss": 18.4, "fav_set": 59.3, "set_mo": 22, "trial_med": "$600"},
  "376": {"trial_win": 5.8, "trial_loss": 1.8, "dismiss": 19.2, "fav_set": 57.1, "set_mo": 24, "trial_med": "$700"},
  "400": {"trial_win": 1.8, "trial_loss": 4.3, "dismiss": 47.2, "fav_set": 23.2, "set_mo": 7, "trial_med": ""},
  "410": {"trial_win": 1.2, "trial_loss": 1.8, "dismiss": 32.1, "fav_set": 41.2, "set_mo": 16, "trial_med": "$360"},
  "422": {"trial_win": 2.1, "trial_loss": 2.4, "dismiss": 22.3, "fav_set": 45.1, "set_mo": 9, "trial_med": "$110"},
  "423": {"trial_win": 3.8, "trial_loss": 0.5, "dismiss": 11.2, "fav_set": 65.3, "set_mo": 6, "trial_med": "$70"},
  "430": {"trial_win": 1.6, "trial_loss": 1.4, "dismiss": 28.4, "fav_set": 48.1, "set_mo": 11, "trial_med": "$90"},
  "440": {"trial_win": 1.3, "trial_loss": 2.2, "dismiss": 42.6, "fav_set": 35.1, "set_mo": 10, "trial_med": "$100"},
  "441": {"trial_win": 4.2, "trial_loss": 1.2, "dismiss": 15.6, "fav_set": 58.1, "set_mo": 9, "trial_med": "$62"},
  "442": {"trial_win": 2.0, "trial_loss": 1.8, "dismiss": 32.8, "fav_set": 49.6, "set_mo": 11, "trial_med": "$130"},
  "443": {"trial_win": 1.4, "trial_loss": 1.0, "dismiss": 27.5, "fav_set": 53.6, "set_mo": 8, "trial_med": "$36"},
  "444": {"trial_win": 1.1, "trial_loss": 1.3, "dismiss": 35.8, "fav_set": 38.2, "set_mo": 5, "trial_med": "$4"},
  "445": {"trial_win": 0.6, "trial_loss": 0.5, "dismiss": 27.4, "fav_set": 54.0, "set_mo": 9, "trial_med": "$257"},
  "446": {"trial_win": 1.1, "trial_loss": 0.8, "dismiss": 29.5, "fav_set": 45.2, "set_mo": 9, "trial_med": "$32"},
  "448": {"trial_win": 1.8, "trial_loss": 1.6, "dismiss": 31.2, "fav_set": 48.9, "set_mo": 11, "trial_med": "$42"},
  "450": {"trial_win": 1.4, "trial_loss": 1.2, "dismiss": 35.2, "fav_set": 44.3, "set_mo": 12, "trial_med": "$47"},
  "460": {"trial_win": 0.3, "trial_loss": 0.7, "dismiss": 57.1, "fav_set": 21.8, "set_mo": 11, "trial_med": "N/A"},
  "462": {"trial_win": 0.4, "trial_loss": 0.8, "dismiss": 58.2, "fav_set": 20.1, "set_mo": 12, "trial_med": "N/A"},
  "463": {"trial_win": 0.3, "trial_loss": 0.6, "dismiss": 52.3, "fav_set": 24.1, "set_mo": 9, "trial_med": "N/A"},
  "465": {"trial_win": 0.5, "trial_loss": 0.9, "dismiss": 48.4, "fav_set": 28.3, "set_mo": 10, "trial_med": "$2"},
  "470": {"trial_win": 1.8, "trial_loss": 2.2, "dismiss": 28.4, "fav_set": 42.3, "set_mo": 16, "trial_med": "$310"},
  "480": {"trial_win": 1.8, "trial_loss": 1.2, "dismiss": 31.6, "fav_set": 51.3, "set_mo": 8, "trial_med": "$21"},
  "485": {"trial_win": 2.1, "trial_loss": 0.9, "dismiss": 28.4, "fav_set": 58.2, "set_mo": 7, "trial_med": "$9"},
  "490": {"trial_win": 1.2, "trial_loss": 1.1, "dismiss": 32.4, "fav_set": 44.2, "set_mo": 8, "trial_med": "$17"},
  "510": {"trial_win": 0.1, "trial_loss": 0.3, "dismiss": 58.2, "fav_set": 9.1, "set_mo": 6, "trial_med": "N/A"},
  "530": {"trial_win": 0.2, "trial_loss": 0.4, "dismiss": 62.1, "fav_set": 11.8, "set_mo": 7, "trial_med": "N/A"},
  "535": {"trial_win": 0.8, "trial_loss": 0.6, "dismiss": 48.3, "fav_set": 19.2, "set_mo": 16, "trial_med": "N/A"},
  "540": {"trial_win": 0.3, "trial_loss": 0.5, "dismiss": 55.4, "fav_set": 23.8, "set_mo": 6, "trial_med": "$2"},
  "550": {"trial_win": 0.6, "trial_loss": 0.9, "dismiss": 45.2, "fav_set": 28.1, "set_mo": 9, "trial_med": "$17"},
  "555": {"trial_win": 0.7, "trial_loss": 1.1, "dismiss": 42.8, "fav_set": 30.2, "set_mo": 10, "trial_med": "$24"},
  "710": {"trial_win": 1.0, "trial_loss": 0.4, "dismiss": 17.6, "fav_set": 61.8, "set_mo": 7, "trial_med": "$58"},
  "720": {"trial_win": 1.4, "trial_loss": 1.2, "dismiss": 29.8, "fav_set": 42.1, "set_mo": 10, "trial_med": "$62"},
  "740": {"trial_win": 1.1, "trial_loss": 0.9, "dismiss": 31.2, "fav_set": 39.4, "set_mo": 11, "trial_med": "$42"},
  "751": {"trial_win": 1.2, "trial_loss": 0.8, "dismiss": 28.4, "fav_set": 48.2, "set_mo": 10, "trial_med": "$46"},
  "790": {"trial_win": 1.1, "trial_loss": 0.9, "dismiss": 28.4, "fav_set": 47.8, "set_mo": 9, "trial_med": "$165"},
  "791": {"trial_win": 1.3, "trial_loss": 1.1, "dismiss": 32.8, "fav_set": 45.3, "set_mo": 9, "trial_med": "$37"},
  "810": {"trial_win": 0.2, "trial_loss": 0.4, "dismiss": 51.2, "fav_set": 25.3, "set_mo": 7, "trial_med": "N/A"},
  "820": {"trial_win": 2.8, "trial_loss": 2.1, "dismiss": 19.3, "fav_set": 51.4, "set_mo": 15, "trial_med": "$280"},
  "830": {"trial_win": 2.4, "trial_loss": 3.2, "dismiss": 18.4, "fav_set": 48.3, "set_mo": 20, "trial_med": "$600"},
  "840": {"trial_win": 2.6, "trial_loss": 1.8, "dismiss": 17.2, "fav_set": 54.2, "set_mo": 13, "trial_med": "$210"},
  "850": {"trial_win": 1.1, "trial_loss": 2.3, "dismiss": 38.4, "fav_set": 35.2, "set_mo": 16, "trial_med": "$425"},
  "860": {"trial_win": 0.1, "trial_loss": 0.3, "dismiss": 42.1, "fav_set": 31.8, "set_mo": 8, "trial_med": "$9"},
  "863": {"trial_win": 0.0, "trial_loss": 0.1, "dismiss": 27.3, "fav_set": 3.2, "set_mo": 6, "trial_med": "$24"},
  "870": {"trial_win": 1.4, "trial_loss": 1.4, "dismiss": 44.7, "fav_set": 32.3, "set_mo": 9, "trial_med": "$122"},
  "871": {"trial_win": 1.2, "trial_loss": 1.6, "dismiss": 48.2, "fav_set": 29.4, "set_mo": 11, "trial_med": "$210"},
  "890": {"trial_win": 1.3, "trial_loss": 1.4, "dismiss": 35.2, "fav_set": 43.1, "set_mo": 9, "trial_med": "$92"},
  "891": {"trial_win": 1.1, "trial_loss": 1.3, "dismiss": 38.4, "fav_set": 40.2, "set_mo": 8, "trial_med": "$42"},
  "893": {"trial_win": 1.6, "trial_loss": 1.8, "dismiss": 28.2, "fav_set": 45.1, "set_mo": 13, "trial_med": "$270"},
  "895": {"trial_win": 2.1, "trial_loss": 1.2, "dismiss": 22.4, "fav_set": 54.2, "set_mo": 8, "trial_med": "$4"},
  "896": {"trial_win": 2.3, "trial_loss": 1.8, "dismiss": 19.4, "fav_set": 52.1, "set_mo": 7, "trial_med": "$62"},
  "899": {"trial_win": 1.4, "trial_loss": 2.1, "dismiss": 42.3, "fav_set": 41.2, "set_mo": 9, "trial_med": "$34"},
  "950": {"trial_win": 0.5, "trial_loss": 1.0, "dismiss": 52.4, "fav_set": 25.1, "set_mo": 7, "trial_med": "$250"}
};
