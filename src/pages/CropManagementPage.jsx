import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LuArrowLeft,
  LuPlus,
  LuPencil,
  LuTrash2,
  LuSprout,
  LuCalendarDays,
  LuMapPin,
  LuCheck,
  LuX,
  LuSave,
} from 'react-icons/lu';

const initialCrops = [
  {
    id: 1,
    farmName: 'Main Paddy Field',
    crop: 'Rice (Paddy)',
    variety: 'PR 126',
    sowingDate: '2026-06-18',
    stage: 'Tillering',
    area: 4.5,
    fieldDetails: 'Irrigated field with good drainage',
    status: 'Healthy',
  },
  {
    id: 2,
    farmName: 'North Vegetable Field',
    crop: 'Tomato',
    variety: 'Arka Rakshak',
    sowingDate: '2026-07-05',
    stage: 'Vegetative Growth',
    area: 2.75,
    fieldDetails: 'Open field with drip irrigation',
    status: 'Watch',
  },
];

const emptyCrop = {
  farmName: '',
  crop: 'Rice (Paddy)',
  variety: '',
  sowingDate: '',
  stage: 'Seedling',
  area: '',
  fieldDetails: '',
};

const cropStages = [
  'Seedling',
  'Vegetative Growth',
  'Tillering',
  'Flowering',
  'Fruiting',
  'Grain Filling',
  'Maturity',
  'Harvest Ready',
];

const translations = {
  en: {
    back: 'Back to Dashboard',
    eyebrow: 'Crop Management',
    title: 'My Crops & Field Details',
    description:
      'Track crops, varieties, sowing dates and growth stages.',
    addCrop: 'Add Crop',

    totalRecords: 'Total Crop Records',
    activeRecords: 'Active crop records',
    cropArea: 'Crop Area',
    totalManagedArea: 'Total managed area',
    healthyCrops: 'Healthy Crops',
    currentlyHealthy: 'Currently healthy',

    editCrop: 'Edit Crop',
    addNewCrop: 'Add New Crop',
    formDescription:
      'Add the crop details for your selected field.',
    close: 'Close form',

    farmFieldName: 'Farm / Field Name',
    crop: 'Crop',
    cropVariety: 'Crop Variety',
    sowingDate: 'Sowing Date',
    growthStage: 'Crop Growth Stage',
    area: 'Crop Area (Acres)',
    fieldDetails: 'Field Details',

    farmPlaceholder: 'e.g. Main Paddy Field',
    varietyPlaceholder: 'e.g. PR 126',
    areaPlaceholder: 'e.g. 4.5',
    fieldDetailsPlaceholder:
      'Add irrigation type, soil information, field observations or other useful details...',

    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    addCropButton: 'Add Crop',

    myCrops: 'My Crops',
    manageCrops:
      'View and manage crop information by field.',
    crops: 'crops',

    noCrops: 'No crops added yet',
    noCropsDescription:
      'Add your first crop to start tracking its growth.',
    addFirstCrop: 'Add My First Crop',

    variety: 'Variety',
    sowing: 'Sowing Date',
    stage: 'Growth Stage',
    noDetails: 'No field details added.',

    healthy: 'Healthy',
    watch: 'Watch',

    deleteConfirm:
      'Are you sure you want to remove this crop record?',

    errors: {
      farmName:
        'Please enter the farm or field name.',
      crop: 'Please select a crop.',
      variety:
        'Please enter the crop variety.',
      sowingDate:
        'Please select the sowing date.',
      area:
        'Please enter a valid crop area.',
    },

    stages: {
      Seedling: 'Seedling',
      'Vegetative Growth': 'Vegetative Growth',
      Tillering: 'Tillering',
      Flowering: 'Flowering',
      Fruiting: 'Fruiting',
      'Grain Filling': 'Grain Filling',
      Maturity: 'Maturity',
      'Harvest Ready': 'Harvest Ready',
    },
  },

  hi: {
    back: 'डैशबोर्ड पर वापस जाएँ',
    eyebrow: 'फसल प्रबंधन',
    title: 'मेरी फसलें और खेत की जानकारी',
    description:
      'फसल, किस्म, बुवाई की तारीख और विकास अवस्था को ट्रैक करें।',
    addCrop: 'फसल जोड़ें',

    totalRecords: 'कुल फसल रिकॉर्ड',
    activeRecords: 'सक्रिय फसल रिकॉर्ड',
    cropArea: 'फसल क्षेत्र',
    totalManagedArea: 'कुल प्रबंधित क्षेत्र',
    healthyCrops: 'स्वस्थ फसलें',
    currentlyHealthy: 'वर्तमान में स्वस्थ',

    editCrop: 'फसल संपादित करें',
    addNewCrop: 'नई फसल जोड़ें',
    formDescription:
      'चयनित खेत की फसल की जानकारी दर्ज करें।',
    close: 'फॉर्म बंद करें',

    farmFieldName: 'खेत / क्षेत्र का नाम',
    crop: 'फसल',
    cropVariety: 'फसल की किस्म',
    sowingDate: 'बुवाई की तारीख',
    growthStage: 'फसल विकास अवस्था',
    area: 'फसल क्षेत्रफल (एकड़)',
    fieldDetails: 'खेत की जानकारी',

    farmPlaceholder: 'जैसे मुख्य धान का खेत',
    varietyPlaceholder: 'जैसे PR 126',
    areaPlaceholder: 'जैसे 4.5',
    fieldDetailsPlaceholder:
      'सिंचाई का प्रकार, मिट्टी की जानकारी, खेत का निरीक्षण या अन्य उपयोगी जानकारी दर्ज करें...',

    cancel: 'रद्द करें',
    saveChanges: 'बदलाव सहेजें',
    addCropButton: 'फसल जोड़ें',

    myCrops: 'मेरी फसलें',
    manageCrops:
      'खेत के अनुसार फसल की जानकारी देखें और प्रबंधित करें।',
    crops: 'फसलें',

    noCrops: 'अभी कोई फसल नहीं जोड़ी गई',
    noCropsDescription:
      'फसल की वृद्धि को ट्रैक करने के लिए अपनी पहली फसल जोड़ें।',
    addFirstCrop: 'मेरी पहली फसल जोड़ें',

    variety: 'किस्म',
    sowing: 'बुवाई की तारीख',
    stage: 'विकास अवस्था',
    noDetails: 'खेत की कोई जानकारी नहीं जोड़ी गई।',

    healthy: 'स्वस्थ',
    watch: 'निगरानी',

    deleteConfirm:
      'क्या आप वाकई इस फसल रिकॉर्ड को हटाना चाहते हैं?',

    errors: {
      farmName:
        'कृपया खेत या क्षेत्र का नाम दर्ज करें।',
      crop: 'कृपया फसल चुनें।',
      variety:
        'कृपया फसल की किस्म दर्ज करें।',
      sowingDate:
        'कृपया बुवाई की तारीख चुनें।',
      area:
        'कृपया सही फसल क्षेत्रफल दर्ज करें।',
    },

    stages: {
      Seedling: 'पौध अवस्था',
      'Vegetative Growth': 'वानस्पतिक वृद्धि',
      Tillering: 'कल्ले निकलना',
      Flowering: 'फूल आना',
      Fruiting: 'फल बनना',
      'Grain Filling': 'दाना भरना',
      Maturity: 'परिपक्वता',
      'Harvest Ready': 'कटाई के लिए तैयार',
    },
  },

  mr: {
    back: 'डॅशबोर्डवर परत जा',
    eyebrow: 'पीक व्यवस्थापन',
    title: 'माझी पिके आणि शेताची माहिती',
    description:
      'पिके, वाण, पेरणीच्या तारखा आणि वाढीच्या अवस्था ट्रॅक करा.',
    addCrop: 'पीक जोडा',

    totalRecords: 'एकूण पीक नोंदी',
    activeRecords: 'सक्रिय पीक नोंदी',
    cropArea: 'पीक क्षेत्र',
    totalManagedArea: 'एकूण व्यवस्थापित क्षेत्र',
    healthyCrops: 'निरोगी पिके',
    currentlyHealthy: 'सध्या निरोगी',

    editCrop: 'पीक संपादित करा',
    addNewCrop: 'नवीन पीक जोडा',
    formDescription:
      'निवडलेल्या शेतासाठी पिकाची माहिती भरा.',
    close: 'फॉर्म बंद करा',

    farmFieldName: 'शेत / क्षेत्राचे नाव',
    crop: 'पीक',
    cropVariety: 'पीक वाण',
    sowingDate: 'पेरणीची तारीख',
    growthStage: 'पीक वाढीची अवस्था',
    area: 'पीक क्षेत्रफळ (एकर)',
    fieldDetails: 'शेताची माहिती',

    farmPlaceholder: 'उदा. मुख्य भाताचे शेत',
    varietyPlaceholder: 'उदा. PR 126',
    areaPlaceholder: 'उदा. 4.5',
    fieldDetailsPlaceholder:
      'सिंचनाचा प्रकार, मातीची माहिती, शेतातील निरीक्षणे किंवा इतर उपयुक्त माहिती भरा...',

    cancel: 'रद्द करा',
    saveChanges: 'बदल जतन करा',
    addCropButton: 'पीक जोडा',

    myCrops: 'माझी पिके',
    manageCrops:
      'शेतानुसार पिकाची माहिती पहा आणि व्यवस्थापित करा.',
    crops: 'पिके',

    noCrops: 'अजून कोणतेही पीक जोडलेले नाही',
    noCropsDescription:
      'पिकाची वाढ ट्रॅक करण्यासाठी पहिले पीक जोडा.',
    addFirstCrop: 'माझे पहिले पीक जोडा',

    variety: 'वाण',
    sowing: 'पेरणीची तारीख',
    stage: 'वाढीची अवस्था',
    noDetails: 'शेताची माहिती जोडलेली नाही.',

    healthy: 'निरोगी',
    watch: 'निगराणी',

    deleteConfirm:
      'तुम्हाला ही पीक नोंद नक्की हटवायची आहे का?',

    errors: {
      farmName:
        'कृपया शेत किंवा क्षेत्राचे नाव भरा.',
      crop: 'कृपया पीक निवडा.',
      variety:
        'कृपया पीक वाण भरा.',
      sowingDate:
        'कृपया पेरणीची तारीख निवडा.',
      area:
        'कृपया योग्य पीक क्षेत्रफळ भरा.',
    },

    stages: {
      Seedling: 'रोप अवस्था',
      'Vegetative Growth': 'वानस्पतिक वाढ',
      Tillering: 'फुटवे येणे',
      Flowering: 'फुलोरा',
      Fruiting: 'फळधारणा',
      'Grain Filling': 'दाणे भरणे',
      Maturity: 'परिपक्वता',
      'Harvest Ready': 'कापणीसाठी तयार',
    },
  },
};

export const CropManagementPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const text =
    translations[language] || translations.en;

  const [crops, setCrops] = useState(initialCrops);
  const [showForm, setShowForm] = useState(false);
  const [editingCropId, setEditingCropId] =
    useState(null);
  const [formData, setFormData] =
    useState(emptyCrop);
  const [errorMsg, setErrorMsg] =
    useState('');

  const totalCropArea = useMemo(() => {
    return crops.reduce(
      (total, crop) =>
        total + Number(crop.area || 0),
      0
    );
  }, [crops]);

  const healthyCrops = crops.filter(
    (crop) => crop.status === 'Healthy'
  ).length;

  const openAddForm = () => {
    setEditingCropId(null);
    setFormData(emptyCrop);
    setErrorMsg('');
    setShowForm(true);
  };

  const openEditForm = (crop) => {
    setEditingCropId(crop.id);

    setFormData({
      farmName: crop.farmName,
      crop: crop.crop,
      variety: crop.variety,
      sowingDate: crop.sowingDate,
      stage: crop.stage,
      area: crop.area,
      fieldDetails: crop.fieldDetails,
    });

    setErrorMsg('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCropId(null);
    setFormData(emptyCrop);
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

  const handleSaveCrop = (e) => {
    e.preventDefault();

    if (!formData.farmName.trim()) {
      setErrorMsg(text.errors.farmName);
      return;
    }

    if (!formData.crop.trim()) {
      setErrorMsg(text.errors.crop);
      return;
    }

    if (!formData.variety.trim()) {
      setErrorMsg(text.errors.variety);
      return;
    }

    if (!formData.sowingDate) {
      setErrorMsg(text.errors.sowingDate);
      return;
    }

    if (
      !formData.area ||
      Number(formData.area) <= 0
    ) {
      setErrorMsg(text.errors.area);
      return;
    }

    const cropToSave = {
      ...formData,
      area: Number(formData.area),
      status: editingCropId
        ? crops.find(
            (crop) =>
              crop.id === editingCropId
          )?.status || 'Healthy'
        : 'Healthy',
    };

    if (editingCropId) {
      setCrops((prev) =>
        prev.map((crop) =>
          crop.id === editingCropId
            ? {
                ...crop,
                ...cropToSave,
              }
            : crop
        )
      );
    } else {
      setCrops((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...cropToSave,
        },
      ]);
    }

    closeForm();
  };

  const handleDeleteCrop = (id) => {
    const confirmed = window.confirm(
      text.deleteConfirm
    );

    if (!confirmed) return;

    setCrops((prev) =>
      prev.filter((crop) => crop.id !== id)
    );
  };

  const getStatusLabel = (status) => {
    if (status === 'Healthy') {
      return text.healthy;
    }

    if (status === 'Watch') {
      return text.watch;
    }

    return status;
  };

  const getStageLabel = (stage) => {
    return text.stages[stage] || stage;
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
            <LuSprout className="w-6 h-6 text-green-600" />
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
          {text.addCrop}
        </button>

      </div>


      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        <div className="card p-4">

          <p className="metric-label">
            {text.totalRecords}
          </p>

          <p
            className="text-2xl font-bold mt-2"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            {crops.length}
          </p>

          <p
            className="text-sm mt-1"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            {text.activeRecords}
          </p>

        </div>


        <div className="card p-4">

          <p className="metric-label">
            {text.cropArea}
          </p>

          <p
            className="text-2xl font-bold mt-2"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            {totalCropArea.toFixed(2)} ac
          </p>

          <p
            className="text-sm mt-1"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            {text.totalManagedArea}
          </p>

        </div>


        <div className="card p-4">

          <p className="metric-label">
            {text.healthyCrops}
          </p>

          <p
            className="text-2xl font-bold mt-2"
            style={{
              color: 'var(--accent-green)',
            }}
          >
            {healthyCrops}
          </p>

          <p
            className="text-sm mt-1"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            {text.currentlyHealthy}
          </p>

        </div>

      </div>


      {/* Add / Edit Crop Form */}
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
                {editingCropId
                  ? text.editCrop
                  : text.addNewCrop}
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
            onSubmit={handleSaveCrop}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            {/* Farm */}
            <div>

              <label className="block text-sm font-medium mb-2">
                {text.farmFieldName}
              </label>

              <input
                type="text"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                placeholder={text.farmPlaceholder}
                className="field-input"
              />

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

                <option value="Wheat">
                  Wheat
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

                <option value="Onion">
                  Onion
                </option>

                <option value="Potato">
                  Potato
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

              <div className="relative">

                <LuCalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-tertiary)" />

                <input
                  type="date"
                  name="sowingDate"
                  value={formData.sowingDate}
                  onChange={handleChange}
                  className="field-input field-input-icon"
                />

              </div>

            </div>


            {/* Growth Stage */}
            <div>

              <label className="block text-sm font-medium mb-2">
                {text.growthStage}
              </label>

              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="field-select"
              >
                {cropStages.map((stage) => (
                  <option
                    key={stage}
                    value={stage}
                  >
                    {getStageLabel(stage)}
                  </option>
                ))}
              </select>

            </div>


            {/* Area */}
            <div>

              <label className="block text-sm font-medium mb-2">
                {text.area}
              </label>

              <input
                type="number"
                min="0.1"
                step="0.1"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder={text.areaPlaceholder}
                className="field-input"
              />

            </div>


            {/* Field Details */}
            <div className="md:col-span-2">

              <label className="block text-sm font-medium mb-2">
                {text.fieldDetails}
              </label>

              <textarea
                name="fieldDetails"
                value={formData.fieldDetails}
                onChange={handleChange}
                rows="3"
                placeholder={
                  text.fieldDetailsPlaceholder
                }
                className="field-input"
              />

            </div>


            {/* Actions */}
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

                {editingCropId
                  ? text.saveChanges
                  : text.addCropButton}
              </button>

            </div>

          </form>
        </div>
      )}


      {/* Crop List */}
      <div className="space-y-3">

        <div className="flex items-center justify-between gap-3">

          <div>

            <h2
              className="text-lg font-semibold"
              style={{
                color: 'var(--text-primary)',
              }}
            >
              {text.myCrops}
            </h2>

            <p
              className="text-sm mt-1"
              style={{
                color: 'var(--text-secondary)',
              }}
            >
              {text.manageCrops}
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
            {crops.length} {text.crops}
          </span>

        </div>


        {crops.length === 0 ? (

          <div
            className="card p-10 text-center"
            style={{
              color:
                'var(--text-secondary)',
            }}
          >

            <LuSprout className="w-10 h-10 mx-auto mb-3 opacity-40" />

            <p className="text-base font-semibold">
              {text.noCrops}
            </p>

            <p className="text-sm mt-1">
              {text.noCropsDescription}
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="btn-primary-action mt-4 inline-flex items-center gap-2 px-4 py-3 text-base"
            >
              <LuPlus className="w-5 h-5" />
              {text.addFirstCrop}
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {crops.map((crop) => (

              <div
                key={crop.id}
                className="card p-5 space-y-4"
              >

                {/* Header */}
                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <h3
                      className="text-lg font-semibold truncate"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {crop.crop}
                    </h3>

                    <p
                      className="text-sm mt-1 flex items-center gap-1.5"
                      style={{
                        color:
                          'var(--text-secondary)',
                      }}
                    >
                      <LuMapPin className="w-4 h-4 text-green-600 shrink-0" />
                      {crop.farmName}
                    </p>

                  </div>

                  <span
                    className="text-sm px-2.5 py-1 rounded-md shrink-0"
                    style={{
                      background:
                        crop.status === 'Watch'
                          ? 'rgba(245, 158, 11, 0.1)'
                          : 'rgba(34, 197, 94, 0.1)',

                      color:
                        crop.status === 'Watch'
                          ? '#B45309'
                          : 'var(--accent-green)',

                      border:
                        crop.status === 'Watch'
                          ? '1px solid rgba(245, 158, 11, 0.2)'
                          : '1px solid rgba(34, 197, 94, 0.2)',
                    }}
                  >
                    {getStatusLabel(crop.status)}
                  </span>

                </div>


                {/* Crop Details */}
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
                      {text.variety}
                    </p>

                    <p
                      className="text-base font-semibold mt-1"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {crop.variety}
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
                      {text.area}
                    </p>

                    <p
                      className="text-base font-semibold mt-1"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {crop.area} acres
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
                      {text.sowing}
                    </p>

                    <p
                      className="text-base font-semibold mt-1"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {crop.sowingDate}
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
                      {text.stage}
                    </p>

                    <p
                      className="text-base font-semibold mt-1"
                      style={{
                        color:
                          'var(--text-primary)',
                      }}
                    >
                      {getStageLabel(crop.stage)}
                    </p>

                  </div>

                </div>


                {/* Field Details */}
                <div
                  className="p-3 rounded-md"
                  style={{
                    background:
                      'var(--bg-surface)',
                    border:
                      '1px solid var(--border-base)',
                  }}
                >

                  <p className="metric-label mb-1">
                    {text.fieldDetails}
                  </p>

                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        'var(--text-secondary)',
                    }}
                  >
                    {crop.fieldDetails ||
                      text.noDetails}
                  </p>

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
                      openEditForm(crop)
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
                      handleDeleteCrop(crop.id)
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

export default CropManagementPage;