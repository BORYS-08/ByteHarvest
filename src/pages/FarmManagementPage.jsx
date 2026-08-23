import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LuMapPin,
  LuPlus,
  LuPencil,
  LuTrash2,
  LuLandmark,
  LuLocateFixed,
  LuRuler,
  LuArrowLeft,
  LuSave,
  LuX,
  LuCheck,
} from 'react-icons/lu';

const initialFarms = [
  {
    id: 1,
    name: 'Main Paddy Field',
    location: 'Ludhiana, Punjab',
    area: 4.5,
    crop: 'Rice (Paddy)',
    variety: 'PR 126',
    sowingDate: '2026-06-18',
    boundary: 'Mapped',
    status: 'Healthy',
  },
  {
    id: 2,
    name: 'North Vegetable Field',
    location: 'Nashik, Maharashtra',
    area: 2.75,
    crop: 'Tomato',
    variety: 'Arka Rakshak',
    sowingDate: '2026-07-05',
    boundary: 'Mapped',
    status: 'Watch',
  },
];

const emptyFarm = {
  name: '',
  location: '',
  area: '',
  crop: 'Rice (Paddy)',
  variety: '',
  sowingDate: '',
  boundary: 'Not Mapped',
};

const translations = {
  en: {
    back: 'Back to Dashboard',
    eyebrow: 'Farm Management',
    title: 'My Farms & Fields',
    description:
      'Add your fields, location, area and crop details in one place.',
    addFarm: 'Add Farm',

    totalFarms: 'Total Farms',
    registeredFields: 'Registered fields',
    totalArea: 'Total Area',
    combinedArea: 'Combined farm area',
    mappedFields: 'Mapped Fields',
    gpsReady: 'GPS/boundary ready',

    editFarm: 'Edit Farm',
    addNewFarm: 'Add New Farm',
    formDescription:
      'Enter the basic details of your field.',
    close: 'Close form',

    farmName: 'Farm Name',
    farmLocation: 'Farm Location',
    fieldArea: 'Field Area (Acres)',
    crop: 'Crop',
    cropVariety: 'Crop Variety',
    sowingDate: 'Sowing Date',
    fieldBoundary: 'Field Boundary',

    farmNamePlaceholder: 'e.g. Main Paddy Field',
    locationPlaceholder:
      'Village, district or GPS coordinates',
    areaPlaceholder: 'e.g. 4.5',
    varietyPlaceholder: 'e.g. PR 126',

    useLocation: 'Use my current location',
    boundaryDescription:
      'Use your current GPS location as a simple frontend map placeholder.',
    boundaryMapped: 'Boundary Mapped',
    markBoundary: 'Mark Boundary',

    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    addFarmButton: 'Add Farm',

    myFields: 'My Fields',
    manageFields:
      'Manage your farms and field information.',
    farms: 'farms',

    noFarms: 'No farms added yet',
    noFarmsDescription:
      'Add your first farm to start managing your fields.',
    addFirstFarm: 'Add My First Farm',

    area: 'Area',
    variety: 'Variety',
    statusHealthy: 'Healthy',
    statusWatch: 'Watch',
    notAdded: 'Not added',
    ready: 'Ready',
    notMapped: 'Not mapped',

    deleteConfirm:
      'Are you sure you want to remove this farm?',

    errors: {
      locationUnavailable:
        'Location services are not available in this browser.',
      locationFailed:
        'Unable to access your location. Please enter it manually.',
      farmName: 'Please enter a farm name.',
      location: 'Please enter the farm location.',
      area: 'Please enter a valid field area.',
      sowingDate: 'Please select the sowing date.',
    },
  },

  hi: {
    back: 'डैशबोर्ड पर वापस जाएँ',
    eyebrow: 'खेत प्रबंधन',
    title: 'मेरे खेत और क्षेत्र',
    description:
      'अपने खेत, स्थान, क्षेत्रफल और फसल की जानकारी एक ही जगह दर्ज करें।',
    addFarm: 'खेत जोड़ें',

    totalFarms: 'कुल खेत',
    registeredFields: 'पंजीकृत क्षेत्र',
    totalArea: 'कुल क्षेत्रफल',
    combinedArea: 'कुल खेत क्षेत्र',
    mappedFields: 'मैप किए गए क्षेत्र',
    gpsReady: 'GPS/सीमा तैयार',

    editFarm: 'खेत संपादित करें',
    addNewFarm: 'नया खेत जोड़ें',
    formDescription:
      'अपने खेत की मूल जानकारी दर्ज करें।',
    close: 'फॉर्म बंद करें',

    farmName: 'खेत का नाम',
    farmLocation: 'खेत का स्थान',
    fieldArea: 'खेत का क्षेत्रफल (एकड़)',
    crop: 'फसल',
    cropVariety: 'फसल की किस्म',
    sowingDate: 'बुवाई की तारीख',
    fieldBoundary: 'खेत की सीमा',

    farmNamePlaceholder: 'जैसे मुख्य धान का खेत',
    locationPlaceholder:
      'गाँव, जिला या GPS निर्देशांक',
    areaPlaceholder: 'जैसे 4.5',
    varietyPlaceholder: 'जैसे PR 126',

    useLocation: 'मेरी वर्तमान लोकेशन का उपयोग करें',
    boundaryDescription:
      'वर्तमान GPS लोकेशन का उपयोग करके फ्रंटएंड मैप सीमा निर्धारित करें।',
    boundaryMapped: 'सीमा मैप की गई',
    markBoundary: 'सीमा चिह्नित करें',

    cancel: 'रद्द करें',
    saveChanges: 'बदलाव सहेजें',
    addFarmButton: 'खेत जोड़ें',

    myFields: 'मेरे खेत',
    manageFields:
      'अपने खेत और क्षेत्र की जानकारी प्रबंधित करें।',
    farms: 'खेत',

    noFarms: 'अभी कोई खेत नहीं जोड़ा गया',
    noFarmsDescription:
      'अपने खेतों को प्रबंधित करना शुरू करने के लिए पहला खेत जोड़ें।',
    addFirstFarm: 'मेरा पहला खेत जोड़ें',

    area: 'क्षेत्रफल',
    variety: 'किस्म',
    statusHealthy: 'स्वस्थ',
    statusWatch: 'निगरानी',
    notAdded: 'जोड़ा नहीं गया',
    ready: 'तैयार',
    notMapped: 'मैप नहीं किया गया',

    deleteConfirm:
      'क्या आप वाकई इस खेत को हटाना चाहते हैं?',

    errors: {
      locationUnavailable:
        'इस ब्राउज़र में लोकेशन सेवा उपलब्ध नहीं है।',
      locationFailed:
        'आपकी लोकेशन प्राप्त नहीं हो सकी। कृपया इसे मैन्युअली दर्ज करें।',
      farmName: 'कृपया खेत का नाम दर्ज करें।',
      location: 'कृपया खेत का स्थान दर्ज करें।',
      area: 'कृपया सही खेत क्षेत्रफल दर्ज करें।',
      sowingDate: 'कृपया बुवाई की तारीख चुनें।',
    },
  },

  mr: {
    back: 'डॅशबोर्डवर परत जा',
    eyebrow: 'शेती व्यवस्थापन',
    title: 'माझी शेती आणि शेतजमीन',
    description:
      'तुमच्या शेताची जागा, क्षेत्रफळ आणि पिकाची माहिती एकाच ठिकाणी नोंदवा.',
    addFarm: 'शेत जोडा',

    totalFarms: 'एकूण शेते',
    registeredFields: 'नोंदणीकृत शेतजमीन',
    totalArea: 'एकूण क्षेत्रफळ',
    combinedArea: 'एकत्रित शेत क्षेत्र',
    mappedFields: 'मॅप केलेली शेतजमीन',
    gpsReady: 'GPS/सीमा तयार',

    editFarm: 'शेत संपादित करा',
    addNewFarm: 'नवीन शेत जोडा',
    formDescription:
      'तुमच्या शेताची मूलभूत माहिती भरा.',
    close: 'फॉर्म बंद करा',

    farmName: 'शेताचे नाव',
    farmLocation: 'शेताचे ठिकाण',
    fieldArea: 'शेताचे क्षेत्रफळ (एकर)',
    crop: 'पीक',
    cropVariety: 'पीक वाण',
    sowingDate: 'पेरणीची तारीख',
    fieldBoundary: 'शेताची सीमा',

    farmNamePlaceholder: 'उदा. मुख्य भाताचे शेत',
    locationPlaceholder:
      'गाव, जिल्हा किंवा GPS निर्देशांक',
    areaPlaceholder: 'उदा. 4.5',
    varietyPlaceholder: 'उदा. PR 126',

    useLocation: 'माझे सध्याचे लोकेशन वापरा',
    boundaryDescription:
      'सध्याच्या GPS लोकेशनचा वापर करून फ्रंटएंड मॅप सीमा दर्शवा.',
    boundaryMapped: 'सीमा मॅप केली',
    markBoundary: 'सीमा चिन्हांकित करा',

    cancel: 'रद्द करा',
    saveChanges: 'बदल जतन करा',
    addFarmButton: 'शेत जोडा',

    myFields: 'माझी शेतजमीन',
    manageFields:
      'तुमची शेते आणि शेतजमिनीची माहिती व्यवस्थापित करा.',
    farms: 'शेते',

    noFarms: 'अजून कोणतेही शेत जोडलेले नाही',
    noFarmsDescription:
      'तुमची शेतजमीन व्यवस्थापित करण्यासाठी पहिले शेत जोडा.',
    addFirstFarm: 'माझे पहिले शेत जोडा',

    area: 'क्षेत्रफळ',
    variety: 'वाण',
    statusHealthy: 'निरोगी',
    statusWatch: 'निगराणी',
    notAdded: 'जोडलेले नाही',
    ready: 'तयार',
    notMapped: 'मॅप केलेले नाही',

    deleteConfirm:
      'तुम्हाला हे शेत नक्की हटवायचे आहे का?',

    errors: {
      locationUnavailable:
        'या ब्राउझरमध्ये लोकेशन सेवा उपलब्ध नाही.',
      locationFailed:
        'तुमचे लोकेशन मिळवता आले नाही. कृपया ते स्वतः भरा.',
      farmName: 'कृपया शेताचे नाव भरा.',
      location: 'कृपया शेताचे ठिकाण भरा.',
      area: 'कृपया योग्य क्षेत्रफळ भरा.',
      sowingDate: 'कृपया पेरणीची तारीख निवडा.',
    },
  },
};

export const FarmManagementPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const text =
    translations[language] || translations.en;

  const [farms, setFarms] = useState(initialFarms);
  const [showForm, setShowForm] = useState(false);
  const [editingFarmId, setEditingFarmId] = useState(null);
  const [formData, setFormData] = useState(emptyFarm);
  const [errorMsg, setErrorMsg] = useState('');

  const totalArea = useMemo(() => {
    return farms.reduce(
      (total, farm) =>
        total + Number(farm.area || 0),
      0
    );
  }, [farms]);

  const mappedFields = farms.filter(
    (farm) => farm.boundary === 'Mapped'
  ).length;

  const openAddForm = () => {
    setEditingFarmId(null);
    setFormData(emptyFarm);
    setErrorMsg('');
    setShowForm(true);
  };

  const openEditForm = (farm) => {
    setEditingFarmId(farm.id);

    setFormData({
      name: farm.name,
      location: farm.location,
      area: farm.area,
      crop: farm.crop,
      variety: farm.variety,
      sowingDate: farm.sowingDate,
      boundary: farm.boundary,
    });

    setErrorMsg('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingFarmId(null);
    setFormData(emptyFarm);
    setErrorMsg('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMsg('');
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg(
        text.errors.locationUnavailable
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;

        setFormData((prev) => ({
          ...prev,
          location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          boundary: 'Mapped',
        }));

        setErrorMsg('');
      },
      () => {
        setErrorMsg(
          text.errors.locationFailed
        );
      }
    );
  };

  const handleSaveFarm = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg(text.errors.farmName);
      return;
    }

    if (!formData.location.trim()) {
      setErrorMsg(text.errors.location);
      return;
    }

    if (
      !formData.area ||
      Number(formData.area) <= 0
    ) {
      setErrorMsg(text.errors.area);
      return;
    }

    if (!formData.sowingDate) {
      setErrorMsg(text.errors.sowingDate);
      return;
    }

    const farmToSave = {
      ...formData,
      area: Number(formData.area),
      boundary:
        formData.boundary === 'Mapped'
          ? 'Mapped'
          : 'Not Mapped',

      status: editingFarmId
        ? farms.find(
            (farm) =>
              farm.id === editingFarmId
          )?.status || 'Healthy'
        : 'Healthy',
    };

    if (editingFarmId) {
      setFarms((prev) =>
        prev.map((farm) =>
          farm.id === editingFarmId
            ? { ...farm, ...farmToSave }
            : farm
        )
      );
    } else {
      setFarms((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...farmToSave,
        },
      ]);
    }

    closeForm();
  };

  const handleDeleteFarm = (id) => {
    const confirmed = window.confirm(
      text.deleteConfirm
    );

    if (!confirmed) return;

    setFarms((prev) =>
      prev.filter((farm) => farm.id !== id)
    );
  };

  const getStatusLabel = (status) => {
    if (status === 'Healthy') {
      return text.statusHealthy;
    }

    if (status === 'Watch') {
      return text.statusWatch;
    }

    return status;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Header */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        style={{
          borderBottom:
            '1px solid var(--border-base)',
          paddingBottom: '1rem',
        }}
      >

        <div>

          <button
            type="button"
            onClick={() => navigate('/farmer')}
            className="inline-flex items-center gap-2 text-sm font-medium mb-2"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            <LuArrowLeft className="w-4 h-4" />
            {text.back}
          </button>

          <p
            className="text-sm uppercase tracking-wide font-semibold"
            style={{
              color: 'var(--text-tertiary)',
            }}
          >
            {text.eyebrow}
          </p>

          <h1
            className="text-2xl sm:text-3xl font-bold mt-1 flex items-center gap-2"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            <LuLandmark className="w-6 h-6 text-green-600" />
            {text.title}
          </h1>

          <p
            className="text-base mt-2"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            {text.description}
          </p>

        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="btn-primary-action inline-flex items-center gap-2 px-4 py-3 text-base"
        >
          <LuPlus className="w-5 h-5" />
          {text.addFarm}
        </button>

      </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        <div className="card p-4">

          <p className="metric-label">
            {text.totalFarms}
          </p>

          <p
            className="text-2xl font-bold mt-2"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            {farms.length}
          </p>

          <p
            className="text-sm mt-1"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            {text.registeredFields}
          </p>

        </div>


        <div className="card p-4">

          <p className="metric-label">
            {text.totalArea}
          </p>

          <p
            className="text-2xl font-bold mt-2"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            {totalArea.toFixed(2)} ac
          </p>

          <p
            className="text-sm mt-1"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            {text.combinedArea}
          </p>

        </div>


        <div className="card p-4">

          <p className="metric-label">
            {text.mappedFields}
          </p>

          <p
            className="text-2xl font-bold mt-2"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            {mappedFields}
          </p>

          <p
            className="text-sm mt-1"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            {text.gpsReady}
          </p>

        </div>

      </div>


      {/* Add / Edit Farm Form */}
      {showForm && (
        <div
          className="card p-5 sm:p-6 space-y-5"
          style={{
            borderLeft:
              '3px solid rgba(34, 197, 94, 0.35)',
          }}
        >

          <div className="flex items-center justify-between gap-3">

            <div>

              <h2
                className="text-lg font-semibold"
                style={{
                  color: 'var(--text-primary)',
                }}
              >
                {editingFarmId
                  ? text.editFarm
                  : text.addNewFarm}
              </h2>

              <p
                className="text-sm mt-1"
                style={{
                  color: 'var(--text-secondary)',
                }}
              >
                {text.formDescription}
              </p>

            </div>

            <button
              type="button"
              onClick={closeForm}
              className="p-2 rounded-md"
              style={{
                color: 'var(--text-secondary)',
              }}
              aria-label={text.close}
            >
              <LuX className="w-5 h-5" />
            </button>

          </div>


          {/* Error */}
          {errorMsg && (
            <div
              className="p-3 rounded-md text-sm"
              style={{
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#B91C1C',
              }}
            >
              {errorMsg}
            </div>
          )}


          <form
            onSubmit={handleSaveFarm}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            {/* Farm Name */}
            <div>

              <label className="block text-sm font-medium mb-2">
                {text.farmName}
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={text.farmNamePlaceholder}
                className="field-input"
              />

            </div>


            {/* Location */}
            <div>

              <label className="block text-sm font-medium mb-2">
                {text.farmLocation}
              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={text.locationPlaceholder}
                  className="field-input"
                />

                <button
                  type="button"
                  onClick={handleUseLocation}
                  className="p-3 rounded-md shrink-0"
                  style={{
                    background:
                      'var(--bg-raised)',
                    border:
                      '1px solid var(--border-mid)',
                    color:
                      'var(--accent-green)',
                  }}
                  title={text.useLocation}
                >
                  <LuLocateFixed className="w-5 h-5" />
                </button>

              </div>

            </div>


            {/* Area */}
            <div>

              <label className="block text-sm font-medium mb-2">
                {text.fieldArea}
              </label>

              <div className="relative">

                <LuRuler className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-tertiary)" />

                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder={text.areaPlaceholder}
                  className="field-input field-input-icon"
                />

              </div>

            </div>


            {/* Crop */}
            <div>

              <label className="block text-sm font-medium mb-2">
                {text.crop}
              </label>

              <select
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                className="field-select"
              >
                <option value="Rice (Paddy)">
                  Rice (Paddy)
                </option>

                <option value="Tomato">
                  Tomato
                </option>

                <option value="Cotton">
                  Cotton
                </option>

                <option value="Maize">
                  Maize
                </option>

                <option value="Wheat">
                  Wheat
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

            </div>


            {/* Variety */}
            <div>

              <label className="block text-sm font-medium mb-2">
                {text.cropVariety}
              </label>

              <input
                type="text"
                name="variety"
                value={formData.variety}
                onChange={handleChange}
                placeholder={text.varietyPlaceholder}
                className="field-input"
              />

            </div>


            {/* Sowing Date */}
            <div>

              <label className="block text-sm font-medium mb-2">
                {text.sowingDate}
              </label>

              <input
                type="date"
                name="sowingDate"
                value={formData.sowingDate}
                onChange={handleChange}
                className="field-input"
              />

            </div>


            {/* Boundary */}
            <div className="md:col-span-2">

              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-md"
                style={{
                  background:
                    'var(--bg-raised)',
                  border:
                    '1px solid var(--border-base)',
                }}
              >

                <div>

                  <p
                    className="text-base font-semibold"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {text.fieldBoundary}
                  </p>

                  <p
                    className="text-sm mt-1"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {text.boundaryDescription}
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      boundary:
                        prev.boundary === 'Mapped'
                          ? 'Not Mapped'
                          : 'Mapped',
                    }))
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold shrink-0"
                  style={{
                    background:
                      formData.boundary ===
                      'Mapped'
                        ? 'var(--accent-green-muted)'
                        : 'var(--bg-surface)',

                    color:
                      formData.boundary ===
                      'Mapped'
                        ? 'var(--accent-green)'
                        : 'var(--text-secondary)',

                    border:
                      '1px solid var(--border-mid)',
                  }}
                >

                  {formData.boundary === 'Mapped' ? (
                    <>
                      <LuCheck className="w-4 h-4" />
                      {text.boundaryMapped}
                    </>
                  ) : (
                    <>
                      <LuMapPin className="w-4 h-4" />
                      {text.markBoundary}
                    </>
                  )}

                </button>

              </div>

            </div>


            {/* Form Actions */}
            <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-2 pt-1">

              <button
                type="button"
                onClick={closeForm}
                className="px-4 py-3 rounded-md text-base font-medium"
                style={{
                  background:
                    'var(--bg-surface)',
                  border:
                    '1px solid var(--border-mid)',
                  color:
                    'var(--text-secondary)',
                }}
              >
                {text.cancel}
              </button>

              <button
                type="submit"
                className="btn-primary-action inline-flex items-center justify-center gap-2 px-4 py-3 text-base"
              >
                <LuSave className="w-5 h-5" />

                {editingFarmId
                  ? text.saveChanges
                  : text.addFarmButton}
              </button>

            </div>

          </form>
        </div>
      )}


      {/* Farm List */}
      <div className="space-y-3">

        <div className="flex items-center justify-between gap-3">

          <div>

            <h2
              className="text-lg font-semibold"
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {text.myFields}
            </h2>

            <p
              className="text-sm mt-1"
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              {text.manageFields}
            </p>

          </div>

          <span
            className="text-sm px-3 py-1.5 rounded-md"
            style={{
              background:
                'var(--bg-raised)',
              color:
                'var(--text-secondary)',
              border:
                '1px solid var(--border-base)',
            }}
          >
            {farms.length} {text.farms}
          </span>

        </div>


        {farms.length === 0 ? (

          <div
            className="card p-10 text-center"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >

            <LuLandmark className="w-10 h-10 mx-auto mb-3 opacity-40" />

            <p className="text-base font-semibold">
              {text.noFarms}
            </p>

            <p className="text-sm mt-1">
              {text.noFarmsDescription}
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="btn-primary-action mt-4 inline-flex items-center gap-2 px-4 py-3 text-base"
            >
              <LuPlus className="w-5 h-5" />
              {text.addFirstFarm}
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {farms.map((farm) => (

              <div
                key={farm.id}
                className="card p-5 space-y-4"
              >

                {/* Farm Header */}
                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <h3
                      className="text-lg font-semibold truncate"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {farm.name}
                    </h3>

                    <p
                      className="text-sm mt-1 flex items-center gap-1.5"
                      style={{
                        color:
                          'var(--text-secondary)',
                      }}
                    >
                      <LuMapPin className="w-4 h-4 text-green-600 shrink-0" />
                      {farm.location}
                    </p>

                  </div>


                  <span
                    className="text-sm px-2.5 py-1 rounded-md shrink-0"
                    style={{
                      background:
                        farm.status === 'Watch'
                          ? 'rgba(245, 158, 11, 0.1)'
                          : 'rgba(34, 197, 94, 0.1)',

                      color:
                        farm.status === 'Watch'
                          ? '#B45309'
                          : 'var(--accent-green)',

                      border:
                        farm.status === 'Watch'
                          ? '1px solid rgba(245, 158, 11, 0.2)'
                          : '1px solid rgba(34, 197, 94, 0.2)',
                    }}
                  >
                    {getStatusLabel(
                      farm.status
                    )}
                  </span>

                </div>


                {/* Farm Details */}
                <div className="grid grid-cols-2 gap-3">

                  <div
                    className="p-3 rounded-md"
                    style={{
                      background:
                        'var(--bg-raised)',
                      border:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <p className="metric-label">
                      {text.area}
                    </p>

                    <p
                      className="text-base font-semibold mt-1"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {farm.area} acres
                    </p>

                  </div>


                  <div
                    className="p-3 rounded-md"
                    style={{
                      background:
                        'var(--bg-raised)',
                      border:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <p className="metric-label">
                      {text.crop}
                    </p>

                    <p
                      className="text-base font-semibold mt-1"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {farm.crop}
                    </p>

                  </div>


                  <div
                    className="p-3 rounded-md"
                    style={{
                      background:
                        'var(--bg-raised)',
                      border:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <p className="metric-label">
                      {text.variety}
                    </p>

                    <p
                      className="text-base font-semibold mt-1"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {farm.variety ||
                        text.notAdded}
                    </p>

                  </div>


                  <div
                    className="p-3 rounded-md"
                    style={{
                      background:
                        'var(--bg-raised)',
                      border:
                        '1px solid var(--border-base)',
                    }}
                  >

                    <p className="metric-label">
                      {text.sowingDate}
                    </p>

                    <p
                      className="text-base font-semibold mt-1"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {farm.sowingDate}
                    </p>

                  </div>

                </div>


                {/* Boundary */}
                <div
                  className="flex items-center justify-between gap-3 p-3 rounded-md"
                  style={{
                    background:
                      'var(--bg-surface)',
                    border:
                      '1px solid var(--border-base)',
                  }}
                >

                  <div className="flex items-center gap-2">

                    <LuMapPin className="w-5 h-5 text-green-600" />

                    <div>

                      <p
                        className="text-sm font-semibold"
                        style={{
                          color:
                            'var(--text-primary)',
                        }}
                      >
                        {text.fieldBoundary}
                      </p>

                      <p
                        className="text-sm"
                        style={{
                          color:
                            'var(--text-secondary)',
                        }}
                      >
                        {farm.boundary ===
                        'Mapped'
                          ? text.boundaryMapped
                          : text.notMapped}
                      </p>

                    </div>

                  </div>


                  <span
                    className="text-sm"
                    style={{
                      color:
                        farm.boundary ===
                        'Mapped'
                          ? 'var(--accent-green)'
                          : 'var(--text-tertiary)',
                    }}
                  >
                    {farm.boundary ===
                    'Mapped'
                      ? text.ready
                      : text.notMapped}
                  </span>

                </div>


                {/* Actions */}
                <div
                  className="flex items-center justify-end gap-2 pt-1"
                  style={{
                    borderTop:
                      '1px solid var(--border-base)',
                  }}
                >

                  <button
                    type="button"
                    onClick={() =>
                      openEditForm(farm)
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium"
                    style={{
                      background:
                        'var(--bg-surface)',
                      border:
                        '1px solid var(--border-mid)',
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    <LuPencil className="w-4 h-4" />
                    {language === 'hi'
                      ? 'संपादित करें'
                      : language === 'mr'
                        ? 'संपादित करा'
                        : 'Edit'}
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteFarm(farm.id)
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium"
                    style={{
                      background: '#FEF2F2',
                      border:
                        '1px solid #FECACA',
                      color: '#B91C1C',
                    }}
                  >
                    <LuTrash2 className="w-4 h-4" />

                    {language === 'hi'
                      ? 'हटाएँ'
                      : language === 'mr'
                        ? 'हटवा'
                        : 'Delete'}
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default FarmManagementPage;