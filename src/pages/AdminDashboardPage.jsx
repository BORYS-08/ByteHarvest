import React, {
  useMemo,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  useApp,
} from '../context/AppContext';

import {
  useScans,
} from '../context/ScanContext';

import {
  initialCropsData,
  sampleDiseaseCatalog,
  samplePestCatalog,
} from '../services/mockData';

import {
  Btn,
} from '../components/common/GlowButton';

import {
  LuShield,
  LuUsers,
  LuSprout,
  LuBug,
  LuActivity,
  LuMapPin,
  LuSearch,
  LuCircleCheck,
  LuCircleAlert,
  LuClock3,
  LuFileText,
  LuArrowLeft,
  LuX,
  LuUserRound,
  LuBookOpen,
  LuScanLine,
  LuChevronRight,
  LuShieldAlert,
} from 'react-icons/lu';


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const translations = {
  en: {
    eyebrow:
      'Platform Administration',

    title:
      'Admin Dashboard',

    subtitle:
      'Monitor users, crop intelligence, disease and pest catalogs, advisories and outbreak activity.',

    overview:
      'Platform Overview',

    users:
      'Registered Users',

    crops:
      'Crop Catalog',

    diseases:
      'Disease / Pest Catalog',

    outbreaks:
      'Active Outbreaks',

    userManagement:
      'User Management',

    catalog:
      'Knowledge Catalog',

    outbreaksSection:
      'Outbreak Monitoring',

    recentActivity:
      'Recent Activity',

    searchUsers:
      'Search users...',

    searchCatalog:
      'Search diseases, pests or crops...',

    allRoles:
      'All Roles',

    allStatuses:
      'All Statuses',

    allTypes:
      'All Types',

    farmer:
      'Farmer',

    extension:
      'Extension Worker',

    expert:
      'Agri-Expert',

    official:
      'Agri-Official',

    admin:
      'Administrator',

    active:
      'Active',

    pending:
      'Pending',

    suspended:
      'Suspended',

    disease:
      'Disease',

    pest:
      'Pest',

    name:
      'Name',

    email:
      'Email',

    role:
      'Role',

    status:
      'Status',

    joined:
      'Joined',

    records:
      'records',

    hotspots:
      'hotspots',

    acres:
      'acres',

    farms:
      'farms',

    view:
      'View',

    details:
      'Details',

    close:
      'Close',

    back:
      'Back to Admin Workspace',

    catalogName:
      'Entry',

    crop:
      'Crop',

    severity:
      'Severity',

    confidence:
      'Confidence',

    symptoms:
      'Symptoms',

    prevention:
      'Prevention',

    damage:
      'Damage',

    organicRemedy:
      'Organic / Bio-Control',

    chemicalRemedy:
      'Chemical Intervention',

    dosage:
      'Dosage',

    noUsers:
      'No users match the selected filters.',

    noCatalog:
      'No catalog entries match the selected filters.',

    noOutbreaks:
      'No active outbreaks found.',

    systemHealth:
      'System Health',

    healthy:
      'All core frontend modules operational',

    apiStatus:
      'API Status',

    mockMode:
      'Frontend Mock Mode',

    quickActions:
      'Quick Actions',

    manageUsers:
      'Manage Users',

    manageCatalog:
      'Manage Catalog',

    viewOutbreaks:
      'View Outbreaks',

    noImage:
      'Image unavailable',

    diseaseOutbreak:
      'Disease Outbreak',

    pestOutbreak:
      'Pest Outbreak',

    affected:
      'affected',

    scan:
      'scan',

    updated:
      'Updated',

    recent:
      'Recent',
  },

  hi: {
    eyebrow:
      'प्लेटफ़ॉर्म प्रशासन',

    title:
      'एडमिन डैशबोर्ड',

    subtitle:
      'उपयोगकर्ताओं, फसल जानकारी, रोग और कीट कैटलॉग, सलाह और प्रकोप गतिविधि की निगरानी करें।',

    overview:
      'प्लेटफ़ॉर्म अवलोकन',

    users:
      'पंजीकृत उपयोगकर्ता',

    crops:
      'फसल कैटलॉग',

    diseases:
      'रोग / कीट कैटलॉग',

    outbreaks:
      'सक्रिय प्रकोप',

    userManagement:
      'उपयोगकर्ता प्रबंधन',

    catalog:
      'ज्ञान कैटलॉग',

    outbreaksSection:
      'प्रकोप निगरानी',

    recentActivity:
      'हाल की गतिविधि',

    searchUsers:
      'उपयोगकर्ता खोजें...',

    searchCatalog:
      'रोग, कीट या फसल खोजें...',

    allRoles:
      'सभी भूमिकाएँ',

    allStatuses:
      'सभी स्थिति',

    allTypes:
      'सभी प्रकार',

    farmer:
      'किसान',

    extension:
      'विस्तार कार्यकर्ता',

    expert:
      'कृषि विशेषज्ञ',

    official:
      'कृषि अधिकारी',

    admin:
      'प्रशासक',

    active:
      'सक्रिय',

    pending:
      'लंबित',

    suspended:
      'निलंबित',

    disease:
      'रोग',

    pest:
      'कीट',

    name:
      'नाम',

    email:
      'ईमेल',

    role:
      'भूमिका',

    status:
      'स्थिति',

    joined:
      'शामिल हुए',

    records:
      'रिकॉर्ड',

    hotspots:
      'हॉटस्पॉट',

    acres:
      'एकड़',

    farms:
      'खेत',

    view:
      'देखें',

    details:
      'विवरण',

    close:
      'बंद करें',

    back:
      'एडमिन वर्कस्पेस पर वापस जाएँ',

    catalogName:
      'प्रविष्टि',

    crop:
      'फसल',

    severity:
      'गंभीरता',

    confidence:
      'विश्वसनीयता',

    symptoms:
      'लक्षण',

    prevention:
      'बचाव',

    damage:
      'नुकसान',

    organicRemedy:
      'जैविक / जैव नियंत्रण',

    chemicalRemedy:
      'रासायनिक उपचार',

    dosage:
      'मात्रा',

    noUsers:
      'चयनित फ़िल्टर से कोई उपयोगकर्ता नहीं मिला।',

    noCatalog:
      'चयनित फ़िल्टर से कोई कैटलॉग प्रविष्टि नहीं मिली।',

    noOutbreaks:
      'कोई सक्रिय प्रकोप नहीं मिला।',

    systemHealth:
      'सिस्टम स्वास्थ्य',

    healthy:
      'सभी मुख्य फ्रंटएंड मॉड्यूल सक्रिय हैं',

    apiStatus:
      'API स्थिति',

    mockMode:
      'फ्रंटएंड मॉक मोड',

    quickActions:
      'त्वरित कार्य',

    manageUsers:
      'उपयोगकर्ता प्रबंधन',

    manageCatalog:
      'कैटलॉग प्रबंधन',

    viewOutbreaks:
      'प्रकोप देखें',

    noImage:
      'चित्र उपलब्ध नहीं है',

    diseaseOutbreak:
      'रोग प्रकोप',

    pestOutbreak:
      'कीट प्रकोप',

    affected:
      'प्रभावित',

    scan:
      'स्कैन',

    updated:
      'अपडेट',

    recent:
      'हाल का',
  },

  mr: {
    eyebrow:
      'प्लॅटफॉर्म प्रशासन',

    title:
      'अॅडमिन डॅशबोर्ड',

    subtitle:
      'वापरकर्ते, पीक माहिती, रोग व कीड कॅटलॉग, सल्ले आणि प्रादुर्भाव क्रियाकलाप यांचे निरीक्षण करा.',

    overview:
      'प्लॅटफॉर्म आढावा',

    users:
      'नोंदणीकृत वापरकर्ते',

    crops:
      'पीक कॅटलॉग',

    diseases:
      'रोग / कीड कॅटलॉग',

    outbreaks:
      'सक्रिय प्रादुर्भाव',

    userManagement:
      'वापरकर्ता व्यवस्थापन',

    catalog:
      'ज्ञान कॅटलॉग',

    outbreaksSection:
      'प्रादुर्भाव निरीक्षण',

    recentActivity:
      'अलीकडील क्रियाकलाप',

    searchUsers:
      'वापरकर्ता शोधा...',

    searchCatalog:
      'रोग, कीड किंवा पीक शोधा...',

    allRoles:
      'सर्व भूमिका',

    allStatuses:
      'सर्व स्थिती',

    allTypes:
      'सर्व प्रकार',

    farmer:
      'शेतकरी',

    extension:
      'विस्तार कर्मचारी',

    expert:
      'कृषी तज्ज्ञ',

    official:
      'कृषी अधिकारी',

    admin:
      'अॅडमिन',

    active:
      'सक्रिय',

    pending:
      'प्रलंबित',

    suspended:
      'निलंबित',

    disease:
      'रोग',

    pest:
      'कीड',

    name:
      'नाव',

    email:
      'ईमेल',

    role:
      'भूमिका',

    status:
      'स्थिती',

    joined:
      'सामील',

    records:
      'नोंदी',

    hotspots:
      'हॉटस्पॉट',

    acres:
      'एकर',

    farms:
      'शेते',

    view:
      'पहा',

    details:
      'तपशील',

    close:
      'बंद करा',

    back:
      'अॅडमिन वर्कस्पेसवर परत जा',

    catalogName:
      'नोंद',

    crop:
      'पीक',

    severity:
      'तीव्रता',

    confidence:
      'विश्वास',

    symptoms:
      'लक्षणे',

    prevention:
      'प्रतिबंध',

    damage:
      'नुकसान',

    organicRemedy:
      'सेंद्रिय / जैव नियंत्रण',

    chemicalRemedy:
      'रासायनिक उपचार',

    dosage:
      'मात्रा',

    noUsers:
      'निवडलेल्या फिल्टरनुसार वापरकर्ते सापडले नाहीत.',

    noCatalog:
      'निवडलेल्या फिल्टरनुसार कॅटलॉग नोंदी सापडल्या नाहीत.',

    noOutbreaks:
      'सक्रिय प्रादुर्भाव सापडले नाहीत.',

    systemHealth:
      'सिस्टम आरोग्य',

    healthy:
      'सर्व मुख्य फ्रंटएंड मॉड्यूल कार्यरत आहेत',

    apiStatus:
      'API स्थिती',

    mockMode:
      'फ्रंटएंड मॉक मोड',

    quickActions:
      'जलद कृती',

    manageUsers:
      'वापरकर्ता व्यवस्थापन',

    manageCatalog:
      'कॅटलॉग व्यवस्थापन',

    viewOutbreaks:
      'प्रादुर्भाव पहा',

    noImage:
      'प्रतिमा उपलब्ध नाही',

    diseaseOutbreak:
      'रोगाचा प्रादुर्भाव',

    pestOutbreak:
      'किडीचा प्रादुर्भाव',

    affected:
      'बाधित',

    scan:
      'स्कॅन',

    updated:
      'अपडेट',

    recent:
      'अलीकडील',
  },
};


/* ============================================================
   MOCK USERS
   ============================================================ */

const mockUsers = [
  {
    id:
      'USR-001',

    name:
      'Ramesh Patel',

    email:
      'ramesh@example.com',

    role:
      'farmer',

    status:
      'Active',

    joined:
      '12 Aug 2026',
  },

  {
    id:
      'USR-002',

    name:
      'Suresh Kumar',

    email:
      'suresh@example.com',

    role:
      'farmer',

    status:
      'Active',

    joined:
      '13 Aug 2026',
  },

  {
    id:
      'USR-003',

    name:
      'Gurpreet Singh',

    email:
      'gurpreet@example.com',

    role:
      'extension',

    status:
      'Active',

    joined:
      '08 Aug 2026',
  },

  {
    id:
      'USR-004',

    name:
      'Dr. V. Sharma',

    email:
      'v.sharma@example.com',

    role:
      'expert',

    status:
      'Active',

    joined:
      '04 Aug 2026',
  },

  {
    id:
      'USR-005',

    name:
      'Anita Rao',

    email:
      'anita.rao@example.com',

    role:
      'official',

    status:
      'Pending',

    joined:
      '20 Aug 2026',
  },

  {
    id:
      'USR-006',

    name:
      'Kavita Devi',

    email:
      'kavita@example.com',

    role:
      'farmer',

    status:
      'Suspended',

    joined:
      '29 Jul 2026',
  },
];


/* ============================================================
   HELPERS
   ============================================================ */

const getRoleLabel = (
  role,
  text
) => {

  const labels = {
    farmer:
      text.farmer,

    extension:
      text.extension,

    expert:
      text.expert,

    official:
      text.official,

    admin:
      text.admin,
  };

  return (
    labels[role] ||
    role
  );
};


const getStatusStyle = (
  status
) => {

  switch (
    status
  ) {

    case 'Pending':
      return {
        background:
          'rgba(245,158,11,0.10)',

        color:
          '#b45309',
      };

    case 'Suspended':
      return {
        background:
          'rgba(239,68,68,0.10)',

        color:
          '#dc2626',
      };

    default:
      return {
        background:
          'rgba(34,197,94,0.10)',

        color:
          '#15803d',
      };
  }
};


const getSeverityStyle = (
  severity
) => {

  switch (
    severity
  ) {

    case 'Critical':
      return {
        background:
          'rgba(239,68,68,0.10)',

        color:
          '#dc2626',
      };

    case 'High':
      return {
        background:
          'rgba(245,158,11,0.10)',

        color:
          '#b45309',
      };

    case 'Healthy':
      return {
        background:
          'rgba(34,197,94,0.10)',

        color:
          '#15803d',
      };

    default:
      return {
        background:
          'rgba(59,130,246,0.10)',

        color:
          '#2563eb',
      };
  }
};


const normalizeCrop = (
  crop
) => {

  const value =
    String(
      crop || ''
    )
      .trim()
      .toLowerCase();


  if (
    value === 'maize' ||
    value ===
      'maize (corn)'
  ) {
    return 'Maize (Corn)';
  }


  if (
    value === 'rice' ||
    value ===
      'rice (paddy)'
  ) {
    return 'Rice (Paddy)';
  }


  return (
    crop ||
    ''
  );
};


const inferDiseaseCrop = (
  item
) => {

  if (
    item.crop
  ) {
    return normalizeCrop(
      item.crop
    );
  }


  const name =
    String(
      item.name || ''
    ).toLowerCase();


  if (
    name.includes(
      'tomato'
    )
  ) {
    return 'Tomato';
  }


  if (
    name.includes(
      'pink bollworm'
    )
  ) {
    return 'Cotton';
  }


  if (
    name.includes(
      'maize'
    ) ||
    name.includes(
      'corn'
    ) ||
    name.includes(
      'fall armyworm'
    )
  ) {
    return 'Maize (Corn)';
  }


  return 'Rice (Paddy)';
};


const getCatalogEntries = () => {

  const diseaseEntries =
    Object.values(
      sampleDiseaseCatalog ||
        {}
    ).map(
      (item) => ({
        id:
          item.id,

        name:
          item.name,

        scientificName:
          item.scientificName,

        crop:
          inferDiseaseCrop(
            item
          ),

        type:
          'disease',

        severity:
          item.severity,

        confidence:
          item.confidence,

        symptoms:
          item.symptoms,

        prevention:
          item.preventiveTips,

        organicRemedy:
          item.organicRemedy,

        chemicalRemedy:
          item.chemicalRemedy,

        dosage:
          item.dosagePerAcre,

        sampleImage:
          item.sampleImage,
      })
    );


  const pestEntries =
    Object.values(
      samplePestCatalog ||
        {}
    ).map(
      (item) => ({
        id:
          item.id,

        name:
          item.name,

        scientificName:
          item.scientificName,

        crop:
          normalizeCrop(
            item.crop
          ),

        type:
          'pest',

        severity:
          item.severity ||
          item.riskLevel,

        confidence:
          item.confidence,

        symptoms:
          item.symptoms,

        damage:
          item.damage,

        prevention:
          item.preventiveTips,

        organicRemedy:
          item.organicRemedy,

        chemicalRemedy:
          item.chemicalRemedy,

        dosage:
          item.dosagePerAcre,

        pestCount:
          item.pestCount,

        sampleImage:
          item.sampleImage,
      })
    );


  return [
    ...diseaseEntries,
    ...pestEntries,
  ];
};


/* ============================================================
   ADMIN DASHBOARD
   ============================================================ */

export const AdminDashboardPage = () => {

  const navigate =
    useNavigate();


  const {
    language,
    activeRole,
  } = useApp();


  const {
    scans = [],
    outbreaks = [],
  } = useScans();


  const text =
    translations[
      language
    ] ||
    translations.en;


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    userSearch,
    setUserSearch,
  ] = useState('');


  const [
    userRole,
    setUserRole,
  ] = useState('all');


  const [
    userStatus,
    setUserStatus,
  ] = useState('all');


  const [
    catalogSearch,
    setCatalogSearch,
  ] = useState('');


  const [
    catalogType,
    setCatalogType,
  ] = useState('all');


  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);


  /* ==========================================================
     CATALOG
     ========================================================== */

  const catalogEntries =
    useMemo(
      () =>
        getCatalogEntries(),
      []
    );


  /* ==========================================================
     USER FILTER
     ========================================================== */

  const filteredUsers =
    useMemo(() => {

      const query =
        userSearch
          .trim()
          .toLowerCase();


      return mockUsers.filter(
        (user) => {

          const matchesSearch =
            !query ||
            `${user.name} ${user.email} ${user.role}`
              .toLowerCase()
              .includes(
                query
              );


          const matchesRole =
            userRole ===
              'all' ||
            user.role ===
              userRole;


          const matchesStatus =
            userStatus ===
              'all' ||
            user.status ===
              userStatus;


          return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
          );

        }
      );

    }, [
      userSearch,
      userRole,
      userStatus,
    ]);


  /* ==========================================================
     CATALOG FILTER
     ========================================================== */

  const filteredCatalog =
    useMemo(() => {

      const query =
        catalogSearch
          .trim()
          .toLowerCase();


      return catalogEntries.filter(
        (entry) => {

          const searchable =
            [
              entry.name,
              entry.scientificName,
              entry.crop,
              entry.symptoms,
              entry.damage,
              entry.prevention,
            ]
              .filter(
                Boolean
              )
              .join(' ')
              .toLowerCase();


          const matchesSearch =
            !query ||
            searchable.includes(
              query
            );


          const matchesType =
            catalogType ===
              'all' ||
            entry.type ===
              catalogType;


          return (
            matchesSearch &&
            matchesType
          );

        }
      );

    }, [
      catalogEntries,
      catalogSearch,
      catalogType,
    ]);


  /* ==========================================================
     KPI VALUES
     ========================================================== */

  const totalAffectedFarms =
    useMemo(
      () =>
        outbreaks.reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item.activeFarms ||
                0
            ),
          0
        ),
      [
        outbreaks,
      ]
    );


  const totalAffectedAcres =
    useMemo(
      () =>
        outbreaks.reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item.infectedAcres ||
                0
            ),
          0
        ),
      [
        outbreaks,
      ]
    );


  const verifiedScans =
    useMemo(
      () =>
        scans.filter(
          (scan) =>
            scan.status ===
            'Expert Verified'
        ).length,
      [
        scans,
      ]
    );


  const pendingScans =
    useMemo(
      () =>
        scans.filter(
          (scan) =>
            scan.status !==
              'Expert Verified' &&
            scan.status !==
              'Rejected by Expert'
        ).length,
      [
        scans,
      ]
    );


  /* ==========================================================
     ACTIVITY
     ========================================================== */

  const activity =
    useMemo(() => {

      const scanActivity =
        scans
          .slice(0, 4)
          .map(
            (scan) => ({
              type:
                'scan',

              title:
                `${scan.crop || 'Crop'} — ${
                  scan.disease ||
                  scan.pest ||
                  'Scan'
                }`,

              description:
                scan.status ||
                'AI Identified',

              time:
                scan.date ||
                text.recent,
            })
          );


      const outbreakActivity =
        outbreaks
          .slice(0, 3)
          .map(
            (outbreak) => {

              const resultName =
                outbreak.pest ||
                outbreak.disease ||
                (
                  outbreak
                    .detectionType ===
                  'pest'
                    ? text.pest
                    : text.disease
                );


              return {
                type:
                  'outbreak',

                title:
                  `${outbreak.district || '—'} — ${resultName}`,

                description:
                  outbreak.status ||
                  text.active,

                time:
                  outbreak.updatedAt ||
                  text.recent,
              };

            }
          );


      return [
        ...scanActivity,
        ...outbreakActivity,
      ].slice(0, 6);

    }, [
      scans,
      outbreaks,
      text,
    ]);


  /* ==========================================================
     NAVIGATION
     ========================================================== */

  const scrollToSection =
    (id) => {

      const element =
        document.getElementById(
          id
        );


      element?.scrollIntoView({
        behavior:
          'smooth',

        block:
          'start',
      });

    };


  const handleBack =
    () => {

      if (
        activeRole ===
        'admin'
      ) {
        return;
      }


      navigate(
        '/admin'
      );

    };


  /* ==========================================================
     IMAGE FALLBACK
     ========================================================== */

  const handleImageError =
    (event) => {

      event.currentTarget.style.display =
        'none';


      const fallback =
        event.currentTarget
          .nextSibling;


      if (fallback) {
        fallback.style.display =
          'flex';
      }
    };


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">


      {/* ======================================================
          HEADER
      ======================================================= */}

      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-4"
        style={{
          borderBottom:
            '1px solid var(--border-base)',

          paddingBottom:
            '1rem',
        }}
      >

        <div>

          <p
            className="text-sm uppercase tracking-wide font-semibold"
            style={{
              color:
                'var(--text-tertiary)',
            }}
          >
            {
              text.eyebrow
            }
          </p>


          <h1
            className="text-2xl sm:text-3xl font-bold mt-2 flex items-center gap-2"
            style={{
              color:
                'var(--text-primary)',
            }}
          >

            <LuShield className="w-6 h-6 text-red-500" />

            {
              text.title
            }

          </h1>


          <p
            className="text-sm mt-2 max-w-3xl"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {
              text.subtitle
            }
          </p>

        </div>


        <Btn
          variant="secondary"
          size="sm"
          onClick={
            handleBack
          }
        >

          <LuArrowLeft className="w-4 h-4" />

          {
            text.back
          }

        </Btn>

      </div>


      {/* ======================================================
          KPI CARDS
      ======================================================= */}

      <section>

        <div className="mb-3">

          <h2
            className="text-lg font-semibold"
            style={{
              color:
                'var(--text-primary)',
            }}
          >
            {
              text.overview
            }
          </h2>

        </div>


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

          {[
            {
              title:
                text.users,

              value:
                mockUsers.length,

              subtitle:
                `${mockUsers.filter(
                  (user) =>
                    user.status ===
                    'Active'
                ).length} ${text.active.toLowerCase()}`,

              icon:
                LuUsers,

              iconClass:
                'text-blue-600',
            },

            {
              title:
                text.crops,

              value:
                initialCropsData.length,

              subtitle:
                text.records,

              icon:
                LuSprout,

              iconClass:
                'text-green-600',
            },

            {
              title:
                text.diseases,

              value:
                catalogEntries.length,

              subtitle:
                `${catalogEntries.filter(
                  (entry) =>
                    entry.type ===
                    'disease'
                ).length} ${
                  text.disease
                } · ${
                  catalogEntries.filter(
                    (entry) =>
                      entry.type ===
                      'pest'
                  ).length
                } ${
                  text.pest
                }`,

              icon:
                LuBug,

              iconClass:
                'text-amber-600',
            },

            {
              title:
                text.outbreaks,

              value:
                outbreaks.length,

              subtitle:
                `${totalAffectedAcres.toLocaleString(
                  'en-IN'
                )} ${text.acres}`,

              icon:
                LuMapPin,

              iconClass:
                'text-red-600',
            },
          ].map(
            (metric) => {

              const Icon =
                metric.icon;


              return (
                <div
                  key={
                    metric.title
                  }
                  className="card p-4"
                >

                  <div className="flex items-center justify-between gap-3">

                    <span className="metric-label">
                      {
                        metric.title
                      }
                    </span>


                    <div
                      className="p-2 rounded-md"
                      style={{
                        background:
                          'var(--bg-raised)',

                        border:
                          '1px solid var(--border-base)',
                      }}
                    >

                      <Icon
                        className={`w-5 h-5 ${metric.iconClass}`}
                      />

                    </div>

                  </div>


                  <p
                    className="text-2xl font-bold mt-3"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {
                      metric.value
                    }
                  </p>


                  <p
                    className="text-sm mt-1"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      metric.subtitle
                    }
                  </p>

                </div>
              );
            }
          )}

        </div>

      </section>


      {/* ======================================================
          SYSTEM STATUS
      ======================================================= */}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">

        <div
          className="card p-4 flex items-start gap-3"
          style={{
            borderLeft:
              '3px solid rgba(34,197,94,0.35)',
          }}
        >

          <LuCircleCheck className="w-5 h-5 text-green-600 mt-0.5" />


          <div>

            <p
              className="text-sm font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {
                text.systemHealth
              }
            </p>


            <p
              className="text-sm mt-1"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {
                text.healthy
              }
            </p>

          </div>

        </div>


        <div className="card p-4 flex items-start gap-3">

          <LuActivity className="w-5 h-5 text-sky-600 mt-0.5" />


          <div>

            <p
              className="text-sm font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {
                text.apiStatus
              }
            </p>


            <p
              className="text-sm mt-1"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {
                text.mockMode
              }
            </p>

          </div>

        </div>


        <div className="card p-4 flex items-start gap-3">

          <LuFileText className="w-5 h-5 text-amber-600 mt-0.5" />


          <div>

            <p
              className="text-sm font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {
                text.recentActivity
              }
            </p>


            <p
              className="text-sm mt-1"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >

              {
                verifiedScans
              }{' '}

              {
                text.active.toLowerCase()
              }{' '}

              {
                text.records
              }

              {' · '}

              {
                pendingScans
              }{' '}

              {
                text.pending.toLowerCase()
              }

            </p>

          </div>

        </div>

      </section>


      {/* ======================================================
          USER MANAGEMENT
      ======================================================= */}

      <section
        id="admin-users"
        className="card p-5 scroll-mt-24"
      >

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">

          <div>

            <h2
              className="text-lg font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {
                text.userManagement
              }
            </h2>


            <p
              className="text-sm mt-1"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {
                filteredUsers.length
              }{' '}
              {
                text.records
              }
            </p>

          </div>


          <div className="flex flex-col sm:flex-row gap-2">

            <div className="relative">

              <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-tertiary)" />


              <input
                type="text"
                value={
                  userSearch
                }
                onChange={(e) =>
                  setUserSearch(
                    e.target.value
                  )
                }
                placeholder={
                  text.searchUsers
                }
                className="field-input field-input-icon w-full sm:w-64"
              />

            </div>


            <select
              value={
                userRole
              }
              onChange={(e) =>
                setUserRole(
                  e.target.value
                )
              }
              className="field-select"
            >

              <option value="all">
                {
                  text.allRoles
                }
              </option>

              <option value="farmer">
                {
                  text.farmer
                }
              </option>

              <option value="extension">
                {
                  text.extension
                }
              </option>

              <option value="expert">
                {
                  text.expert
                }
              </option>

              <option value="official">
                {
                  text.official
                }
              </option>

            </select>


            <select
              value={
                userStatus
              }
              onChange={(e) =>
                setUserStatus(
                  e.target.value
                )
              }
              className="field-select"
            >

              <option value="all">
                {
                  text.allStatuses
                }
              </option>

              <option value="Active">
                {
                  text.active
                }
              </option>

              <option value="Pending">
                {
                  text.pending
                }
              </option>

              <option value="Suspended">
                {
                  text.suspended
                }
              </option>

            </select>

          </div>

        </div>


        {filteredUsers.length ===
        0 ? (

          <div
            className="p-10 text-center"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {
              text.noUsers
            }
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>

                <tr
                  style={{
                    borderBottom:
                      '1px solid var(--border-base)',
                  }}
                >

                  <th className="text-left py-3 pr-4 font-semibold text-(--text-tertiary)">
                    {
                      text.name
                    }
                  </th>

                  <th className="text-left py-3 pr-4 font-semibold text-(--text-tertiary)">
                    {
                      text.email
                    }
                  </th>

                  <th className="text-left py-3 pr-4 font-semibold text-(--text-tertiary)">
                    {
                      text.role
                    }
                  </th>

                  <th className="text-left py-3 pr-4 font-semibold text-(--text-tertiary)">
                    {
                      text.status
                    }
                  </th>

                  <th className="text-left py-3 font-semibold text-(--text-tertiary)">
                    {
                      text.joined
                    }
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredUsers.map(
                  (user) => {

                    const style =
                      getStatusStyle(
                        user.status
                      );


                    return (
                      <tr
                        key={
                          user.id
                        }
                        className="border-b last:border-b-0"
                        style={{
                          borderColor:
                            'var(--border-base)',
                        }}
                      >

                        <td className="py-3 pr-4">

                          <div className="flex items-center gap-2">

                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center"
                              style={{
                                background:
                                  'var(--accent-green-muted)',
                              }}
                            >

                              <LuUserRound className="w-4 h-4 text-green-600" />

                            </div>


                            <span
                              className="font-medium"
                              style={{
                                color:
                                  'var(--text-primary)',
                              }}
                            >
                              {
                                user.name
                              }
                            </span>

                          </div>

                        </td>


                        <td
                          className="py-3 pr-4"
                          style={{
                            color:
                              'var(--text-secondary)',
                          }}
                        >
                          {
                            user.email
                          }
                        </td>


                        <td
                          className="py-3 pr-4"
                          style={{
                            color:
                              'var(--text-secondary)',
                          }}
                        >
                          {
                            getRoleLabel(
                              user.role,
                              text
                            )
                          }
                        </td>


                        <td className="py-3 pr-4">

                          <span
                            className="px-2 py-1 rounded-md text-xs font-semibold"
                            style={{
                              background:
                                style.background,

                              color:
                                style.color,
                            }}
                          >
                            {
                              user.status
                            }
                          </span>

                        </td>


                        <td
                          className="py-3"
                          style={{
                            color:
                              'var(--text-tertiary)',
                          }}
                        >
                          {
                            user.joined
                          }
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>


      {/* ======================================================
          CATALOG
      ======================================================= */}

      <section
        id="admin-catalog"
        className="card p-5 scroll-mt-24"
      >

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">

          <div>

            <h2
              className="text-lg font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {
                text.catalog
              }
            </h2>


            <p
              className="text-sm mt-1"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {
                filteredCatalog.length
              }{' '}
              {
                text.records
              }
            </p>

          </div>


          <div className="flex flex-col sm:flex-row gap-2">

            <div className="relative">

              <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-tertiary)" />


              <input
                type="text"
                value={
                  catalogSearch
                }
                onChange={(e) =>
                  setCatalogSearch(
                    e.target.value
                  )
                }
                placeholder={
                  text.searchCatalog
                }
                className="field-input field-input-icon w-full sm:w-72"
              />

            </div>


            <select
              value={
                catalogType
              }
              onChange={(e) =>
                setCatalogType(
                  e.target.value
                )
              }
              className="field-select"
            >

              <option value="all">
                {
                  text.allTypes
                }
              </option>

              <option value="disease">
                {
                  text.disease
                }
              </option>

              <option value="pest">
                {
                  text.pest
                }
              </option>

            </select>

          </div>

        </div>


        {filteredCatalog.length ===
        0 ? (

          <div className="p-10 text-center">

            <p
              className="text-sm"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {
                text.noCatalog
              }
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {filteredCatalog.map(
              (entry) => {

                const severityStyle =
                  getSeverityStyle(
                    entry.severity
                  );


                return (
                  <button
                    key={
                      entry.id
                    }
                    type="button"
                    onClick={() =>
                      setSelectedItem(
                        {
                          type:
                            'catalog',

                          data:
                            entry,
                        }
                      )
                    }
                    className="p-4 rounded-md text-left cursor-pointer card-hover"
                    style={{
                      background:
                        'var(--bg-raised)',

                      border:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex items-start gap-3 min-w-0">

                        <div
                          className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                          style={{
                            background:
                              entry.type ===
                              'pest'
                                ? 'rgba(245,158,11,0.10)'
                                : 'rgba(34,197,94,0.10)',
                          }}
                        >

                          {entry.type ===
                          'pest' ? (
                            <LuBug className="w-5 h-5 text-amber-600" />
                          ) : (
                            <LuShieldAlert className="w-5 h-5 text-green-600" />
                          )}

                        </div>


                        <div className="min-w-0">

                          <p
                            className="text-sm font-semibold truncate"
                            style={{
                              color:
                                'var(--text-primary)',
                            }}
                          >
                            {
                              entry.name
                            }
                          </p>


                          <p
                            className="text-xs mt-1 italic truncate"
                            style={{
                              color:
                                'var(--text-tertiary)',
                            }}
                          >
                            {
                              entry.scientificName
                            }
                          </p>

                        </div>

                      </div>


                      <LuChevronRight className="w-4 h-4 text-(--text-tertiary) shrink-0" />

                    </div>


                    <div className="flex flex-wrap items-center gap-2 mt-3">

                      <span className="text-xs px-2 py-1 rounded-md bg-(--bg-surface) text-(--text-secondary)">
                        {
                          entry.crop
                        }
                      </span>


                      <span className="text-xs px-2 py-1 rounded-md bg-(--bg-surface) text-(--text-secondary)">
                        {
                          entry.type ===
                          'pest'
                            ? text.pest
                            : text.disease
                        }
                      </span>


                      <span
                        className="text-xs px-2 py-1 rounded-md font-semibold"
                        style={{
                          background:
                            severityStyle.background,

                          color:
                            severityStyle.color,
                        }}
                      >
                        {
                          entry.severity
                        }
                      </span>

                    </div>

                  </button>
                );
              }
            )}

          </div>
        )}

      </section>


      {/* ======================================================
          OUTBREAK MONITORING
      ======================================================= */}

      <section
        id="admin-outbreaks"
        className="card p-5 scroll-mt-24"
      >

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">

          <div>

            <h2
              className="text-lg font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {
                text.outbreaksSection
              }
            </h2>


            <p
              className="text-sm mt-1"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {
                outbreaks.length
              }{' '}
              {
                text.hotspots
              }
              {' · '}
              {
                totalAffectedFarms
              }{' '}
              {
                text.farms
              }
            </p>

          </div>


          <Btn
            variant="secondary"
            size="sm"
            onClick={() =>
              navigate(
                '/heatmap'
              )
            }
          >

            <LuMapPin className="w-4 h-4" />

            {
              text.viewOutbreaks
            }

          </Btn>

        </div>


        {outbreaks.length ===
        0 ? (

          <div className="p-8 text-center">

            <p
              className="text-sm"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {
                text.noOutbreaks
              }
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

            {outbreaks.map(
              (
                outbreak
              ) => {

                const isPest =
                  outbreak.detectionType ===
                    'pest' ||
                  Boolean(
                    outbreak.pest
                  );


                const resultName =
                  isPest
                    ? (
                        outbreak.pest ||
                        text.pest
                      )
                    : (
                        outbreak.disease ||
                        text.disease
                      );


                const severityStyle =
                  getSeverityStyle(
                    outbreak.severity
                  );


                return (
                  <div
                    key={
                      outbreak.id
                    }
                    className="p-4 rounded-md"
                    style={{
                      background:
                        'var(--bg-raised)',

                      border:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <p
                          className="text-sm font-semibold truncate"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            outbreak.district
                          }
                        </p>


                        <p
                          className="text-xs mt-1 truncate"
                          style={{
                            color:
                              'var(--text-tertiary)',
                          }}
                        >
                          {
                            normalizeCrop(
                              outbreak.crop
                            )
                          }
                          {' · '}
                          {
                            resultName
                          }
                        </p>

                      </div>


                      <span
                        className="text-xs px-2 py-1 rounded-md font-semibold shrink-0"
                        style={{
                          background:
                            severityStyle.background,

                          color:
                            severityStyle.color,
                        }}
                      >
                        {
                          outbreak.severity ||
                          '—'
                        }
                      </span>

                    </div>


                    <div className="grid grid-cols-2 gap-2 mt-4">

                      <div
                        className="p-3 rounded-md"
                        style={{
                          background:
                            'var(--bg-surface)',
                        }}
                      >

                        <p className="metric-label">
                          {
                            text.acres
                          }
                        </p>


                        <p
                          className="text-sm font-semibold mt-1"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            Number(
                              outbreak.infectedAcres ||
                                0
                            ).toLocaleString(
                              'en-IN'
                            )
                          }
                        </p>

                      </div>


                      <div
                        className="p-3 rounded-md"
                        style={{
                          background:
                            'var(--bg-surface)',
                        }}
                      >

                        <p className="metric-label">
                          {
                            text.farms
                          }
                        </p>


                        <p
                          className="text-sm font-semibold mt-1"
                          style={{
                            color:
                              'var(--text-primary)',
                          }}
                        >
                          {
                            Number(
                              outbreak.activeFarms ||
                                0
                            )
                          }
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center gap-2 mt-3 text-xs">

                      <LuClock3 className="w-3.5 h-3.5 text-(--text-tertiary)" />


                      <span
                        style={{
                          color:
                            'var(--text-tertiary)',
                        }}
                      >
                        {
                          outbreak.updatedAt ||
                          text.recent
                        }
                      </span>


                      <span
                        className="ml-auto font-medium truncate"
                        style={{
                          color:
                            'var(--text-secondary)',
                        }}
                      >
                        {
                          outbreak.status ||
                          text.active
                        }
                      </span>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </section>


      {/* ======================================================
          RECENT ACTIVITY
      ======================================================= */}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="card p-5">

          <h2
            className="text-lg font-semibold mb-4"
            style={{
              color:
                'var(--text-primary)',
            }}
          >
            {
              text.recentActivity
            }
          </h2>


          {activity.length ===
          0 ? (

            <p
              className="text-sm"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              —
            </p>

          ) : (

            <div className="space-y-3">

              {activity.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={`${item.title}-${index}`}
                    className="flex items-start gap-3 p-3 rounded-md"
                    style={{
                      background:
                        'var(--bg-raised)',
                    }}
                  >

                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background:
                          item.type ===
                          'outbreak'
                            ? 'rgba(239,68,68,0.10)'
                            : 'rgba(34,197,94,0.10)',
                      }}
                    >

                      {item.type ===
                      'outbreak' ? (
                        <LuCircleAlert className="w-4 h-4 text-red-500" />
                      ) : (
                        <LuScanLine className="w-4 h-4 text-green-600" />
                      )}

                    </div>


                    <div className="min-w-0 flex-1">

                      <p
                        className="text-sm font-medium truncate"
                        style={{
                          color:
                            'var(--text-primary)',
                        }}
                      >
                        {
                          item.title
                        }
                      </p>


                      <p
                        className="text-xs mt-1"
                        style={{
                          color:
                            'var(--text-tertiary)',
                        }}
                      >
                        {
                          item.description
                        }
                      </p>

                    </div>


                    <span
                      className="text-xs shrink-0"
                      style={{
                        color:
                          'var(--text-tertiary)',
                      }}
                    >
                      {
                        item.time
                      }
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* ====================================================
            QUICK ACTIONS
        ===================================================== */}

        <div className="card p-5">

          <h2
            className="text-lg font-semibold mb-4"
            style={{
              color:
                'var(--text-primary)',
            }}
          >
            {
              text.quickActions
            }
          </h2>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <button
              type="button"
              onClick={() =>
                scrollToSection(
                  'admin-users'
                )
              }
              className="p-4 rounded-md text-left border cursor-pointer hover:bg-black/5 transition-colors"
              style={{
                borderColor:
                  'var(--border-base)',
              }}
            >

              <LuUsers className="w-5 h-5 text-blue-600 mb-3" />


              <p
                className="text-sm font-semibold"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {
                  text.manageUsers
                }
              </p>

            </button>


            <button
              type="button"
              onClick={() =>
                scrollToSection(
                  'admin-catalog'
                )
              }
              className="p-4 rounded-md text-left border cursor-pointer hover:bg-black/5 transition-colors"
              style={{
                borderColor:
                  'var(--border-base)',
              }}
            >

              <LuBookOpen className="w-5 h-5 text-green-600 mb-3" />


              <p
                className="text-sm font-semibold"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {
                  text.manageCatalog
                }
              </p>

            </button>


            <button
              type="button"
              onClick={() =>
                navigate(
                  '/heatmap'
                )
              }
              className="p-4 rounded-md text-left border cursor-pointer hover:bg-black/5 transition-colors"
              style={{
                borderColor:
                  'var(--border-base)',
              }}
            >

              <LuMapPin className="w-5 h-5 text-red-600 mb-3" />


              <p
                className="text-sm font-semibold"
                style={{
                  color:
                    'var(--text-primary)',
                }}
              >
                {
                  text.viewOutbreaks
                }
              </p>

            </button>

          </div>

        </div>

      </section>


      {/* ======================================================
          DETAIL MODAL
      ======================================================= */}

      {selectedItem && (

        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              background:
                'var(--bg-surface)',

              border:
                '1px solid var(--border-base)',

              borderRadius:
                '0.75rem',
            }}
          >

            {/* Header */}

            <div
              className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
              style={{
                background:
                  'var(--bg-surface)',

                borderBottom:
                  '1px solid var(--border-base)',
              }}
            >

              <div>

                <p
                  className="text-xs"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >
                  {
                    text.details
                  }
                </p>


                <h2
                  className="text-xl font-bold mt-1"
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {
                    selectedItem
                      .data
                      .name
                  }
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedItem(
                    null
                  )
                }
                className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-black/5 cursor-pointer"
                aria-label={
                  text.close
                }
              >

                <LuX className="w-5 h-5" />

              </button>

            </div>


            <div className="p-5 space-y-5">


              {/* Image */}

              {selectedItem
                .data
                .sampleImage && (

                <div
                  className="relative rounded-lg overflow-hidden bg-(--bg-raised)"
                >

                  <img
                    src={
                      selectedItem
                        .data
                        .sampleImage
                    }
                    alt={
                      selectedItem
                        .data
                        .name
                    }
                    className="w-full h-56 object-cover"
                    onError={
                      handleImageError
                    }
                  />


                  <div className="hidden absolute inset-0 items-center justify-center text-(--text-tertiary)">

                    <div className="flex flex-col items-center gap-2">

                      <LuBug className="w-8 h-8" />

                      <span className="text-sm">
                        {
                          text.noImage
                        }
                      </span>

                    </div>

                  </div>

                </div>
              )}


              {/* Main metadata */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {[
                  [
                    text.catalogName,
                    selectedItem
                      .data
                      .name,
                  ],

                  [
                    text.crop,
                    selectedItem
                      .data
                      .crop ||
                      '—',
                  ],

                  [
                    text.severity,
                    selectedItem
                      .data
                      .severity ||
                      '—',
                  ],

                  [
                    text.confidence,
                    selectedItem
                      .data
                      .confidence !==
                    undefined &&
                    selectedItem
                      .data
                      .confidence !==
                    null
                      ? `${selectedItem.data.confidence}%`
                      : '—',
                  ],

                  [
                    text.disease,
                    selectedItem
                      .data
                      .type ===
                    'pest'
                      ? text.pest
                      : text.disease,
                  ],
                ].map(
                  (
                    [
                      label,
                      value,
                    ]
                  ) => (

                    <div
                      key={
                        label
                      }
                      className="p-4 rounded-md bg-(--bg-raised) border border-(--border-base)"
                    >

                      <p className="text-xs text-(--text-tertiary)">
                        {
                          label
                        }
                      </p>


                      <p className="text-sm font-semibold mt-1 text-(--text-primary)">
                        {
                          value
                        }
                      </p>

                    </div>

                  )
                )}

              </div>


              {/* Symptoms */}

              <div>

                <p className="text-sm font-semibold text-(--text-primary)">
                  {
                    text.symptoms
                  }
                </p>


                <p
                  className="text-sm leading-relaxed mt-1"
                  style={{
                    color:
                      'var(--text-secondary)',
                  }}
                >
                  {
                    selectedItem
                      .data
                      .symptoms ||
                    '—'
                  }
                </p>

              </div>


              {/* Damage */}

              {selectedItem
                .data
                .damage && (

                <div>

                  <p className="text-sm font-semibold text-(--text-primary)">
                    {
                      text.damage
                    }
                  </p>


                  <p
                    className="text-sm leading-relaxed mt-1"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      selectedItem
                        .data
                        .damage
                    }
                  </p>

                </div>
              )}


              {/* Prevention */}

              <div>

                <p className="text-sm font-semibold text-(--text-primary)">
                  {
                    text.prevention
                  }
                </p>


                <p
                  className="text-sm leading-relaxed mt-1"
                  style={{
                    color:
                      'var(--text-secondary)',
                  }}
                >
                  {
                    selectedItem
                      .data
                      .prevention ||
                    '—'
                  }
                </p>

              </div>


              {/* Remedies */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div
                  className="p-4 rounded-md"
                  style={{
                    background:
                      'rgba(34,197,94,0.06)',

                    border:
                      '1px solid rgba(34,197,94,0.15)',
                  }}
                >

                  <p className="text-sm font-semibold text-(--text-primary)">
                    {
                      text.organicRemedy
                    }
                  </p>


                  <p
                    className="text-sm leading-relaxed mt-1"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      selectedItem
                        .data
                        .organicRemedy ||
                      '—'
                    }
                  </p>

                </div>


                <div
                  className="p-4 rounded-md"
                  style={{
                    background:
                      'rgba(245,158,11,0.06)',

                    border:
                      '1px solid rgba(245,158,11,0.15)',
                  }}
                >

                  <p className="text-sm font-semibold text-(--text-primary)">
                    {
                      text.chemicalRemedy
                    }
                  </p>


                  <p
                    className="text-sm leading-relaxed mt-1"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {
                      selectedItem
                        .data
                        .chemicalRemedy ||
                      '—'
                    }
                  </p>

                </div>

              </div>


              {/* Dosage */}

              <div>

                <p className="text-sm font-semibold text-(--text-primary)">
                  {
                    text.dosage
                  }
                </p>


                <p
                  className="text-sm leading-relaxed mt-1"
                  style={{
                    color:
                      'var(--text-secondary)',
                  }}
                >
                  {
                    selectedItem
                      .data
                      .dosage ||
                    '—'
                  }
                </p>

              </div>


              <Btn
                variant="primary"
                size="md"
                onClick={() =>
                  setSelectedItem(
                    null
                  )
                }
                className="w-full justify-center"
              >
                {
                  text.close
                }
              </Btn>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


export default AdminDashboardPage;