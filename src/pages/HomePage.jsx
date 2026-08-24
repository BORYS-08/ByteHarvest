import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, ROLES } from '../context/AppContext';
import { Btn } from '../components/common/GlowButton';
import { LuArrowDown } from 'react-icons/lu';


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const homeTranslations = {
  en: {
    eyebrow:
      'Smart India Hackathon 2026 · Problem Statement #26131',

    heroTitle1:
      'Detect crop disease',

    heroTitle2:
      'before it spreads.',

    heroSubtitle:
      'ByteHarvest helps farmers detect leaf diseases instantly, calculate accurate medicine dosage, and track regional pest outbreaks to protect Indian harvests.',

    enterWorkspace:
      'Enter Workspace',

    signIn:
      'Sign In to Platform',

    ministry:
      'Ministry of Agriculture & Farmers Welfare',

    whatItDoes:
      'What It Does',

    capabilitiesTitle1:
      'Four core capabilities.',

    capabilitiesTitle2:
      'One integrated platform.',

    capabilities: [
      {
        num: '01',

        title:
          'Crop Leaf Disease Scanner',

        summary:
          'Spot crop diseases in seconds from a photo.',

        body:
          'Takes a photo of an infected crop leaf and immediately identifies diseases, fungal spots, and insect damage. Gives farmers clear, practical treatment guidance comparing natural organic remedies with government-approved medicines.',
      },

      {
        num: '02',

        title:
          'District Outbreak Radar',

        summary:
          'Know if crop disease is heading to your village.',

        body:
          'An interactive map tracking disease spread across farming districts. Agricultural departments can watch infection movement over time and broadcast urgent warning SMS alerts to farmers in affected areas before crops are harmed.',
      },

      {
        num: '03',

        title:
          'Spray & Dosage Calculator',

        summary:
          'Exact medicine and water for your field size.',

        body:
          'Enter your field acreage to calculate the exact medicine quantity, total water litres, and number of 15-litre spray pumps needed. Displays estimated cost in rupees, safe spray timings, and pollinator protection tips.',
      },

      {
        num: '04',

        title:
          'Agricultural Scientist Review',

        summary:
          'Direct guidance and signed advice from experts.',

        body:
          "Any critical or hard-to-identify crop diseases are sent directly to Krishi Vigyan Kendra scientists. Certified agricultural experts review the photos and send official signed prescriptions straight to the farmer's phone.",
      },
    ],

    whoItServes:
      'Who It Serves',

    stakeholderTitle1:
      'Built for every stakeholder',

    stakeholderTitle2:
      'in the agriculture chain.',

    portals: [
      {
        audience:
          'Farmers & Growers',

        description:
          'Scan crop leaves, listen to spoken audio advice, track week-by-week crop recovery, and calculate correct spray mixtures for their fields.',
      },

      {
        audience:
          'Field Extension Workers',

        description:
          'Plan farm visits, register soil and leaf samples sent to testing labs, and save reports offline when visiting areas without internet.',
      },

      {
        audience:
          'Agricultural Experts & Scientists',

        description:
          'Review difficult crop disease cases from fields, confirm diagnoses, and issue official written spray recommendations to farmers.',
      },

      {
        audience:
          'Agriculture Department Officers',

        description:
          'Track district-wide crop health, monitor outbreak zones on a regional map, and send emergency advisory broadcasts to farming clusters.',
      },
    ],

    team:
      'Team ByteHarvest',

    teamTitle:
      'Smart India Hackathon 2026 Contributors',

    footer1:
      'ByteHarvest · Smart Early Crop Disease & Outbreak Intelligence Platform',

    footer2:
      'Smart India Hackathon 2026 · Problem Statement #26131 · Ministry of Agriculture & Farmers Welfare',

    teamMembers: [
      {
        name: 'Rana Yash',
        role:
          'Team Lead & Model Developer',
        specialty:
          'Model Deployment',
        image:
          `${import.meta.env.BASE_URL}team/yash.jpg`,
      },

      {
        name: 'Patel Vedish',
        role:
          'Frontend Developer',
        specialty:
          'UI/UX Design',
        image:
          `${import.meta.env.BASE_URL}team/patel_vedish.jpg`,
      },

      {
        name: 'Shah Aum',
        role:
          'Backend Developer',
        specialty:
          'API & Database Management',
        image:
          `${import.meta.env.BASE_URL}team/shah_aum.jpg`,
      },

      {
        name: 'Shah Devansh',
        role:
          'Documentation Expert',
        specialty:
          'Agronomy',
        image:
          `${import.meta.env.BASE_URL}team/shah_devansh.jpg`,
      },

      {
        name: 'Ved Rohit',
        role:
          'Domain & Technical Researcher',
        specialty:
          'Crop Data & Case Studies',
        image:
          `${import.meta.env.BASE_URL}team/ved_rohit.jpg`,
      },

      {
        name: 'Tripathi Poonam',
        role:
          'User & Field Researcher',
        specialty:
          'Farmer Surveys & Field Insights',
        image:
          `${import.meta.env.BASE_URL}team/tripathi_poonam.jpg`,
      },
    ],
  },


  /* ==========================================================
     HINDI
  =========================================================== */

  hi: {
    eyebrow:
      'स्मार्ट इंडिया हैकाथॉन 2026 · समस्या विवरण #26131',

    heroTitle1:
      'फसल रोग पहचानें',

    heroTitle2:
      'फैलने से पहले।',

    heroSubtitle:
      'ByteHarvest किसानों को पत्तियों के रोग तुरंत पहचानने, सही दवा की मात्रा निकालने और क्षेत्रीय कीट प्रकोप पर नज़र रखने में मदद करता है।',

    enterWorkspace:
      'वर्कस्पेस खोलें',

    signIn:
      'प्लेटफ़ॉर्म में लॉगिन करें',

    ministry:
      'कृषि एवं किसान कल्याण मंत्रालय',

    whatItDoes:
      'यह क्या करता है',

    capabilitiesTitle1:
      'चार मुख्य सुविधाएँ।',

    capabilitiesTitle2:
      'एक एकीकृत प्लेटफ़ॉर्म।',

    capabilities: [
      {
        num: '01',

        title:
          'फसल रोग स्कैनर',

        summary:
          'फोटो से कुछ ही सेकंड में फसल रोग पहचानें।',

        body:
          'संक्रमित पत्ती की फोटो लेकर रोग, फंगल धब्बे और कीट क्षति की पहचान करता है। किसानों को जैविक और स्वीकृत उपचार के बीच स्पष्ट सलाह देता है।',
      },

      {
        num: '02',

        title:
          'जिला प्रकोप निगरानी',

        summary:
          'जानें कि रोग आपके गाँव की ओर बढ़ रहा है या नहीं।',

        body:
          'कृषि जिलों में रोग के फैलाव को मानचित्र पर दिखाता है। अधिकारी जोखिम वाले क्षेत्रों में किसानों को समय पर चेतावनी भेज सकते हैं।',
      },

      {
        num: '03',

        title:
          'स्प्रे और मात्रा कैलकुलेटर',

        summary:
          'आपके खेत के आकार के अनुसार सही दवा और पानी।',

        body:
          'खेत का क्षेत्रफल दर्ज करके दवा की मात्रा, पानी की मात्रा और स्प्रे पंपों की संख्या की गणना करें।',
      },

      {
        num: '04',

        title:
          'कृषि विशेषज्ञ समीक्षा',

        summary:
          'विशेषज्ञों से सीधी सलाह और प्रमाणित निर्देश।',

        body:
          'गंभीर या कठिन मामलों की समीक्षा कृषि विशेषज्ञ करते हैं और किसानों के लिए आधिकारिक उपचार सलाह जारी करते हैं।',
      },
    ],

    whoItServes:
      'यह किसके लिए है',

    stakeholderTitle1:
      'कृषि श्रृंखला के हर हितधारक के लिए',

    stakeholderTitle2:
      'एक ही प्लेटफ़ॉर्म।',

    portals: [
      {
        audience:
          'किसान और उत्पादक',

        description:
          'फसल की पत्तियाँ स्कैन करें, ऑडियो सलाह सुनें, सुधार की निगरानी करें और सही स्प्रे मिश्रण की गणना करें।',
      },

      {
        audience:
          'फील्ड एक्सटेंशन कर्मचारी',

        description:
          'खेत की यात्राएँ योजना बनाएं, मिट्टी और पत्ती के नमूने दर्ज करें और ऑफलाइन रिपोर्ट सुरक्षित रखें।',
      },

      {
        audience:
          'कृषि विशेषज्ञ और वैज्ञानिक',

        description:
          'कठिन मामलों की समीक्षा करें, निदान की पुष्टि करें और किसानों को आधिकारिक सलाह भेजें।',
      },

      {
        audience:
          'कृषि विभाग अधिकारी',

        description:
          'जिला स्तर पर फसल स्वास्थ्य और प्रकोप क्षेत्रों की निगरानी करें और आपातकालीन सलाह भेजें।',
      },
    ],

    team:
      'टीम ByteHarvest',

    teamTitle:
      'स्मार्ट इंडिया हैकाथॉन 2026 योगदानकर्ता',

    footer1:
      'ByteHarvest · स्मार्ट प्रारंभिक फसल रोग और प्रकोप निगरानी प्लेटफ़ॉर्म',

    footer2:
      'स्मार्ट इंडिया हैकाथॉन 2026 · समस्या विवरण #26131 · कृषि एवं किसान कल्याण मंत्रालय',

    teamMembers: [
      {
        name: 'Rana Yash',
        role:
          'टीम लीड और मॉडल डेवलपर',
        specialty:
          'मॉडल परिनियोजन',
        image:
          `${import.meta.env.BASE_URL}team/yash.jpg`,
      },

      {
        name: 'Patel Vedish',
        role:
          'फ्रंटएंड डेवलपर',
        specialty:
          'UI/UX डिजाइन',
        image:
          `${import.meta.env.BASE_URL}team/patel_vedish.jpg`,
      },

      {
        name: 'Shah Aum',
        role:
          'बैकएंड डेवलपर',
        specialty:
          'API और डेटाबेस प्रबंधन',
        image:
          `${import.meta.env.BASE_URL}team/shah_aum.jpg`,
      },

      {
        name: 'Shah Devansh',
        role:
          'दस्तावेज़ विशेषज्ञ',
        specialty:
          'कृषि विज्ञान',
        image:
          `${import.meta.env.BASE_URL}team/shah_devansh.jpg`,
      },

      {
        name: 'Ved Rohit',
        role:
          'डोमेन और तकनीकी शोधकर्ता',
        specialty:
          'फसल डेटा और केस स्टडी',
        image:
          `${import.meta.env.BASE_URL}team/ved_rohit.jpg`,
      },

      {
        name: 'Tripathi Poonam',
        role:
          'उपयोगकर्ता और फील्ड शोधकर्ता',
        specialty:
          'किसान सर्वे और फील्ड जानकारी',
        image:
          `${import.meta.env.BASE_URL}team/tripathi_poonam.jpg`,
      },
    ],
  },


  /* ==========================================================
     MARATHI
  =========================================================== */

  mr: {
    eyebrow:
      'स्मार्ट इंडिया हॅकाथॉन 2026 · समस्या क्रमांक #26131',

    heroTitle1:
      'पीक रोग ओळखा',

    heroTitle2:
      'पसरण्यापूर्वी.',

    heroSubtitle:
      'ByteHarvest शेतकऱ्यांना पानांवरील रोग त्वरित ओळखण्यास, योग्य औषधाची मात्रा मोजण्यास आणि प्रादेशिक किडीच्या प्रादुर्भावावर लक्ष ठेवण्यास मदत करते.',

    enterWorkspace:
      'वर्कस्पेस उघडा',

    signIn:
      'प्लॅटफॉर्ममध्ये लॉगिन करा',

    ministry:
      'कृषी आणि शेतकरी कल्याण मंत्रालय',

    whatItDoes:
      'हे काय करते',

    capabilitiesTitle1:
      'चार मुख्य सुविधा.',

    capabilitiesTitle2:
      'एक एकत्रित प्लॅटफॉर्म.',

    capabilities: [
      {
        num: '01',

        title:
          'पीक रोग स्कॅनर',

        summary:
          'फोटोमधून काही सेकंदात पीक रोग ओळखा.',

        body:
          'संक्रमित पानाचा फोटो घेऊन रोग, बुरशीजन्य डाग आणि किडीचे नुकसान ओळखते. शेतकऱ्यांना जैविक आणि मान्य उपचारांची स्पष्ट माहिती देते.',
      },

      {
        num: '02',

        title:
          'जिल्हा प्रादुर्भाव रडार',

        summary:
          'पीक रोग तुमच्या गावाकडे येत आहे का ते जाणून घ्या.',

        body:
          'कृषी जिल्ह्यांमध्ये रोगाचा प्रसार नकाशावर दाखवते. अधिकारी धोकादायक भागातील शेतकऱ्यांना वेळेवर सूचना पाठवू शकतात.',
      },

      {
        num: '03',

        title:
          'फवारणी आणि मात्रा कॅल्क्युलेटर',

        summary:
          'तुमच्या शेताच्या आकारानुसार योग्य औषध आणि पाणी.',

        body:
          'शेताचे क्षेत्रफळ टाकून औषधाची मात्रा, पाण्याची मात्रा आणि फवारणी पंपांची संख्या मोजा.',
      },

      {
        num: '04',

        title:
          'कृषी तज्ज्ञ पुनरावलोकन',

        summary:
          'तज्ज्ञांकडून थेट मार्गदर्शन आणि अधिकृत सल्ला.',

        body:
          'गंभीर किंवा कठीण प्रकरणांचे तज्ज्ञांकडून पुनरावलोकन केले जाते आणि शेतकऱ्यांना अधिकृत उपचार सल्ला दिला जातो.',
      },
    ],

    whoItServes:
      'हे कोणासाठी आहे',

    stakeholderTitle1:
      'कृषी साखळीतील प्रत्येकासाठी',

    stakeholderTitle2:
      'एकच प्लॅटफॉर्म.',

    portals: [
      {
        audience:
          'शेतकरी आणि उत्पादक',

        description:
          'पीक पाने स्कॅन करा, ऑडिओ सल्ला ऐका, पुनर्प्राप्तीचा मागोवा घ्या आणि योग्य फवारणी मिश्रणाची गणना करा.',
      },

      {
        audience:
          'फील्ड विस्तार कर्मचारी',

        description:
          'शेतभेटी नियोजित करा, माती आणि पानांचे नमुने नोंदवा आणि ऑफलाइन अहवाल जतन करा.',
      },

      {
        audience:
          'कृषी तज्ज्ञ आणि शास्त्रज्ञ',

        description:
          'अवघड प्रकरणांचे पुनरावलोकन करा, निदान निश्चित करा आणि शेतकऱ्यांना अधिकृत सल्ला द्या.',
      },

      {
        audience:
          'कृषी विभाग अधिकारी',

        description:
          'जिल्हानिहाय पीक आरोग्य व प्रादुर्भाव क्षेत्रांचे निरीक्षण करा आणि आपत्कालीन सूचना पाठवा.',
      },
    ],

    team:
      'टीम ByteHarvest',

    teamTitle:
      'स्मार्ट इंडिया हॅकाथॉन 2026 योगदानकर्ते',

    footer1:
      'ByteHarvest · स्मार्ट प्रारंभिक पीक रोग आणि प्रादुर्भाव माहिती प्लॅटफॉर्म',

    footer2:
      'स्मार्ट इंडिया हॅकाथॉन 2026 · समस्या क्रमांक #26131 · कृषी आणि शेतकरी कल्याण मंत्रालय',

    teamMembers: [
      {
        name: 'Rana Yash',
        role:
          'टीम लीड आणि मॉडेल डेव्हलपर',
        specialty:
          'मॉडेल डिप्लॉयमेंट',
        image:
          `${import.meta.env.BASE_URL}team/yash.jpg`,
      },

      {
        name: 'Patel Vedish',
        role:
          'फ्रंटएंड डेव्हलपर',
        specialty:
          'UI/UX डिझाइन',
        image:
          `${import.meta.env.BASE_URL}team/patel_vedish.jpg`,
      },

      {
        name: 'Shah Aum',
        role:
          'बॅकएंड डेव्हलपर',
        specialty:
          'API आणि डेटाबेस व्यवस्थापन',
        image:
          `${import.meta.env.BASE_URL}team/shah_aum.jpg`,
      },

      {
        name: 'Shah Devansh',
        role:
          'दस्तऐवजीकरण तज्ज्ञ',
        specialty:
          'कृषीशास्त्र',
        image:
          `${import.meta.env.BASE_URL}team/shah_devansh.jpg`,
      },

      {
        name: 'Ved Rohit',
        role:
          'डोमेन आणि तांत्रिक संशोधक',
        specialty:
          'पीक डेटा आणि केस स्टडी',
        image:
          `${import.meta.env.BASE_URL}team/ved_rohit.jpg`,
      },

      {
        name: 'Tripathi Poonam',
        role:
          'वापरकर्ता आणि फील्ड संशोधक',
        specialty:
          'शेतकरी सर्वेक्षण आणि फील्ड माहिती',
        image:
          `${import.meta.env.BASE_URL}team/tripathi_poonam.jpg`,
      },
    ],
  },
};


/* ============================================================
   HELPERS
   ============================================================ */

const getInitials = (name) => {
  if (!name) {
    return 'BH';
  }

  const parts =
    name.trim().split(' ');

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`
      .toUpperCase();
  }

  return name
    .substring(0, 2)
    .toUpperCase();
};


/* ============================================================
   TEAM IMAGE POSITION
   ============================================================ */

const getTeamImagePosition = (
  memberName
) => {

  if (
    memberName ===
    'Tripathi Poonam'
  ) {
    /*
     * Poonam's portrait has the subject
     * positioned differently inside the
     * source image, so move the crop upward.
     */
    return 'center 25%';
  }

  return 'center center';
};


/* ============================================================
   HOME PAGE
   ============================================================ */

export const HomePage = () => {

  const navigate =
    useNavigate();

  const {
    currentUser,
    language,
  } = useApp();


  const text =
    homeTranslations[language] ||
    homeTranslations.en;


  /* ==========================================================
     WORKSPACE NAVIGATION
     ========================================================== */

  const handleLaunch = () => {

    if (currentUser) {

      const target =
        ROLES[
          currentUser.role?.toUpperCase()
        ]?.defaultRoute ||
        '/farmer';


      navigate(target);

      return;
    }

    navigate('/login');
  };


  return (
    <div className="w-full">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* ====================================================
            HERO
        ===================================================== */}

        <section className="relative min-h-[78vh] sm:min-h-[82vh] lg:min-h-[86vh] flex flex-col justify-center items-center text-center py-16 sm:py-20 gap-8">

          <div
            aria-hidden="true"
            className="hero-glow-aura"
          />


          {/* Eyebrow */}

          <p className="relative eyebrow-badge">
            {
              text.eyebrow
            }
          </p>


          {/* Hero Content */}

          <div className="relative space-y-5 max-w-4xl">

            <h1 className="hero-headline">

              {
                text.heroTitle1
              }

              <br />

              <span className="text-green-600">
                {
                  text.heroTitle2
                }
              </span>

            </h1>


            <p className="hero-subtitle mx-auto max-w-3xl">
              {
                text.heroSubtitle
              }
            </p>

          </div>


          {/* CTA */}

          <div className="relative flex flex-col sm:flex-row items-center gap-4">

            <Btn
              variant="primary"
              size="lg"
              onClick={
                handleLaunch
              }
            >

              {
                currentUser
                  ? text.enterWorkspace
                  : text.signIn
              }

            </Btn>


            <p className="text-sm text-(--text-tertiary)">
              {
                text.ministry
              }
            </p>

          </div>


          {/* Scroll Nudge */}

          <div className="absolute bottom-6 sm:bottom-8 flex flex-col items-center gap-2 opacity-30">

            <LuArrowDown
              className="w-5 h-5 text-(--text-secondary) animate-bounce"
            />

          </div>

        </section>


        {/* ====================================================
            CAPABILITIES
        ===================================================== */}

        <section className="py-20 sm:py-24 space-y-0">

          <div className="pb-12 sm:pb-14 space-y-2">

            <p className="eyebrow-badge">
              {
                text.whatItDoes
              }
            </p>


            <h2 className="section-headline">

              {
                text.capabilitiesTitle1
              }

              <br />

              {
                text.capabilitiesTitle2
              }

            </h2>

          </div>


          <div className="space-y-0">

            {
              text.capabilities.map(
                (capability) => (

                  <div
                    key={
                      capability.num
                    }
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-10 py-8 sm:py-10 divider-t"
                  >

                    <div className="md:col-span-1">

                      <span className="text-sm font-bold tabular-nums text-green-600/80">
                        {
                          capability.num
                        }
                      </span>

                    </div>


                    <div className="md:col-span-4 space-y-1">

                      <h3 className="text-lg font-semibold leading-snug text-(--text-primary)">
                        {
                          capability.title
                        }
                      </h3>


                      <p className="text-base font-medium text-green-700/90">
                        {
                          capability.summary
                        }
                      </p>

                    </div>


                    <div className="md:col-span-7">

                      <p className="text-base leading-relaxed text-(--text-secondary)">
                        {
                          capability.body
                        }
                      </p>

                    </div>

                  </div>

                )
              )
            }


            <div className="divider-t" />

          </div>

        </section>


        {/* ====================================================
            WHO IT SERVES
        ===================================================== */}

        <section className="py-20 sm:py-24 space-y-12 sm:space-y-14">

          <div className="space-y-2">

            <p className="eyebrow-badge">
              {
                text.whoItServes
              }
            </p>


            <h2 className="section-headline">

              {
                text.stakeholderTitle1
              }

              <br />

              {
                text.stakeholderTitle2
              }

            </h2>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-8 sm:gap-y-10">

            {
              text.portals.map(
                (portal) => (

                  <div
                    key={
                      portal.audience
                    }
                    className="space-y-2"
                  >

                    <h3 className="text-lg font-semibold text-(--text-primary)">
                      {
                        portal.audience
                      }
                    </h3>


                    <p className="text-base leading-relaxed text-(--text-secondary)">
                      {
                        portal.description
                      }
                    </p>

                  </div>

                )
              )
            }

          </div>

        </section>


        {/* ====================================================
            TEAM
        ===================================================== */}

        <section className="py-20 sm:py-24 space-y-10 divider-t">

          <div className="space-y-2">

            <p className="eyebrow-badge">
              {
                text.team
              }
            </p>


            <h2 className="section-headline">
              {
                text.teamTitle
              }
            </h2>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">

            {
              text.teamMembers.map(
                (member) => (

                  <div
                    key={
                      member.name
                    }
                    className="flex items-start gap-4 min-h-[72px]"
                  >

                    {/* =================================================
                        TEAM PHOTO
                    ================================================== */}

                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        overflow-hidden
                        bg-(--bg-raised)
                        border
                        border-(--border-base)
                        shrink-0
                        relative
                      "
                    >

                      <img
                        src={
                          member.image
                        }
                        alt={
                          member.name
                        }
                        className="
                          w-full
                          h-full
                          object-cover
                          object-center
                        "
                        style={{
                          objectPosition:
                            getTeamImagePosition(
                              member.name
                            ),
                        }}
                        loading="lazy"
                        onError={(e) => {

                          e.currentTarget.style.display =
                            'none';

                          const fallback =
                            e.currentTarget
                              .nextElementSibling;

                          if (
                            fallback
                          ) {
                            fallback.style.display =
                              'flex';
                          }

                        }}
                      />


                      {/* =================================================
                          IMAGE FALLBACK
                      ================================================== */}

                      <div
                        className="
                          hidden
                          absolute
                          inset-0
                          bg-green-100
                          items-center
                          justify-center
                        "
                      >

                        <span className="text-sm text-green-700 font-bold">
                          {
                            getInitials(
                              member.name
                            )
                          }
                        </span>

                      </div>

                    </div>


                    {/* =================================================
                        MEMBER INFO
                    ================================================== */}

                    <div
                      className="
                        min-w-0
                        flex-1
                        pt-0.5
                      "
                    >

                      <p
                        className="
                          text-base
                          font-semibold
                          leading-tight
                          text-(--text-primary)
                        "
                      >
                        {
                          member.name
                        }
                      </p>


                      <p
                        className="
                          text-sm
                          leading-tight
                          mt-1
                          text-green-700/90
                        "
                      >
                        {
                          member.role
                        }
                      </p>


                      <p
                        className="
                          text-sm
                          leading-tight
                          mt-1
                          text-(--text-tertiary)
                        "
                      >
                        {
                          member.specialty
                        }
                      </p>

                    </div>

                  </div>

                )
              )
            }

          </div>

        </section>


        {/* ====================================================
            FOOTER
        ===================================================== */}

        <footer className="py-10 space-y-2 text-center divider-t">

          <p className="text-sm text-(--text-tertiary)">
            {
              text.footer1
            }
          </p>


          <p className="text-sm text-(--text-tertiary)">
            {
              text.footer2
            }
          </p>

        </footer>

      </div>

    </div>
  );
};


export default HomePage;