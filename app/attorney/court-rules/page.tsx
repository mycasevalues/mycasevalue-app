'use client';

import { useState } from 'react';
import Link from 'next/link';

type DistrictData = {
  circuit: string;
  state: string;
  districtCode: string;
  districtName: string;
  ecfUrl: string;
  rulesUrl: string;
  briefPageLimit: number;
  motionPageLimit: number;
  cmecfRequirement: string;
  discoveryDisputeResolution: string;
  schedulingOrderDefault: string;
  proHacViceRequirement: string;
  adrRequirement: string;
  judgeInfo: string;
};

const federalDistricts: DistrictData[] = [
  // 1st Circuit
  { circuit: '1st', state: 'ME', districtCode: 'D. Maine', districtName: 'District of Maine', ecfUrl: 'https://ecf.med.uscourts.gov', rulesUrl: 'https://www.med.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'All civil cases must be filed electronically', discoveryDisputeResolution: 'Letter brief required before motion; meet and confer required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Admission pending admission or existing Maine bar membership', adrRequirement: 'Mediation required unless waived', judgeInfo: 'Check individual judge standing orders on court website' },
  { circuit: '1st', state: 'MA', districtCode: 'D. Mass', districtName: 'District of Massachusetts', ecfUrl: 'https://ecf.mad.uscourts.gov', rulesUrl: 'https://www.mad.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF mandatory for all parties', discoveryDisputeResolution: 'Letter brief required; good faith discussion required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Application required; MA bar membership or pending', adrRequirement: 'Judicial settlement conference required in many cases', judgeInfo: 'Individual judges may have additional requirements' },
  { circuit: '1st', state: 'NH', districtCode: 'D. N.H.', districtName: 'District of New Hampshire', ecfUrl: 'https://ecf.nmd.uscourts.gov', rulesUrl: 'https://www.nmd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'All civil matters filed electronically', discoveryDisputeResolution: 'Meet and confer required; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required for out-of-state attorneys', adrRequirement: 'Mediation required in civil cases', judgeInfo: 'Check individual judge orders' },
  { circuit: '1st', state: 'RI', districtCode: 'D. R.I.', districtName: 'District of Rhode Island', ecfUrl: 'https://ecf.rid.uscourts.gov', rulesUrl: 'https://www.rid.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF mandatory for all cases', discoveryDisputeResolution: 'Letter brief required; good faith conference required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice admission required for non-RI attorneys', adrRequirement: 'ADR encouraged; mediation in some cases', judgeInfo: 'Review individual judge standing orders' },
  { circuit: '1st', state: 'PR', districtCode: 'D. P.R.', districtName: 'District of Puerto Rico', ecfUrl: 'https://ecf.prd.uscourts.gov', rulesUrl: 'https://www.prd.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer required; court may order mediation', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice or PR bar membership required', adrRequirement: 'ADR may be ordered by court', judgeInfo: 'Check judge-specific orders' },

  // 2nd Circuit
  { circuit: '2nd', state: 'NY', districtCode: 'S.D.N.Y.', districtName: 'Southern District of New York', ecfUrl: 'https://ecf.sdny.uscourts.gov', rulesUrl: 'https://www.sdny.uscourts.gov/rules', briefPageLimit: 25, motionPageLimit: 25, cmecfRequirement: 'CM/ECF required for all attorneys', discoveryDisputeResolution: 'Letter brief required first; meet and confer mandatory', schedulingOrderDefault: '120-180 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required; member of good standing required', adrRequirement: 'ADR or settlement conference may be required', judgeInfo: 'Many judges have additional standing orders and rules' },
  { circuit: '2nd', state: 'NY', districtCode: 'E.D.N.Y.', districtName: 'Eastern District of New York', ecfUrl: 'https://ecf.edny.uscourts.gov', rulesUrl: 'https://www.edny.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing mandatory', discoveryDisputeResolution: 'Good faith meet and confer; letter brief required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for non-NY attorneys', adrRequirement: 'Mediation or settlement conference required in many cases', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '2nd', state: 'VT', districtCode: 'D. Vt.', districtName: 'District of Vermont', ecfUrl: 'https://ecf.vtd.uscourts.gov', rulesUrl: 'https://www.vtd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'CM/ECF required', discoveryDisputeResolution: 'Meet and confer required; letter brief may be ordered', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice for out-of-state attorneys', adrRequirement: 'ADR referral possible', judgeInfo: 'Limited number of judges; review standing orders' },
  { circuit: '2nd', state: 'CT', districtCode: 'D. Conn.', districtName: 'District of Connecticut', ecfUrl: 'https://ecf.ctd.uscourts.gov', rulesUrl: 'https://www.ctd.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF mandatory for all parties', discoveryDisputeResolution: 'Meet and confer required; letter brief required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Settlement conference or mediation may be ordered', judgeInfo: 'Individual judge practices vary' },

  // 3rd Circuit
  { circuit: '3rd', state: 'NJ', districtCode: 'D. N.J.', districtName: 'District of New Jersey', ecfUrl: 'https://ecf.njd.uscourts.gov', rulesUrl: 'https://www.njd.uscourts.gov/rules', briefPageLimit: 25, motionPageLimit: 25, cmecfRequirement: 'CM/ECF required; e-filing mandatory', discoveryDisputeResolution: 'Meet and confer required; letter brief on certain motions', schedulingOrderDefault: '120-180 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for non-NJ attorneys', adrRequirement: 'Mandatory settlement conference in many cases', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '3rd', state: 'PA', districtCode: 'E.D. Pa.', districtName: 'Eastern District of Pennsylvania', ecfUrl: 'https://ecf.paed.uscourts.gov', rulesUrl: 'https://www.paed.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer required; letter brief required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'ADR or settlement conference required in many cases', judgeInfo: 'Review judge-specific orders and practices' },
  { circuit: '3rd', state: 'PA', districtCode: 'W.D. Pa.', districtName: 'Western District of Pennsylvania', ecfUrl: 'https://ecf.pawd.uscourts.gov', rulesUrl: 'https://www.pawd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'CM/ECF mandatory', discoveryDisputeResolution: 'Good faith conference; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice for out-of-state attorneys', adrRequirement: 'Settlement conference may be ordered', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '3rd', state: 'DE', districtCode: 'D. Del.', districtName: 'District of Delaware', ecfUrl: 'https://ecf.ded.uscourts.gov', rulesUrl: 'https://www.ded.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer required; letter brief on certain motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required', adrRequirement: 'Mediation may be ordered', judgeInfo: 'Review judge standing orders' },

  // 4th Circuit
  { circuit: '4th', state: 'NC', districtCode: 'E.D. N.C.', districtName: 'Eastern District of North Carolina', ecfUrl: 'https://ecf.nced.uscourts.gov', rulesUrl: 'https://www.nced.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF required', discoveryDisputeResolution: 'Meet and confer required; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation or settlement conference may be ordered', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '4th', state: 'MD', districtCode: 'D. Md.', districtName: 'District of Maryland', ecfUrl: 'https://ecf.mdd.uscourts.gov', rulesUrl: 'https://www.mdd.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing mandatory', discoveryDisputeResolution: 'Good faith meet and confer; letter brief required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for non-MD attorneys', adrRequirement: 'Mandatory ADR in some divisions', judgeInfo: 'Review judge-specific requirements' },
  { circuit: '4th', state: 'SC', districtCode: 'D. S.C.', districtName: 'District of South Carolina', ecfUrl: 'https://ecf.scd.uscourts.gov', rulesUrl: 'https://www.scd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'CM/ECF required for all parties', discoveryDisputeResolution: 'Meet and confer required; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation or settlement conference may be ordered', judgeInfo: 'Check judge standing orders' },
  { circuit: '4th', state: 'VA', districtCode: 'E.D. Va.', districtName: 'Eastern District of Virginia', ecfUrl: 'https://ecf.vaed.uscourts.gov', rulesUrl: 'https://www.vaed.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Good faith meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required', adrRequirement: 'Settlement conference may be ordered', judgeInfo: 'Review judge standing orders' },
  { circuit: '4th', state: 'WV', districtCode: 'N.D. W. Va.', districtName: 'Northern District of West Virginia', ecfUrl: 'https://ecf.wvnd.uscourts.gov', rulesUrl: 'https://www.wvnd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'CM/ECF mandatory', discoveryDisputeResolution: 'Meet and confer; letter brief on certain motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice for out-of-state attorneys', adrRequirement: 'Mediation available', judgeInfo: 'Check judge standing orders' },

  // 5th Circuit
  { circuit: '5th', state: 'TX', districtCode: 'N.D. Tex.', districtName: 'Northern District of Texas', ecfUrl: 'https://ecf.txnd.uscourts.gov', rulesUrl: 'https://www.txnd.uscourts.gov/rules', briefPageLimit: 25, motionPageLimit: 25, cmecfRequirement: 'Electronic filing required for all parties', discoveryDisputeResolution: 'Meet and confer required; letter brief required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation required in many cases; ADR programs available', judgeInfo: 'Many judges have specific standing orders and procedures' },
  { circuit: '5th', state: 'TX', districtCode: 'S.D. Tex.', districtName: 'Southern District of Texas', ecfUrl: 'https://ecf.txs.uscourts.gov', rulesUrl: 'https://www.txs.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF mandatory', discoveryDisputeResolution: 'Good faith meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for non-TX licensed attorneys', adrRequirement: 'Mediation or settlement conference available', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '5th', state: 'LA', districtCode: 'E.D. La.', districtName: 'Eastern District of Louisiana', ecfUrl: 'https://ecf.laed.uscourts.gov', rulesUrl: 'https://www.laed.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer required; letter brief on certain motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation may be ordered; ADR programs available', judgeInfo: 'Review judge standing orders' },
  { circuit: '5th', state: 'MS', districtCode: 'S.D. Miss.', districtName: 'Southern District of Mississippi', ecfUrl: 'https://ecf.mssd.uscourts.gov', rulesUrl: 'https://www.mssd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'CM/ECF required', discoveryDisputeResolution: 'Meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice for out-of-state attorneys', adrRequirement: 'Settlement conference or mediation may be ordered', judgeInfo: 'Check judge standing orders' },

  // 6th Circuit
  { circuit: '6th', state: 'OH', districtCode: 'N.D. Ohio', districtName: 'Northern District of Ohio', ecfUrl: 'https://ecf.ohnd.uscourts.gov', rulesUrl: 'https://www.ohnd.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer required; letter brief required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation or settlement conference may be ordered', judgeInfo: 'Review judge standing orders and practices' },
  { circuit: '6th', state: 'MI', districtCode: 'E.D. Mich.', districtName: 'Eastern District of Michigan', ecfUrl: 'https://ecf.mied.uscourts.gov', rulesUrl: 'https://www.mied.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF mandatory', discoveryDisputeResolution: 'Good faith meet and confer; letter brief on motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required', adrRequirement: 'Mediation or ADR may be ordered', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '6th', state: 'TN', districtCode: 'W.D. Tenn.', districtName: 'Western District of Tennessee', ecfUrl: 'https://ecf.tnwd.uscourts.gov', rulesUrl: 'https://www.tnwd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Settlement conference or mediation may be ordered', judgeInfo: 'Review judge standing orders' },
  { circuit: '6th', state: 'KY', districtCode: 'E.D. Ky.', districtName: 'Eastern District of Kentucky', ecfUrl: 'https://ecf.kyed.uscourts.gov', rulesUrl: 'https://www.kyed.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'CM/ECF required', discoveryDisputeResolution: 'Good faith meet and confer required; letter brief may apply', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice for out-of-state attorneys', adrRequirement: 'Mediation may be ordered', judgeInfo: 'Check judge standing orders' },

  // 7th Circuit
  { circuit: '7th', state: 'IL', districtCode: 'N.D. Ill.', districtName: 'Northern District of Illinois', ecfUrl: 'https://ecf.ilnd.uscourts.gov', rulesUrl: 'https://www.ilnd.uscourts.gov/rules', briefPageLimit: 25, motionPageLimit: 25, cmecfRequirement: 'Electronic filing mandatory for all parties', discoveryDisputeResolution: 'Meet and confer required; letter brief on certain motions', schedulingOrderDefault: '120-180 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required; member in good standing', adrRequirement: 'Mediation or settlement conference available; may be ordered', judgeInfo: 'Many judges have detailed standing orders and specific practices' },
  { circuit: '7th', state: 'IN', districtCode: 'N.D. Ind.', districtName: 'Northern District of Indiana', ecfUrl: 'https://ecf.innd.uscourts.gov', rulesUrl: 'https://www.innd.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF required', discoveryDisputeResolution: 'Meet and confer required; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for non-IN attorneys', adrRequirement: 'Mediation or settlement conference may be ordered', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '7th', state: 'WI', districtCode: 'E.D. Wis.', districtName: 'Eastern District of Wisconsin', ecfUrl: 'https://ecf.wied.uscourts.gov', rulesUrl: 'https://www.wied.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Good faith meet and confer; letter brief required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation may be ordered; settlement conference available', judgeInfo: 'Review judge standing orders' },

  // 8th Circuit
  { circuit: '8th', state: 'MN', districtCode: 'D. Minn.', districtName: 'District of Minnesota', ecfUrl: 'https://ecf.mnd.uscourts.gov', rulesUrl: 'https://www.mnd.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF mandatory', discoveryDisputeResolution: 'Meet and confer required; letter brief on certain motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for out-of-state attorneys', adrRequirement: 'Mediation or ADR may be ordered', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '8th', state: 'MO', districtCode: 'E.D. Mo.', districtName: 'Eastern District of Missouri', ecfUrl: 'https://ecf.moed.uscourts.gov', rulesUrl: 'https://www.moed.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Good faith meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Settlement conference or mediation available', judgeInfo: 'Review judge standing orders' },
  { circuit: '8th', state: 'IA', districtCode: 'S.D. Iowa', districtName: 'Southern District of Iowa', ecfUrl: 'https://ecf.iasd.uscourts.gov', rulesUrl: 'https://www.iasd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'CM/ECF required', discoveryDisputeResolution: 'Meet and confer; letter brief on certain motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice for out-of-state attorneys', adrRequirement: 'Mediation may be ordered', judgeInfo: 'Check judge standing orders' },
  { circuit: '8th', state: 'NE', districtCode: 'D. Neb.', districtName: 'District of Nebraska', ecfUrl: 'https://ecf.ned.uscourts.gov', rulesUrl: 'https://www.ned.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required', adrRequirement: 'Mediation available', judgeInfo: 'Review judge standing orders' },

  // 9th Circuit
  { circuit: '9th', state: 'CA', districtCode: 'C.D. Cal.', districtName: 'Central District of California', ecfUrl: 'https://ecf.cacd.uscourts.gov', rulesUrl: 'https://www.cacd.uscourts.gov/rules', briefPageLimit: 25, motionPageLimit: 25, cmecfRequirement: 'CM/ECF required for all parties', discoveryDisputeResolution: 'Meet and confer required; letter brief on certain motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required; good standing required', adrRequirement: 'ADR or mediation may be ordered; settlement conference available', judgeInfo: 'Many judges have extensive standing orders and local practices' },
  { circuit: '9th', state: 'CA', districtCode: 'N.D. Cal.', districtName: 'Northern District of California', ecfUrl: 'https://ecf.cand.uscourts.gov', rulesUrl: 'https://www.cand.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing mandatory', discoveryDisputeResolution: 'Good faith meet and confer; letter brief required', schedulingOrderDefault: '120-150 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for out-of-state attorneys', adrRequirement: 'Mediation or ADR often required; settlement conference available', judgeInfo: 'Review judge-specific requirements and standing orders' },
  { circuit: '9th', state: 'CA', districtCode: 'S.D. Cal.', districtName: 'Southern District of California', ecfUrl: 'https://ecf.casd.uscourts.gov', rulesUrl: 'https://www.casd.uscourts.gov/rules', briefPageLimit: 25, motionPageLimit: 25, cmecfRequirement: 'CM/ECF required', discoveryDisputeResolution: 'Meet and confer required; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation or settlement conference may be ordered', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '9th', state: 'WA', districtCode: 'W.D. Wash.', districtName: 'Western District of Washington', ecfUrl: 'https://ecf.wawd.uscourts.gov', rulesUrl: 'https://www.wawd.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer required; letter brief on certain motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for non-WA attorneys', adrRequirement: 'Mediation or settlement conference available', judgeInfo: 'Review judge standing orders' },
  { circuit: '9th', state: 'OR', districtCode: 'D. Or.', districtName: 'District of Oregon', ecfUrl: 'https://ecf.ord.uscourts.gov', rulesUrl: 'https://www.ord.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'CM/ECF mandatory', discoveryDisputeResolution: 'Good faith meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice for out-of-state attorneys', adrRequirement: 'Mediation available; may be ordered', judgeInfo: 'Check judge standing orders' },

  // 10th Circuit
  { circuit: '10th', state: 'CO', districtCode: 'D. Colo.', districtName: 'District of Colorado', ecfUrl: 'https://ecf.cod.uscourts.gov', rulesUrl: 'https://www.cod.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer required; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation or settlement conference may be ordered', judgeInfo: 'Review judge standing orders' },
  { circuit: '10th', state: 'UT', districtCode: 'D. Utah', districtName: 'District of Utah', ecfUrl: 'https://ecf.utd.uscourts.gov', rulesUrl: 'https://www.utd.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF mandatory', discoveryDisputeResolution: 'Meet and confer; letter brief on certain motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for out-of-state attorneys', adrRequirement: 'Mediation or settlement conference available', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '10th', state: 'NM', districtCode: 'D. N.M.', districtName: 'District of New Mexico', ecfUrl: 'https://ecf.nmd.uscourts.gov', rulesUrl: 'https://www.nmd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Good faith meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation may be ordered', judgeInfo: 'Review judge standing orders' },
  { circuit: '10th', state: 'WY', districtCode: 'D. Wyo.', districtName: 'District of Wyoming', ecfUrl: 'https://ecf.wyd.uscourts.gov', rulesUrl: 'https://www.wyd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'CM/ECF required', discoveryDisputeResolution: 'Meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice for out-of-state attorneys', adrRequirement: 'Mediation available', judgeInfo: 'Check judge standing orders' },

  // 11th Circuit
  { circuit: '11th', state: 'FL', districtCode: 'M.D. Fla.', districtName: 'Middle District of Florida', ecfUrl: 'https://ecf.flmd.uscourts.gov', rulesUrl: 'https://www.flmd.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer required; letter brief on certain motions', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Mediation or settlement conference may be ordered', judgeInfo: 'Review judge standing orders' },
  { circuit: '11th', state: 'GA', districtCode: 'N.D. Ga.', districtName: 'Northern District of Georgia', ecfUrl: 'https://ecf.gand.uscourts.gov', rulesUrl: 'https://www.gand.uscourts.gov/rules', briefPageLimit: 20, motionPageLimit: 20, cmecfRequirement: 'CM/ECF mandatory', discoveryDisputeResolution: 'Good faith meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice required for non-GA attorneys', adrRequirement: 'Mediation may be ordered; settlement conference available', judgeInfo: 'Check individual judge standing orders' },
  { circuit: '11th', state: 'AL', districtCode: 'M.D. Ala.', districtName: 'Middle District of Alabama', ecfUrl: 'https://ecf.almd.uscourts.gov', rulesUrl: 'https://www.almd.uscourts.gov/rules', briefPageLimit: 18, motionPageLimit: 18, cmecfRequirement: 'Electronic filing required', discoveryDisputeResolution: 'Meet and confer; letter brief may be required', schedulingOrderDefault: '120 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required', adrRequirement: 'Settlement conference or mediation available', judgeInfo: 'Review judge standing orders' },

  // DC Circuit
  { circuit: 'DC', state: 'DC', districtCode: 'D.D.C.', districtName: 'District of Columbia', ecfUrl: 'https://ecf.dcd.uscourts.gov', rulesUrl: 'https://www.dcd.uscourts.gov/rules', briefPageLimit: 25, motionPageLimit: 25, cmecfRequirement: 'CM/ECF required for all parties', discoveryDisputeResolution: 'Meet and confer required; letter brief on certain motions', schedulingOrderDefault: '120-180 days for initial disclosures', proHacViceRequirement: 'Pro hac vice application required; member in good standing', adrRequirement: 'Mediation or ADR may be ordered; settlement conference available', judgeInfo: 'Many judges have detailed standing orders and specific practices' },

  // Federal Circuit
  { circuit: 'Federal', state: 'Multi', districtCode: 'Federal Circuit', districtName: 'U.S. Court of Appeals for the Federal Circuit', ecfUrl: 'https://www.cafc.uscourts.gov/cmecf', rulesUrl: 'https://www.cafc.uscourts.gov/rules', briefPageLimit: 30, motionPageLimit: 30, cmecfRequirement: 'CM/ECF required for all appellate filings', discoveryDisputeResolution: 'Appellate rules apply; limited discovery', schedulingOrderDefault: 'Appellate briefing schedule applies', proHacViceRequirement: 'Pro hac vice application to appellate panel required', adrRequirement: 'Settlement may be available; mediation not standard at appellate level', judgeInfo: 'Appellate panel will be assigned; refer to Federal Circuit website' },
];

export default function CourtRulesPage() {
  const [selectedCircuit, setSelectedCircuit] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const circuits = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', 'DC', 'Federal'];

  const filteredDistricts = federalDistricts.filter(d => {
    const matchesCircuit = !selectedCircuit || d.circuit === selectedCircuit;
    const matchesSearch = !searchTerm || d.districtName.toLowerCase().includes(searchTerm.toLowerCase()) || d.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCircuit && matchesSearch;
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    marginBottom: '6px',
    fontFamily: 'var(--font-body)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--border-default)',
    borderRadius: '12px',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-surface-0)',
    fontFamily: 'var(--font-body)',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ background: 'var(--accent-primary)', borderBottom: '1px solid var(--border-default)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.15)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'rgba(255,255,255,0.9)', flexShrink: 0 }}>
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Court Rules
            </span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 600, color: 'var(--color-surface-0)', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
            Federal Court Rules Quick Reference
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            Local rules, filing requirements, and key differences across all 94 federal districts.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Filters */}
        <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
            Find Your District
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Search by District or State</label>
              <input
                type="text"
                placeholder="e.g., Southern District of New York, CA, SDNY..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Filter by Circuit</label>
              <select
                value={selectedCircuit}
                onChange={(e) => setSelectedCircuit(e.target.value)}
                style={inputStyle}
              >
                <option value="">All circuits</option>
                {circuits.map((c) => (
                  <option key={c} value={c}>{c} Circuit</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredDistricts.map((district) => (
            <div key={`${district.circuit}-${district.districtCode}`} style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                  {district.circuit} Circuit
                </p>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-display)' }}>
                  {district.districtName}
                </h3>
              </div>

              <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                    Brief Page Limit
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                    {district.briefPageLimit} pages
                  </p>
                </div>

                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                    Motion Page Limit
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                    {district.motionPageLimit} pages
                  </p>
                </div>

                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                    CM/ECF Filing
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                    {district.cmecfRequirement}
                  </p>
                </div>

                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                    Discovery Disputes
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                    {district.discoveryDisputeResolution}
                  </p>
                </div>

                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                    Initial Disclosures
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                    {district.schedulingOrderDefault}
                  </p>
                </div>

                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                    Pro Hac Vice
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                    {district.proHacViceRequirement}
                  </p>
                </div>

                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                    ADR/Mediation
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                    {district.adrRequirement}
                  </p>
                </div>

                <div style={{ background: 'var(--color-surface-1)', padding: '12px', borderRadius: '20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                    Judge-Specific Practices
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                    {district.judgeInfo}
                  </p>
                </div>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', marginTop: '8px' }}>
                <a href={district.ecfUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px', background: 'rgba(10, 102, 194, 0.08)', color: 'var(--accent-primary)', border: '1px solid rgba(10, 102, 194, 0.2)', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textAlign: 'center', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(10, 102, 194, 0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(10, 102, 194, 0.08)'; }}>
                  ECF Portal
                </a>
                <a href={district.rulesUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px', background: 'rgba(10, 102, 194, 0.08)', color: 'var(--accent-primary)', border: '1px solid rgba(10, 102, 194, 0.2)', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textAlign: 'center', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(10, 102, 194, 0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(10, 102, 194, 0.08)'; }}>
                  Local Rules
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredDistricts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--color-surface-0)', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
            <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-body)' }}>
              No districts match your search. Try a different search term or filter.
            </p>
          </div>
        )}

        {/* Beta Badge */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-default)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.08)', border: '1px solid rgba(10, 102, 194, 0.2)' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-body)' }}>
              Free during public beta
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-default)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <Link href="/attorney" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Back to Attorney Mode
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                Explore more tools
              </p>
            </div>
          </Link>
          <Link href="/attorney/case-timeline" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Case Timeline Generator
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                Generate timelines
              </p>
            </div>
          </Link>
          <Link href="/attorney/case-predictor" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Case Predictor
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                Predict outcomes
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
