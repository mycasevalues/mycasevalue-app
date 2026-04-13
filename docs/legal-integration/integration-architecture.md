# MyCaseValue Legal Data Integration Architecture

## Executive Summary

This document outlines the integration strategy for connecting MyCaseValue to multiple legal data sources including government APIs, legal research databases, and open datasets. The architecture is designed for scalability, reliability, and cost-efficiency using serverless infrastructure (Vercel), background jobs (Inngest), in-memory caching (Upstash Redis), and microservices for document processing and semantic search.

---

## 1. System Overview

### Architecture Diagram (ASCII)

```
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
â                    MyCaseValue Frontend                         â
â                    (Next.js 14 / TypeScript)                    â
ââââââââââââââââââââââââââââââ¬âââââââââââââââââââââââââââââââââââââ
                             â
                             â¼
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
â                   API Route Handlers                             â
â  (Legal Search, Document Fetch, Citation Analysis)             â
ââââââââââââââââââââââââââââââ¬âââââââââââââââââââââââââââââââââââââ
                             â
        ââââââââââââââââââââââ¼âââââââââââââââââââââ
        â                    â                    â
        â¼                    â¼                    â¼
ââââââââââââââââââââ ââââââââââââââââââââ ââââââââââââââââââââ
â   Upstash Redis  â â   Supabase DB    â â   Inngest Jobs   â
â  (Rate Limit      â â   (Document,     â â  (Background      â
â   Cache, Queues) â â    Citations,     â â   Processing)    â
ââââââââââââââââââââ â   Embeddings)    â ââââââââââ¬ââââââââââ
                      ââââââââââââââââââââ          â
                                                   â¼
                             âââââââââââââââââââââââââââââââ
                             â  TypeScript API Clients     â
                             â  (Rate Limited via Redis)   â
                             ââââââââââââââ¬âââââââââââââââââ
                                         â
        âââââââââââââââââââââââââââââââââââ¼âââââââââââââââââââââââ
        â                               â                      â
        â¼                               â¼                      â¼
ââââââââââââââââââââ  ââââââââââââââââââââââââââââ  âââââââââââââââââââââ
â Government APIs  â  â Legal Research APIs     â  â Open Datasets    â
ââââââââââââââââââââ¤  ââââââââââââââââââââââââââââ¤  âââââââââââââââââââââ¤
â - GovInfo        â  â - CourtListener          â  â - U.S. Code XML   â
â - eCFR           â  â - case.law               â  â - SCDB            â
â - Fed Register   â  â - CanLII                â  â - CaseHOLD        â
â - EDGAR          â  â - Oyez                   â  â - Oyez            â
ââââââââââââââââââââ  ââââââââââââââââââââââââââââ  âââââââââââââââââââââ
```
% 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&8¥ 8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥+8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ 8¥ 8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥-8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ 8¥ 8¥ 8¥ 8¥¯8¥¯8¥¯8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ ØÝÜ8¥ 8¥ ^YXÚ]H8¥ 8¥ [Ù\[Û8¥ 8¥ 
ØÝ[Y[8¥ 8¥ 
Ú]][Û8¥ 8¥ 
XÝÜ8¥ 8¥ ØÙ\ÜÛÜH8¥ 8¥ ^XÝ[Ûx¥ 8¥ [XY[ÜÊH8¥ 8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&ÈÈÈÙ^HÛÛ\Û[ÂÛÛ\Û[XÚÛÙÞH\ÜÙHKKKKKKKKKK_KKKKKKKKKKK_KKKKKKKKK_
Û[
^ÈM\TØÜ\XXÝ\Ù\[\XÙHÜÙX\Ú[È[ÝÜÚ[ÈYØ[]H
THÝ]\Ê^ÈTHÝ]\ÈXÚÙ[\]Y\Ý[[È[\Ú[\ÜÈÙÚXÈ
]X\ÙJÝ\X\ÙH
ÜÝÜTÔS
H[X\H]HÝÜHÜØÝ[Y[ËÚ]][ÛË[XY[ÜÈ
ØXÚ[Ê\Ý\ÚY\È]H[Z][ËTH\ÜÛÙHØXÚ[ËØ]Y]YH
XÚÙÜÝ[ØÊ[Ù\Ý\Þ[ÚÛÝ\È[Ù\Ý[ÛØÙ\ÜÚ[Ë[[XY[È
ØÝ[Y[ØÙ\ÜÚ[ÊØÝÜ
ØÚÙ\H^XÝ^ÛHÑÐÖÐÔÜX]ÛÛ\Ú[Û
Ú]][Û^XÝ[Û^YXÚ]H
]ÛH^XÝ[ÜX[^HYØ[Ú]][ÛÈ
[XY[ÜÊ[Ù\[Û
ØÚÙ\HÙ[\]HXÝÜ[XY[ÜÈÜÙ[X[XÈÙX\ÚKKBÈÈ]HÝÎØÝ[Y[[Ù\Ý[Û\[[BÈÈÈÝÈXYÜ[B^\[]HÛÝ\ÙH
TK]\Ù][JB8¥ 8¥¯8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ [Ù\Ý8¥ 8¥ [Ù\Ý]H8¥ ¸¥ 8¥ 8¥ 8¥ 8¥®]H[Z]ÚXÚÈ
Y\ÊB8¥ Ø8¥ 8¥ 8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&8¥¯8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ ]ÚÛHÛÝ\ÙH8¥ 8¥ 
Ú]YÚ[][ÛH8¥ 8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥+8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&8¥ 8¥¯8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ ØXÚH[Y\È8¥ 8¥ 
]ÚY\ØÙ\ÜÚ[ÊB8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥+8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&8¥ 8¥¯8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ ØÝÜÙ\XÙH8¥ 8¥ 
Y[KØ[\JH8¥ 8¥ ^XÝ^ÐÔ8¥ 8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥+8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&8¥ 8¥¯8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ ^YXÚ]HÙ\XÙH8¥ 8¥ ^XÝÚ]][ÛÈ8¥ 8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥+8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&8¥ 8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥-8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ 8¥ 8¥¯8¥¯8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ ÜX[^x¥'8¥ 8¥ 8¥)ÜX]H8¥ 8¥ Ú]][Ûø¥ 8¥ Ú]][Û8¥ 8¥%8¥ 8¥ 8¥ 8¥ 8¥+8¥ 8¥ 8¥ 8¥ 8¥&8¥ XÛÜÈ8¥ 8¥ 8¥%8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥&8¥¯8¥#8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥$8¥ [Ù\[Æâ6W'f6R)H ¢)H"vVæW&FRVÖ&VFFæw2)H ¢)H"scÖFÒfV7F÷'2)H ¢)IN)H)H)H)H)H)H)H)H)JÎ)H)H)H)H)H)H)H)H)H)H)H)H)H)I¢)H ¢)kÀ¢)HÎ)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)I ¢)H"7W&6R&F6)H ¢)H"Òç6W'BFö7VÖVçB)H ¢)H"Òç6W'B6FFöç2)H ¢)H"Òç6W'BVÖ&VFFæw2)H ¢)H"ÒWFFR7æ27FGW2)H ¢)IN)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)I¦  ¢222&ö6W76ær7FW0 £â¢¤ævW7FöâæævW7B¢£¢G&vvW&VB'66VGVÆRFÇÂvV&öö²Â÷"6ÆÂâfWF6W2FFg&öÒ6÷W&6W2vF&÷W"&FRÆÖFærà£"â¢¤66ær&VF2¢£¢7F÷&W2&W7öç6W2æB&ö6W76ær7FFRFòföB&VGVæFçBv÷&²à£2â¢¤Fö7VÖVçBWG&7FöâFö7F÷"¢£¢6öçfW'G2Dg2Âv÷&BFö72ÂæB÷FW"f÷&ÖG2FòÆçFWBvFô5"à£Bâ¢¤6FFöâWG&7FöâWV6FR¢£¢FVçFfW2æBæ÷&ÖÆ¦W2ÆVvÂ6FFöç2RærâÂ#C"Rå2ä2â*r2"à£Râ¢¤VÖ&VFFærvVæW&Föâæ6WFöâ¢£¢7&VFW2scÖFÖVç6öæÂfV7F÷'2f÷"6VÖçF26ÖÆ&G6V&6à£bâ¢¥7F÷&vR7W&6R¢£¢W'67G2Fö7VÖVçG2Â6FFöç2ÂæBVÖ&VFFæw2vF&÷W"æFWærà£râ¢¥7æ2G&6¶ær¢£¢ÖçFç27W'6÷"÷6FöâæBÆ7B×7æ2FÖW7F×W"6÷W&6Rf÷"&W7VÖ&ÆRævW7Föâà ¢ÒÒÐ ¢222â6ÆVçBÆW  ¢222&6FV7GW&P ¥FR6ÆVçBÆW"&÷fFW2VæfVBçFW&f6Rf÷"66W76ærÆÂÆVvÂFF6÷W&6W2vF'VÇBÖã ¢Ò¢¥&FRÆÖFær¢£¢F7G&'WFVBfW7F6&VF2W6ærFö¶Vâ'V6¶WBÆv÷&FÐ¢Ò¢¤W'&÷"æFÆær¢£¢WöæVçFÂ&6¶öfb&WG'Æöv2vF¦GFW ¢Ò¢¥væFöâ¢£¢WFöÖF2æFÆæröb7W'6÷"Ö&6VBæBöfg6WBÖ&6VBvæFöà¢Ò¢¥Gær¢£¢gVÆÂGU67&B7W÷'BvF&W7öç6RGW0¢Ò¢¤66ær¢£¢÷FöæÂ&W7öç6R66ærf&VF0 ¢2226ÆVçB6Æ76W0 ¦GW67&@¢òòV66ÆVçB×ÆVÖVçG26öç67FVçBçFW&f6P¦çFW&f6RÆVvÄFF6ÆVçB°¢&FTÆÖD¶W¢7G&æs°¢&FTÆÖEW%6V6öæC¢çVÖ&W#°¢6V&6VW'¢6V&6VW'¢&öÖ6SÅ6V&6&W7VÇEµÓã°¢fWF6C¢7G&ær¢&öÖ6SÄFö7VÖVçCã°¢fWF6vR7W'6÷#ó¢7G&ær¢&öÖ6SÅvU&W7VÇCã°§Ð¦  ¢222×ÆVÖVçFVB6ÆVçG0 §Â6ÆVçBÂ&6RU$ÂÂWFÂ&FRÆÖBÂ¶WÖWFöG2À§ÂÒÒÒÒÒÒÒ×ÂÒÒÒÒÒÒÒÒÒ×ÂÒÒÒÒÒ×ÂÒÒÒÒÒÒÒÒÒÒ×ÂÒÒÒÒÒÒÒÒÒÒÒÒ×À§Â¢¤6÷W'DÆ7FVæW"¢¢Â6÷W'FÆ7FVæW"æ6öÒö÷&W7B÷cBöÂFö¶VâÂSö"Â6V&6÷æöç2ÂvWDFö6¶WBÂvWD6FFöâÂvWD§VFvW2À§Â¢¤fVFW&Å&Vv7FW"¢¢ÂfVFW&Ç&Vv7FW"æv÷bö÷cöÂæöæRÂö"Â6V&6Fö7VÖVçG2ÂvWDvVæ6W2ÂvWDFö7VÖVçBÀ§Â¢¦T4e"¢¢ÂV6g"æv÷bö÷fW'6öæW"÷cöÂæöæRÂSö"ÂvWEFFÆW2ÂvWE'G2ÂvWEfW'6öç2ÂvWE6V7FöâÀ§Â¢¤TDt"¢¢ÂVgG2ç6V2æv÷bôÄDU5BöÂæöæRÂR÷6V2Â6V&66ö×çÂvWDfÆæw2ÂvWD66W76öâÀ§Â¢¦66RæÆr¢¢Âæ66RæÆr÷cöÂ¶WÂöFÂ6V&666W2ÂvWD66RÂvWD66W4'§W&6F7FöâÀ§Â¢¤6äÄ¢¢Âæ6æÆæ÷&vÂ¶WÂSö"Â6V&666W2Â6V&6ÆVv6ÆFöâÂvWDFV66öâÀ§Â¢¤v÷dæfò¢¢Âv÷fæfòæv÷böÂæöæRÂö"Â6V&6ÂvWD6öÆÆV7Föç2ÂvWE6¶vRÀ ¢222×ÆVÖVçFFöâFWFÇ0 ¥6VRÆVvÂÖFFÖ6ÆVçG2çG6f÷"gVÆÂ×ÆVÖVçFFöâvF ¢Ò&FRÆÖFW"WFÆGW6ærW7F6&VF0¢Ò&WG'Æöv2vFWöæVçFÂ&6¶öf`¢ÒvæFöâæFÆW'2f÷"FffW&VçBvæFöâ7GÆW0¢ÒW'&÷"6Æ76W2f÷"7V6f2W'&÷"6öæFFöç0¢Ò¥4Fö2Fö7VÖVçFFöâf÷"ÆÂV&Æ2ÖWFöG0 ¢ÒÒÐ ¢22BâÖ7&÷6W'f6RÆW  ¢222&6FV7GW&P ¥F&VRFö6¶W"Ö7&÷6W'f6W2'Vââ6&VBæWGv÷&²Â6ö÷&FæFærvFFRÖâæWBæ§2Æ6Föã  ¦ÖÀ¥6W'f6W3 ¢Fö7F÷#¢DbôFö7VÖVçBWG&7Föâ÷'BSS¢æ6WFöã¢fV7F÷"VÖ&VFFærvVæW&Föâ÷'BR¢÷7Fw&W3¢÷FöæÂÆö6ÂFWbFF&6P¦  ¢222Fö7F÷"6W'f6P ¢¢¥W'÷6R¢£¢WG&7BFWBæBÖWFFFg&öÒFö7VÖVçG0 ¢¢¤6&ÆFW2¢£ ¢ÒDbFWBWG&7FöâvFô5"FW76W&7B¢Òv÷&BFö7VÖVçBæFö7'6æp¢Ò%Dbf÷&ÖB7W÷'@¢ÒÖvR×Fò×FWBô5 ¢ÒFVÖ&æÂvVæW&Föà¢Òf÷&ÖBFWFV7FöâæB6öçfW'6öà ¢¢¤VæGöçG2¢£ ¦ ¥õ5B÷WÆöBÒWÆöBæB&ö6W72Fö7VÖVç@¤tUB÷7FGW2ó¦BÒ6V6²&ö6W76ær7FGW0¤tUBöWG&7Bó¦BÒ&WG&WfRWG&7FVBFW@¥õ5Böö7"Ò&ö6W72ÖvRvFô5 ¦  ¢¢¤6öæfwW&Föâ¢£ ¦Fö6¶W&fÆP¤e$ôÒg&VVÆw&ö¦V7BöFö7F÷#¦ÆFW7@¤Uõ4RSS ¤TåbÔôdÄUõ4¤SÓÔ ¤Tåbô5%ôÄäsÖVæp¦  ¢222æ6WFöâ6W'f6P ¢¢¥W'÷6R¢£¢vVæW&FR6VÖçF2VÖ&VFFæw2f÷"ÆVvÂFö7VÖVçG0 ¢¢¤6&ÆFW2¢£ ¢Ò&F6VÖ&VFFærvVæW&FöâscFÖVç6öç2¢Ò6VçFVæ6UG&ç6f÷&ÖW"ÖöFVÂfæR×GVæVBöâÆVvÂFW@¢Òf7BæfW&Væ6RfF÷&6¢ÒööÆær7G&FVvW3¢ÖVâÂ6Ç2ÂÖ ¢¢¤VæGöçG2¢£ ¦ ¥õ5BöVÖ&VBÒvVæW&FRVÖ&VFFærf÷"FW@¥õ5BöVÖ&VBÖ&F6ÒvVæW&FRVÖ&VFFæw2f÷"×VÇFÆRFWG0¤tUBöVÇFÒVÇF6V6°¦  ¢¢¤6öæfwW&Föâ¢£ ¦Fö6¶W&fÆP¤e$ôÒg&VVÆw&ö¦V7Böæ6WFöã¦ÆFW7@¤Uõ4RP¤TåbÔôDTÃÖfæR×GVæVBÖÆVvÂÖ&W'@¤Tåb$D4õ4¤SÓ3 ¤TåbDUd4SÖ7R2÷"7VFf÷"uP¦  ¢222Fö6¶W"6ö×÷6R÷&6W7G&Föà ¥6VRFö6¶W"Ö6ö×÷6RæÆVvÂçÖÆf÷"6ö×ÆWFR6öæfwW&Föâæ6ÇVFæs ¢Ò6W'f6RFVfæFöç2vF&W6÷W&6RÆÖG0¢Ò6&VBæWGv÷&²f÷"çFW"×6W'f6R6öÖ×Væ6Föà¢ÒVÇF6V6·0¢ÒföÇVÖRÖ÷VçG2f÷"66ærÖöFVÇ0¢ÒVçf&öæÖVçBf&&ÆR÷fW'&FW0 ¢222FWÆ÷ÖVçB7G&FVvW0 ¢¢¤FWfVÆ÷ÖVçB¢£¢Fö6¶W"6ö×÷6RöâÆö6ÂÖ6æR÷"Fö6¶W"FW6·F÷ ¢¢¥7Fvær¢£¢Fö6¶W"6ö×÷6RöâT3"ç7Fæ6R÷"FvFÄö6VâG&÷ÆW@¢¢¥&öGV7Föâ¢£¢·V&W&æWFW26ÇW7FW"ÂT52Â÷"Fö6¶W"7v&ÒvFÆöB&Ææ6æp ¢ÒÒÐ ¢22Râ&6¶w&÷VæB¦ö'2æævW7B ¢222¦ö"&6FV7GW&P ¤æævW7BÖævW27æ2&ö6W76ærvF ¢Ò¢¥66VGVÆær¢£¢7&öâÖ&6VB&V7W'&ær¦ö'2FÇÂvVV¶Ç¢Ò¢¥VWVær¢£¢&VÆ&ÆR¦ö"VWVW2vF&WG'Æöv0¢Ò¢¤ÖöæF÷&ær¢£¢'VÇBÖâö'6W'f&ÆGæBW'&÷"G&6¶æp¢Ò¢¤÷&6W7G&Föâ¢£¢×VÇF×7FWv÷&¶fÆ÷w26öÖ&æær×VÇFÆRgVæ7Föç0 ¢222¦ö"gVæ7Föç0 §ÂgVæ7FöâÂG&vvW"ÂçWBÂ÷WGWBÂW'÷6RÀ§ÂÒÒÒÒÒÒÒÒÒ×ÂÒÒÒÒÒÒÒÒ×ÂÒÒÒÒÒÒ×ÂÒÒÒÒÒÒÒ×ÂÒÒÒÒÒÒÒÒ×À§ÂævW7D6÷W'DÆ7FVæW$÷æöç6ÂÖçVÂÂ66VGVÆVBÂFFW2ÂvTÆÖBÂ6÷VçBÂW'&÷'2Â'VÆ²ævW7B÷æöç2vFvæFöâÀ§ÂævW7DfVFW&Å&Vv7FW&ÂFÇÒÂF4&6²Â6÷VçBÂÆ7D7W'6÷"ÂFÇfVFW&Â&Vv7FW"7æ2À§Â&ö6W74Fö7VÖVçEVÆæVÂfÆRWÆöBÂæævW7B7FWÂfÆUW&ÂÂÖWFFFÂFö7VÖVçDBÂ÷&6W7G&FRFö7F÷"(i"WV6FR(i"æ6WFöâÀ§ÂvVæW&FTVÖ&VFFæw6Â&F6G&vvW"ÂFö7VÖVçDG5µÒÂ7V66W746÷VçBÂvVæW&FRVÖ&VFFæw2f÷"Fö7VÖVçG2À§ÂFÇfVFW&Å&Vv7FW%7æ6ÂFÇÒUD2ÂÒÂ7FGW2ÂVæB×FòÖVæBFÇ7æ2v÷&¶fÆ÷rÀ ¢222W×ÆR¦ö"fÆ÷s¢fVFW&Â&Vv7FW"FÇ7æ0 ¦GW67&@¦W÷'B6öç7BFÇfVFW&Å&Vv7FW%7æ2ÒæævW7Bæ7&VFTgVæ7Föâ¢²C¢&FÇÖfVFW&Â×&Vv7FW"×7æ2"Â&WG&W3¢"ÒÀ¢²7&öã¢#¢¢¢"ÒÂòòFÇBÒUD0¢7æ2²7FWÒÓâ°¢òò7FW¢vWBÆ7B7æ27W'6÷ ¢6öç7BÆ7E7æ2ÒvB7FWç'Vâ&vWBÖÆ7B×7æ2"Â7æ2Óâ°¢&WGW&âF"çF&ÆR&FF÷6÷W&6U÷7æ2"¢çvW&R'6÷W&6UöæÖR"Â&fVFW&Å÷&Vv7FW""¢æf'7B°¢Ò° ¢òò7FW#¢fWF6Fö7VÖVçG2g&öÒfVFW&Â&Vv7FW ¢6öç7BFö7VÖVçG2ÒvB7FWç'Vâ&fWF6ÖFö7VÖVçG2"Â7æ2Óâ°¢6öç7B6ÆVçBÒæWrfVFW&Å&Vv7FW$6ÆVçB°¢6öç7BF4&6²ÒÆ7E7æ0¢òÖFæ6VÂFFRææ÷rÒÆ7E7æ2æÆ7E÷7æ6VEöBòcC¢¢°¢&WGW&â6ÆVçBç6V&6Fö7VÖVçG2²F4&6²ÂvU6¦S¢Ò°¢Ò° ¢òò7FW3¢&ö6W72V6Fö7VÖVçBF&÷VvVÆæP¢6öç7B&W7VÇG2ÒvB7FWç'Vâ'&ö6W72ÖFö7VÖVçG2"Â7æ2Óâ°¢&WGW&â&öÖ6RæÆÂ¢Fö7VÖVçG2æÖFö2Óà¢7FWæçfö¶R'&ö6W72ÖFö7VÖVçB×VÆæR"Â°¢FF¢°¢W&Ã¢Fö2æFö7VÖVçE÷W&ÂÀ¢6÷W&6S¢&fVFW&Å÷&Vv7FW""À¢6÷W&6TC¢Fö2æFö7VÖVçEöçVÖ&W"À¢ÖWFFF¢Fö0¢Ð¢Ò¢¢°¢Ò° ¢òò7FWC¢WFFR7æ27FGW0¢vB7FWç'Vâ'WFFR×7æ2×7FGW2"Â7æ2Óâ°¢vBF"çF&ÆR&FF÷6÷W&6U÷7æ2"¢çWFFR°¢Æ7E÷7æ6VEöC¢æWrFFRÀ¢7FGW3¢'7V66W72 ¢Ò¢çvW&R'6÷W&6UöæÖR"Â&fVFW&Å÷&Vv7FW""°¢Ò° ¢&WGW&â°¢&ö6W76VD6÷VçC¢&W7VÇG2æÆVæwFÀ¢FÖW7F×¢æWrFFR¢Ó°¢Ð¢°¦  ¢222W'&÷"æFÆærb&WG&W0 ¤ÆÂæævW7BgVæ7Föç2æ6ÇVFS ¢Ò¢¤WFöÖF2&WG&W2¢£¢2GFV×G2vFWöæVçFÂ&6¶öf`¢Ò¢¤FVBÆWGFW"æFÆær¢£¢fÆVB¦ö'2ÆövvVBFòFVEöÆWGFW%÷VWVVF&ÆP¢Ò¢¥'FÂ6ö×ÆWFöâ¢£¢fÆVBFV×2FöâwB&Æö6²7V66W76gVÂöæW0¢Ò¢¤ÖöæF÷&ær¢£¢æævW7BF6&ö&Bf÷"¦ö"7FGW2æBÆöw0 ¢ÒÒÐ ¢22bâFF&6R66VÖ ¢2227W&6RF&ÆW0 ¢2222ÆVvÅöFö7VÖVçG0¦7À¤5$TDRD$ÄRÆVvÅöFö7VÖVçG2¢B$u4U$Â$Ô%´UÀ ¢ÒÒ6÷W&6RFVçFf6Föà¢6÷W&6RDUBäõBåTÄÂÂÒÒv6÷W'FÆ7FVæW"rÂvfVFW&Å÷&Vv7FW"rÂvV6g"rÂWF2à¢6÷W&6UöBDUBäõBåTÄÂÂÒÒBâ6÷W&6R77FVÐ¢TäTR6÷W&6RÂ6÷W&6UöBÀ ¢ÒÒ6öçFVç@¢FFÆRDUBäõBåTÄÂÀ¢6öçFVçBDUBäõBåTÄÂÂÒÒgVÆÂWG&7FVBFW@¢7VÖÖ'DUBÂÒÒ÷FöæÂ7VÖÖ' ¢ÒÒÖWFFF¢ÖWFFF¥4ôä"DTdTÅBw·ÒrÀ¢ÒÒW×ÆR7G'V7GW&S ¢ÒÒ°¢ÒÒ&§VFvR#¢$¦öâ6ÖF"À¢ÒÒ&6÷W'B#¢#&æB6&7VB"À¢ÒÒ&FFUöfÆVB#¢###2ÓÓR"À¢ÒÒ'&W÷'FW'2#¢²##2bã6BCSb%ÒÀ¢ÒÒ''FW2#¢²'ÆçFfb#¢%6ÖFbâ"Â&FVfVæFçB#¢$¦öæW2'ÒÀ¢ÒÒ&Fö5÷W&Â#¢&GG3¢òòâââ ¢ÒÒÐ ¢ÒÒ&ö6W76ær7FGW0¢&ö6W76æu÷7FGW2DUBDTdTÅBwVæFærrÂÒÒVæFærÂ&ö6W76ærÂ6ö×ÆWFRÂfÆV@ ¢ÒÒFÖW7F×0¢7&VFVEöBDÔU5DÕE¢DTdTÅBäõrÀ¢WFFVEöBDÔU5DÕE¢DTdTÅBäõrÀ ¢ÒÒæFWæp¢æFWVEöBDÔU5DÕE ¢° ¤5$TDRäDUGöÆVvÅöFö7VÖVçG5÷6÷W&6RôâÆVvÅöFö7VÖVçG26÷W&6RÂ6÷W&6UöB°¤5$TDRäDUGöÆVvÅöFö7VÖVçG5ö7&VFVBôâÆVvÅöFö7VÖVçG27&VFVEöBDU42°¤5$TDRäDUGöÆVvÅöFö7VÖVçG5öÖWFFFôâÆVvÅöFö7VÖVçG2U4ärtâÖWFFF°¤5$TDRäDUGöÆVvÅöFö7VÖVçG5÷7FGW2ôâÆVvÅöFö7VÖVçG2&ö6W76æu÷7FGW2°¦  ¢2222ÆVvÅö6FFöç0¦7À¤5$TDRD$ÄRÆVvÅö6FFöç2¢B$u4U$Â$Ô%´UÀ ¢ÒÒ6÷W&6RFö7VÖVç@¢6÷W&6UöFö7VÖVçEöB$tåBäõBåTÄÂ$TdU$Tä4U2ÆVvÅöFö7VÖVçG2BôâDTÄUDR444DRÀ ¢ÒÒ6FVBFö7VÖVçBb¶æ÷vâ¢6FVEöFö7VÖVçEöB$tåB$TdU$Tä4U2ÆVvÅöFö7VÖVçG2BôâDTÄUDR4UBåTÄÂÀ ¢ÒÒ6FFöâFWFÇ0¢6FFöå÷FWBDUBäõBåTÄÂÂÒÒgVÆÂ6FFöâ2w&GFVà¢6FFöå÷GRDUBäõBåTÄÂÂÒÒv66RrÂw7FGWFRrÂw&VwVÆFöârÂv6öç7FGWFöæÂp ¢ÒÒ'6VB6ö×öæVçG0¢&W÷'FW"DUBÂÒÒRærâÂ$bã6B"Â%Rå2â"Â%2ä7Bâ ¢föÇVÖRåBÀ¢vRåBÀ¢6÷'Eöf÷&ÒDUBÂÒÒRærâÂ$Bâ"Â%7W&æ÷FRR  ¢ÒÒæ÷&ÖÆ¦Föà¢5öæ÷&ÖÆ¦VB$ôôÄTâDTdTÅBdÅ4RÀ¢æ÷&ÖÆ¦VEö6FFöâDUBÂÒÒ6æöæ6Âf÷&Òf÷"ÖF6æp ¢ÒÒÖWFFF¢6öçFWE÷FWBDUBÂÒÒ6VçFVæ6R6öçFæær6FFöà¢ÖWFFF¥4ôä"DTdTÅBw·ÒrÀ ¢ÒÒFÖW7F×0¢7&VFVEöBDÔU5DÕE¢DTdTÅBäõr¢° ¤5$TDRäDUGö6FFöç5÷6÷W&6UöFö2ôâÆVvÅö6FFöç26÷W&6UöFö7VÖVçEöB°¤5$TDRäDUGö6FFöç5ö6FVEöFö2ôâÆVvÅö6FFöç26FVEöFö7VÖVçEöB°¤5$TDRäDUGö6FFöç5÷GRôâÆVvÅö6FFöç26FFöå÷GR°¤5$TDRäDUGö6FFöç5öæ÷&ÖÆ¦VBôâÆVvÅö6FFöç2æ÷&ÖÆ¦VEö6FFöâ°¤5$TDRäDUGö6FFöç5ögVÆÅ÷FWBôâÆVvÅö6FFöç2U4ärtâFõ÷G7fV7F÷"vVævÆ6rÂ6FFöå÷FWB°¦  ¢2222Fö7VÖVçEöVÖ&VFFæw0¦7À¢ÒÒVæ&ÆRwfV7F÷"WFVç6öà¤5$TDRUDTå4ôâbäõBU5E2fV7F÷#° ¤5$TDRD$ÄRFö7VÖVçEöVÖ&VFFæw2¢B$u4U$Â$Ô%´UÀ ¢ÒÒFö7VÖVçB&VfW&Væ6P¢Fö7VÖVçEöB$tåBäõBåTÄÂ$TdU$Tä4U2ÆVvÅöFö7VÖVçG2BôâDTÄUDR444DRÀ ¢ÒÒ6Væ²æf÷&ÖFöà¢6VæµöæFWåBäõBåTÄÂÀ¢6Væµ÷FWBDUBäõBåTÄÂÀ ¢ÒÒVÖ&VFFærfV7F÷"scFÖVç6öç2f÷"6VçFVæ6UG&ç6f÷&ÖW"¢VÖ&VFFærfV7F÷"scäõBåTÄÂÀ ¢ÒÒÖWFFF¢7&VFVEöBDÔU5DÕE¢DTdTÅBäõr¢° ¢ÒÒfV7F÷"æFWf÷"6ÖÆ&G6V&6¤5$TDRäDUôâFö7VÖVçEöVÖ&VFFæw2U4ärfffÆBVÖ&VFFærfV7F÷%ö6÷6æUö÷2°¢ÒÒÇFW&æFfS¢å5ræFWf÷"&WGFW"W&f÷&Öæ6RB66ÆP¢ÒÒ5$TDRäDUôâFö7VÖVçEöVÖ&VFFæw2U4ärç7rVÖ&VFFærfV7F÷%ö6÷6æUö÷2tDÓÓbÂVeö6öç7G'V7FöãÓcB° ¢ÒÒVæVR6öç7G&çBW"Fö7VÖVç@¤5$TDRTäTRäDUGöVÖ&VFFæw5öFö5ö6Væ²ôâFö7VÖVçEöVÖ&VFFæw2Fö7VÖVçEöBÂ6VæµöæFW°¦  ¢2222FF÷6÷W&6U÷7æ0¦7À¤5$TDRD$ÄRFF÷6÷W&6U÷7æ2¢B$u4U$Â$Ô%´UÀ ¢ÒÒ6÷W&6RFVçFf6Föà¢6÷W&6UöæÖRDUBäõBåTÄÂTäTRÂÒÒv6÷W'FÆ7FVæW"rÂvfVFW&Å÷&Vv7FW"rÂWF2à ¢ÒÒ7æ2G&6¶æp¢Æ7E÷7æ6VEöBDÔU5DÕE¢À¢æWE÷7æ5öBDÔU5DÕE¢À ¢ÒÒvæFöâ7W'6÷ ¢7W'6÷"DUBÂÒÒ×7V6f27W'6÷"öfg6WBÂvRÂBÂFÖW7F×ÂWF2â ¢ÒÒ7FGW0¢7FGW2DUBDTdTÅBvFÆRrÂÒÒFÆRÂ7æ6ærÂ7V66W72ÂfÆV@¢W'&÷%öÖW76vRDUBÀ¢&WG'ö6÷VçBåBDTdTÅBÀ ¢ÒÒ6öæfwW&Föà¢6öæfr¥4ôä"DTdTÅBw·ÒrÀ¢ÒÒW×ÆS ¢ÒÒ°¢ÒÒ'vU÷6¦R#¢À¢ÒÒ'&FUöÆÖE÷W%÷6V6öæB#¢À¢ÒÒ'&WG'öÖöGFV×G2#¢0¢ÒÒÐ ¢ÒÒFÖW7F×0¢7&VFVEöBDÔU5DÕE¢DTdTÅBäõrÀ¢WFFVEöBDÔU5DÕE¢DTdTÅBäõr¢° ¤5$TDRäDUG÷7æ5÷6÷W&6RôâFF÷6÷W&6U÷7æ26÷W&6UöæÖR°¤5$TDRäDUG÷7æ5÷7FGW2ôâFF÷6÷W&6U÷7æ27FGW2°¦  ¢222¶WFW6vâFV66öç0 £â¢¤¥4ôâÖWFFF¢£¢fÆW&ÆR7F÷&vRf÷"6÷W&6R×7V6f2FFvF÷WB66VÖ6ævW0£"â¢¤VÖ&VFFær6Væ¶ær¢£¢Fö7VÖVçG27ÆBçFò6Væ·2Fò¶VWVÖ&VFFær6¦RÖævV&ÆRæBVæ&ÆRw&çVÆ"6ÖÆ&G6V&6£2â¢¥fV7F÷"æFWær¢£¢ddfÆBæFWW2f÷"6÷7BÖVffV7FfR6ÖÆ&G6V&6²å5rf÷"&öGV7FöâB66ÆP£Bâ¢¥6ögBFVÆWFW2¢£¢æò666FRFVÆWFW2â&öGV7Föã²Ö&²&V6÷&G22FVÆWFVEöFç7FV@£Râ¢¤æ÷&ÖÆ¦Föâ¢£¢6FFöâæ÷&ÖÆ¦FöâÆÆ÷w2ÖF6ærFffW&VçBf÷&×2öbFR6ÖR&VfW&Væ6P ¢ÒÒÐ ¢22râ66ær7G&FVwW7F6&VF2 ¢22266RÆW'0 ¦ ¥&WVW7BfÆ÷s ¢6ÆVçB&WVW7@¢)H ¢)IÎ)H)k¢6V6²&VF2&W7öç6R66R¢)H")H ¢)H")IÎ)H)k¢C¢&WGW&â66VB&W7öç6P¢)H")H ¢)H")IN)H)k¢Ô53¢6V6²&FRÆÖ@¢)H")H ¢)H")IÎ)H)k¢÷fW"ÆÖC¢&WGW&âC#¢)H")H ¢)H")IN)H)k¢ô³¢6ÆÂÂ66R&W7öç6P¦  ¢22266R¶W2bEDÇ0 §Â66R¶WGFW&âÂEDÂÂW'÷6RÂæ÷FRÀ§ÂÒÒ×ÂÒÒ×ÂÒÒ×ÂÒÒ×À§Â6Ã¦÷æöã§¶GÖÂrF2Â6÷W'DÆ7FVæW"÷æöâ66RÂgVÆÂ&W7öç6RÀ§Â6Ã§6V&6§·VW'ö6ÖÂ#B÷W'2Â6V&6&W7VÇB66RÂçfÆFFRöâæWrFö72À§Âg#¦Fö7VÖVçC§¶Fö5öçV×ÖÂ3F2ÂfVFW&Â&Vv7FW"Fö2ÂÖ×WF&ÆRÀ§ÂV6g#§6V7Föã§·FÖÂrF2ÂT4e"6V7FöâÂWFFW2ÖöçFÇÀ§Â&FUöÆÖC§¶6ÆVçGÓ§¶÷W'ÖÂ÷W"ÂFö¶Vâ'V6¶WB6÷VçFW"ÂW"Ö6ÆVçBW"Ö÷W"À§Â7æ3¦7W'6÷#§·6÷W&6WÖÂF2Â7æ2væFöâ7W'6÷"Â7W'ffW26W'f6R&W7F'G2À§ÂVÖ&VFFæs§VæFævÂ#B÷W'2ÂVWVRöbVæFærVÖ&VFFæw2Â¦ö"&ö6W76ærÀ ¢222&FRÆÖFær×ÆVÖVçFFöà ¥Fö¶Vâ'V6¶WBÆv÷&FÒf÷"f"W6vS  ¦GW67&@¦çFW&f6R&FTÆÖD6öæfr°¢&FUW%6V6öæC¢çVÖ&W#°¢&FUW$Fó¢çVÖ&W#°¢'W'7Có¢çVÖ&W#²òòÆÆ÷r'W'7BöbâWG&&WVW7G0§Ð ¢òòW×ÆS¢6÷W'DÆ7FVæW"S&Wö"Òã3&W÷6V2¦6öç7B&FTÆÖD6öæfrÒ°¢&FUW%6V6öæC¢"Âòò6öç6W'fFfRFòæFÆR'W'7@¢&FUW$F¢SÂòòVæf÷&6RFÇÆÖ@¢'W'7C¢òòÆÆ÷rWG&âV6²7V66W76öà§Ó°¦  ¢22266RçfÆFFöà £â¢¥FÖRÖ&6VB¢£¢EDÂW&W2VçG&W2WFöÖF6ÆÇ£"â¢¤WfVçBÖ&6VB¢£¢æævW7B¦ö'2çfÆFFR&VÆFVB66R¶W0£2â¢¤ÖçVÂ¢£¢FÖâFò6ÆV"7V6f266W0£Bâ¢¤FWVæFVæ7Ö&6VB¢£¢6FFöâæ÷&ÖÆ¦FöâçfÆFFW26FFöâ6V&666W0 ¢222W7F66öæfwW&Föà ¦GW67&@¦×÷'B²&VF2Òg&öÒ$W7F6÷&VF2#° ¦6öç7B&VF2ÒæWr&VF2°¢W&Ã¢&ö6W72æVçbåU5D4õ$TD5õ$U5EõU$ÂÀ¢Fö¶Vã¢&ö6W72æVçbåU5D4õ$TD5õ$U5EõDô´TâÀ§Ò° ¢òò×ÆVÖVçB6&7VB'&V¶W#¢b&VF2F÷vâÂfÂ÷Vâæò66ær¦W÷'B7æ2gVæ7FöâvWD66VD÷$fWF6ÅCâ¢¶W¢7G&ærÀ¢GFÃ¢çVÖ&W"À¢fWF6W#¢Óâ&öÖ6SÅCà¢¢&öÖ6SÅCâ°¢G'°¢6öç7B66VBÒvB&VF2ævWCÅCâ¶W°¢b66VB&WGW&â66VC° ¢6öç7Bg&W6ÒvBfWF6W"°¢vB&VF2ç6WFW¶WÂGFÂÂ¥4ôâç7G&ævgg&W6°¢&WGW&âg&W6°¢Ò6F6W'&÷"°¢òò&VF2W'&÷"Â§W7BfWF6æB&WGW&âæò66R¢6öç6öÆRçv&â&VF2W'&÷"f÷"¶WG¶¶WÓ¦ÂW'&÷"°¢&WGW&âfWF6W"°¢Ð§Ð¦  ¢ÒÒÐ ¢22â6V&6&6FV7GW&P ¢222'&B6V&6¢gVÆÂÕFWB²fV7F÷"6VÖçF0 ¤×66UfÇVR×ÆVÖVçG2GVÂÖÖöFR6V&6  ¦ ¥W6W"VW'¢)H ¢)IÎ)H)k¢'6RVW'WG&7B¶Wv÷&G2ÂfÇFW'2¢)H ¢)IN)H)k¢&ÆÆVÂ6V&6¢)H ¢)IÎ)HgVÆÂÕFWB6V&67W&6R¢)H"Ò÷7Fw&U5ÂG7fV7F÷"tâæFW¢)H"Òf7B¶Wv÷&BÖF6æp¢)H"Ò&ööÆVâ÷W&F÷'2äBÂõ"ÂäõB¢)H"ÒvVvG3¢FFÆSã'Â6öçFVçCã¢)H ¢)IN)H6VÖçF26V&6æ6WFöâVÖ&VFFæw2¢ÒvVæW&FRVW'VÖ&VFFæp¢ÒfV7F÷"6ÖÆ&G6÷6æRF7Fæ6R¢Ò&R×&æ¶ær'&VÆWfæ6P¢Ò6FFöâ&VÆFöç60¢)H ¢)kÀ¤ÖW&vRb&R×&æ²&W7VÇG0¢Ò6öÖ&æR&÷F&W7VÇB6WG0¢ÒvVvB'ÖWFöBeC£ãBÂfV7F÷#£ãb¢ÒÇfÇFW'2§W&6F7FöâÂFFR&ævRÂ§VFvR¢Ò6÷'B'&VÆWfæ6R66÷&P¢)H ¢)kÀ¥&WGW&âF÷Ô²&W7VÇG2vFvÆvG0¦  ¢222gVÆÂÕFWB6V&6÷7Fw&U5Â ¦7À¢ÒÒgVÆÂ×FWB6V&6æFW¤5$TDRäDUGöÆVvÅöFö7VÖVçG5ögG2ôâÆVvÅöFö7VÖVçG0¢U4ärtâFõ÷G7fV7F÷"vVævÆ6rÂFFÆRÇÂrrÇÂ6öçFVçB° ¢ÒÒ6V&6VW'¥4TÄT5@¢BÂFFÆRÂ6æWB6öçFVçBÂVW'Â26æWBÀ¢G5÷&æµö6BG7fV7F÷"ÂVW'2&æ°¤e$ôÒÆVvÅöFö7VÖVçG2ÂÆçFõ÷G7VW'vVævÆ6rÂwFVçBæg&ævVÖVçBrVW'¥tU$RFõ÷G7fV7F÷"vVævÆ6rÂFFÆRÇÂrrÇÂ6öçFVçBVW'¤õ$DU"%&æ²DU40¤ÄÔB#°¦  ¢222fV7F÷"6VÖçF26V&6 ¦7À¢ÒÒ6÷6æR6ÖÆ&G6V&6¥4TÄT5@¢BæBÂBçFFÆRÀ¢ÒRæVÖ&VFFærÃÓâVW'öVÖ&VFFær26ÖÆ&G÷66÷&P¤e$ôÒÆVvÅöFö7VÖVçG2@¤¤ôâFö7VÖVçEöVÖ&VFFæw2RôâBæBÒRæFö7VÖVçEö@¥tU$RÒRæVÖ&VFFærÃÓâVW'öVÖ&VFFærâãsRÒÒF&W6öÆ@¤õ$DU"%6ÖÆ&G÷66÷&RDU40¤ÄÔB#°¦  ¢222VW'Wç6öâvF6FFöç0 ¤×&÷fR6V&6'æ6ÇVFær6FVBFö7VÖVçG3£ult
SELECT related.id, related.title, COUNT(*) as citation_count
FROM legal_documents original
JOIN legal_citations c ON original.id = c.source_document_id
JOIN legal_documents related ON c.cited_document_id = related.id
WHERE original.id = ?
GROUP BY related.id, related.title
ORDER BY citation_count DESC;
```

### Search API Handler

```typescript
export async function searchLegalDocuments(query: string, filters: SearchFilters) {
  const [fullTextResults, vectorResults] = await Promise.all([
    searchFullText(query, filters),
    searchVector(query, filters)
  ]);

  // Merge and re-rank
  const merged = mergeResults(fullTextResults, vectorResults, {
    fullTextWeight: 0.4,
    vectorWeight: 0.6
  });

  // Apply secondary filters
  const filtered = applyFilters(merged, filters);

  // Return with highlighting
  return filtered.map(doc => ({
    ...doc,
    highlights: generateHighlights(doc.content, query)
  }));
}
```

---

## 9. Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

**Goals**: Establish data infrastructure and basic API clients

**Tasks**:
1. Set up Supabase PostgreSQL with new tables and pgvector
2. Configure Upstash Redis and test rate limiting
3. Implement API client classes (CourtListener, FederalRegister, eCFR)
4. Add Redis-based rate limiter utility
5. Test API clients with sandbox data

**Deliverables**:
- Legal data tables in Supabase (migrated)
- Upstash Redis connected and tested
- `legal-data-clients.ts` fully implemented
- Rate limiting verified

**Success Criteria**:
- Can fetch and cache API responses
- Rate limits enforced per API spec
- Proper error handling for API failures

---

### Phase 2: Document Processing Pipeline (Weeks 3-4)

**Goals**: Set up document processing and citation extraction

**Tasks**:
1. Deploy doctor and inception services (Docker Compose)
2. Implement eyecite-service.ts wrapper for citation extraction
3. Create Inngest functions for document processing
4. Test pipeline with sample documents
5. Implement batch processing for embeddings

**Deliverables**:
- `docker-compose.legal.yml` deployed
- `eyecite-service.ts` functional
- `legal-ingestion.ts` with pipeline functions
- Integration tests for end-to-end processing

**Success Criteria**:
- Can upload PDF, extract text, extract citations, generate embeddings
- Performance: 100 documents/minute through pipeline
- Error handling for corrupted/unsupported formats

---

### Phase 3: Ingestion & Syncing (Weeks 5-6)

**Goals**: Implement continuous data ingestion from legal sources

**Tasks**:
1. Implement historical ingestion for CourtListener (crawl all opinions)
2. Set up daily sync jobs for Federal Register
3. Implement incremental eCFR and EDGAR ingestion
4. Add cursor-based pagination for resumable jobs
5. Monitor sync status and error rates

**Deliverables**:
- Daily sync jobs scheduled in Inngest
- 100k+ documents ingested into Supabase
- Sync status dashboard
- Alert system for failed syncs

**Success Criteria**:
- Federal Register: 0 missed documents
- CourtListener: All public opinions available
- Zero duplicate ingestion
- Sync failures alert within 1 hour

---

### Phase 4: Search & UI Integration (Weeks 7-8)

**Goals**: Expose legal data through search and integrate with frontend

**Tasks**:
1. Implement hybrid full-text + vector search
2. Build search API endpoint
3. Add filters (jurisdiction, date range, judges, etc.)
4. Create Next.js frontend components for legal search
5. Add citation network visualization
6. Implement result highlighting and snippeting

**Deliverables**:
- `/api/search/legal` endpoint
- React search components
- Citation relationship visualization
- Search analytics dashboard

**Success Criteria**:
- Sub-100ms search response times
- Relevance: top result relevant to query 90% of the time
- Citation relationships loading <1s for 1000 cited documents

---

## 10. Operational Considerations

### Monitoring & Observability

```typescript
// All API calls logged to Inngest for visibility
import { logger } from "inngest";

logger.info("API call", {
  client: "courtlistener",
  endpoint: "/opinions",
  status: 200,
  duration_ms: 250,
  records_fetched: 100
});
```

### Error Handling Strategy

1. **Retryable Errors** (429, 502, 503, timeout): Exponential backoff, up to 3 retries
2. **Non-Retryable Errors** (401, 403, 404): Log and skip, don't retry
3. **Partial Failures**: Continue processing other records, report partial success
4. **Circuit Breaker**: Disable client for 1 hour if 10 consecutive failures

### Data Quality

1. **Validation**: Schema validation for all API responses
2. **Deduplication**: Check `data_source_sync.cursor` to avoid re-ingesting
3. **Completeness**: Verify mandatory fields present
4. **Normalization**: Consistent formatting for citations, dates, names

### Scaling Considerations

- **Document Processing**: Scale doctor/inception services horizontally with load balancer
- **Embedding Generation**: Batch operations reduce overhead; use GPU for 10x+ speedup
- **Redis**: Monitor memory usage; implement eviction policy (LRU)
- **Database**: Add read replicas for search queries; tune indexes based on query patterns

### Security & Privacy

1. **API Keys**: Store all secrets in environment variables (never commit)
2. **Rate Limiting**: Prevent abuse of own APIs
3. **Data Retention**: Comply with data source licenses (e.g., CourtListener attribution)
4. **Access Control**: Implement RBAC for admin functions

### Cost Optimization

| Service | Cost Driver | Optimization |
|---------|---|---|
| **Supabase** | Storage, Queries | Archive old embeddings after 1 year; optimize indexes |
| **Upstash Redis** | Commands, Data | Use compression for large cached responses; TTL cleanup |
| **Inngest** | Function runs | Batch small jobs; tune retry backoff |
| **Vercel** | Compute | Next.js incremental static generation for common searches |

---

## 11. Compliance & Legal Considerations

### Data Source Licenses

| Source | License | Attribution Required | Commercial Use |
|--------|---------|---|---|
| **CourtListener** | CCBY 4.0 | Yes, required | Yes, with attribution |
| **case.law** | CC0 (Public Domain) | No | Yes |
| **Federal Register** | Public Domain | No | Yes |
| **eCFR** | Public Domain | No | Yes |
| **EDGAR** | Public Domain | No | Yes |
| **Oyez** | CC BY 4.0 | Yes | Yes |
| **CanLII** | CC BY-NC 2.5 | Yes | No (non-commercial) |

**Action Items**:
1. Add attribution footer with source links
2. Review CourtListener terms for commercial SaaS
3. Limit CanLII data to non-commercial display
4. Document data retention policy

### GDPR / Data Privacy

- No personal information (PII) in legal documents by design
- Implement right-to-be-forgotten by purging document + embeddings
- Terms of Service: Explain data sources and retention

---

## 12. API Client Configuration Reference

### Environment Variables

```bash
# CourtListener
COURTLISTENER_API_KEY=xxx...
COURTLISTENER_RATE_LIMIT_PER_HOUR=5000

# case.law
CASELAW_API_KEY=xxx...

# CanLII
CANLII_API_KEY=xxx...

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://xxx...
UPSTASH_REDIS_REST_TOKEN=xxx...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx...
SUPABASE_SERVICE_ROLE_KEY=xxx...

# Inngest
INNGEST_KEY=xxx...
INNGEST_SIGNING_KEY=xxx...

# Microservices
DOCTOR_SERVICE_URL=http://doctor:5050
INCEPTION_SERVICE_URL=http://inception:8005
```

### Service Health Checks

Add to monitoring:

```typescript
async function healthCheck() {
  const checks = {
    redis: await redis.ping().then(() => "ok", () => "down"),
    supabase: await db.healthCheck().then(() => "ok", () => "down"),
    doctor: await fetch("http://doctor:5050/health").then(r => r.ok ? "ok" : "down", () => "down"),
    inception: await fetch("http://inception:8005/health").then(r => r.ok ? "ok" : "down", () => "down"),
  };

  const allOk = Object.values(checks).every(v => v === "ok");
  return { ok: allOk, services: checks };
}
```

---

## Conclusion

This architecture provides a scalable, maintainable foundation for integrating comprehensive legal data sources into MyCaseValue. Key principles:

1. **Separation of Concerns**: Distinct layers for API clients, processing, storage, and search
2. **Reliability**: Automatic retries, rate limiting, and error recovery
3. **Scalability**: Stateless services that can scale horizontally
4. **Cost-Effective**: Leverage free government APIs and open datasets
5. **User Experience**: Fast search with hybrid full-text + semantic matching

Follow the implementation phases in order to build incrementally with testable milestones.

