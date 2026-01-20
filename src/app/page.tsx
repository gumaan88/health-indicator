'use client'

// Force dynamic rendering to ensure updates appear on Vercel
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Scale, Ruler, User, RefreshCw, Activity, Info, TrendingUp, TrendingDown, Minus, Flame, Target, History, Share2, Copy, Check, Trash2, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Slider } from '@/components/ui/slider'

// Language translations
const translations = {
  ar: {
    title: 'Health Indicator',
    subtitle: 'مؤشر الصحة',
    calculateBMI: 'احسب مؤشر كتلة الجسم (BMI)',
    calculateCalories: 'احسب السعرات الحرارية',
    calculateIdealWeight: 'الوزن المثالي',
    enterData: 'أدخل بياناتك لحساب مؤشر الصحة الخاص بك',
    height: 'الطول (سم)',
    weight: 'الوزن (كجم)',
    age: 'العمر (سنة)',
    ageInputManual: 'إدخال العمر',
    ageInputBirthdate: 'تاريخ الميلاد',
    birthdate: 'تاريخ الميلاد',
    calculatedAge: 'العمر المحسوب',
    gender: 'الجنس',
    optional: '(اختياري)',
    male: 'ذكر',
    female: 'أنثى',
    activityLevel: 'مستوى النشاط',
    activityLevels: {
      sedentary: 'خامل (قليل أو لا نشاط)',
      light: 'نشاط خفيف (1-3 أيام/أسبوع)',
      moderate: 'نشاط متوسط (3-5 أيام/أسبوع)',
      active: 'نشاط عالي (6-7 أيام/أسبوع)',
      veryActive: 'نشاط عالي جداً (تمارين قوية)'
    },
    calculate: 'احسب',
    calculating: 'جاري الحساب...',
    bmiResult: 'نتيجة مؤشر كتلة الجسم',
    caloriesResult: 'السعرات الحرارية اليومية',
    idealWeightResult: 'الوزن المثالي',
    history: 'السجل',
    clearHistory: 'مسح السجل',
    share: 'مشاركة',
    copy: 'نسخ',
    copied: 'تم النسخ!',
    underweight: 'نحيف',
    normal: 'طبيعي',
    overweight: 'زيادة وزن',
    obese: 'سمنة',
    bmr: 'معدل الأيض الأساسي (BMR)',
    tdee: 'السعرات المستهلكة يومياً (TDEE)',
    loseWeight: 'لإنقاص الوزن',
    maintain: 'للحفاظ على الوزن',
    gainWeight: 'لزيادة الوزن',
    recommendationUnderweight: 'يُنصح بزيادة الوزن بطريقة صحية من خلال تناول وجبات متوازنة وغنية بالعناصر الغذائية الضرورية. استشر متخصص تغذية للحصول على خطة مناسبة.',
    recommendationNormal: 'وزنك ضمن المعدل الطبيعي! حافظ على نمط حياة صحي من خلال ممارسة الرياضة بانتظام وتناول غذاء متوازن.',
    recommendationOverweight: 'يُنصح بتقليل الوزن قليلاً من خلال ممارسة النشاط البدني بانتظام واتباع نظام غذائي صحي ومتوازن.',
    recommendationObese: 'يُنصح باستشارة متخصص صحي للحصول على خطة لفقدان الوزن بطريقة آمنة وصحية. تجنب الحمولات القاسية واستشر طبيبك.',
    idealWeightRange: 'نطاق الوزن الصحي',
    tipsTitle: 'نصائح صحية',
    tipsUnderweight: [
      'تناول وجبات متكررة (5-6 وجبات يومياً)',
      'ركز على الأطعمة الغنية بالبروتين',
      'أضف وجبات خفيفة صحية بين الوجبات الرئيسية',
      'تمارين القوة لبناء الكتلة العضلية'
    ],
    tipsNormal: [
      'حافظ على النظام الغذائي الحالي',
      'مارس الرياضة 30 دقيقة يومياً',
      'شرب 8 أكواب ماء يومياً',
      'نوم 7-8 ساعات ليلاً'
    ],
    tipsOverweight: [
      'قلل السكريات والكربوهيدرات المعالجة',
      'زد الخضروات والفواكه في وجباتك',
      'مارس المشي السريع 30 دقيقة يومياً',
      'قلل حجم الحصص تدريجياً'
    ],
    tipsObese: [
      'استشر طبيبك قبل البدء بأي برنامج رياضي',
      'ابدأ بتمارين منخفضة التأثير مثل المشي',
      'ركز على الأطعمة الطبيعية والمصنعة',
      'ضع أهدافاً واقعية قصيرة المدى'
    ],
    disclaimer: 'هذه النتائج للأغراض التعليمية والتوعوية فقط ولا تغني عن استشارة الطبيب المختص',
    recalculate: 'إعادة الحساب',
    footer: 'By Gumaan Saeed'
  },
  en: {
    title: 'Health Indicator',
    subtitle: 'Health Calculator',
    calculateBMI: 'Calculate BMI',
    calculateCalories: 'Calculate Calories',
    calculateIdealWeight: 'Ideal Weight',
    enterData: 'Enter your data to calculate your health indicators',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    age: 'Age (years)',
    ageInputManual: 'Enter Age',
    ageInputBirthdate: 'Date of Birth',
    birthdate: 'Birth Date',
    calculatedAge: 'Calculated Age',
    gender: 'Gender',
    optional: '(optional)',
    male: 'Male',
    female: 'Female',
    activityLevel: 'Activity Level',
    activityLevels: {
      sedentary: 'Sedentary (little or no exercise)',
      light: 'Light (1-3 days/week)',
      moderate: 'Moderate (3-5 days/week)',
      active: 'Active (6-7 days/week)',
      veryActive: 'Very Active (intense exercise)'
    },
    calculate: 'Calculate',
    calculating: 'Calculating...',
    bmiResult: 'BMI Result',
    caloriesResult: 'Daily Calories',
    idealWeightResult: 'Ideal Weight',
    history: 'History',
    clearHistory: 'Clear History',
    share: 'Share',
    copy: 'Copy',
    copied: 'Copied!',
    underweight: 'Underweight',
    normal: 'Normal',
    overweight: 'Overweight',
    obese: 'Obese',
    bmr: 'Basal Metabolic Rate (BMR)',
    tdee: 'Total Daily Energy Expenditure (TDEE)',
    loseWeight: 'To Lose Weight',
    maintain: 'To Maintain',
    gainWeight: 'To Gain Weight',
    recommendationUnderweight: 'It is recommended to gain weight in a healthy way by eating balanced meals rich in essential nutrients. Consult a nutritionist for a suitable plan.',
    recommendationNormal: 'Your weight is within the normal range! Maintain a healthy lifestyle through regular exercise and a balanced diet.',
    recommendationOverweight: 'It is recommended to lose a little weight through regular physical activity and a healthy, balanced diet.',
    recommendationObese: 'It is recommended to consult a health professional for a safe and healthy weight loss plan. Avoid crash diets and consult your doctor.',
    idealWeightRange: 'Healthy Weight Range',
    tipsTitle: 'Health Tips',
    tipsUnderweight: [
      'Eat frequent meals (5-6 meals per day)',
      'Focus on protein-rich foods',
      'Add healthy snacks between main meals',
      'Strength exercises to build muscle mass'
    ],
    tipsNormal: [
      'Maintain current diet',
      'Exercise 30 minutes daily',
      'Drink 8 glasses of water daily',
      'Sleep 7-8 hours per night'
    ],
    tipsOverweight: [
      'Reduce sugars and processed carbs',
      'Add more vegetables and fruits to meals',
      'Brisk walk 30 minutes daily',
      'Gradually reduce portion sizes'
    ],
    tipsObese: [
      'Consult doctor before starting any exercise program',
      'Start with low-impact activities like walking',
      'Focus on natural, unprocessed foods',
      'Set realistic short-term goals'
    ],
    disclaimer: 'These results are for educational and awareness purposes only and do not replace consultation with a specialized doctor',
    recalculate: 'Recalculate',
    footer: 'By Gumaan Saeed'
  }
}

interface BMIResult {
  bmi: number
  category: 'underweight' | 'normal' | 'overweight' | 'obese'
  categoryText: string
  recommendation: string
  color: string
  progress: number
  borderColor: string
  bgColor: string
  icon: React.ReactNode
}

interface CaloriesResult {
  bmr: number
  tdee: number
  loseWeight: number
  maintain: number
  gainWeight: number
}

interface HistoryEntry {
  id: string
  date: string
  bmi: number
  category: string
  weight: number
  height: number
  age: number
  gender?: string
}

export default function HealthIndicator() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')
  const t = translations[language]

  const [height, setHeight] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive'>('moderate')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [calories, setCalories] = useState<CaloriesResult | null>(null)
  const [idealWeight, setIdealWeight] = useState<{ min: number; max: number; average: number } | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Age input mode: 'manual' (enter age directly) or 'birthdate' (select birth date)
  const [ageInputMode, setAgeInputMode] = useState<'manual' | 'birthdate'>('manual')
  const [birthdate, setBirthdate] = useState<string>('')

  // Load saved data from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('health-indicator-lang') as 'ar' | 'en' | null
    if (savedLang) {
      setLanguage(savedLang)
    }

    const savedHistory = localStorage.getItem('health-indicator-history')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to load history:', e)
      }
    }
  }, [])

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem('health-indicator-lang', language)
  }, [language])

  // Calculate age from birthdate automatically
  useEffect(() => {
    if (ageInputMode === 'birthdate' && birthdate) {
      const today = new Date()
      const birth = new Date(birthdate)
      let ageNum = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        ageNum--
      }

      if (ageNum >= 0) {
        setAge(ageNum.toString())
      }
    }
  }, [birthdate, ageInputMode])

  const saveToHistory = (bmi: number, category: string, weight: number, height: number, age: number) => {
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US'),
      bmi,
      category,
      weight,
      height,
      age,
      gender: gender || undefined
    }

    const newHistory = [entry, ...history].slice(0, 10) // Keep last 10 entries
    setHistory(newHistory)
    localStorage.setItem('health-indicator-history', JSON.stringify(newHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('health-indicator-history')
  }

  const calculateAll = async () => {
    if (!height || !weight || !age) {
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const heightMeters = parseFloat(height) / 100
    const weightKg = parseFloat(weight)
    const ageNum = parseInt(age)

    // Calculate BMI
    const bmi = weightKg / (heightMeters * heightMeters)

    let category: 'underweight' | 'normal' | 'overweight' | 'obese'
    let categoryText: string
    let recommendation: string
    let color: string
    let progress: number
    let borderColor: string
    let bgColor: string
    let icon: React.ReactNode

    if (bmi < 18.5) {
      category = 'underweight'
      categoryText = t.underweight
      color = 'from-orange-500 to-amber-500'
      progress = 20
      borderColor = 'border-orange-500'
      bgColor = 'bg-orange-500'
      icon = <TrendingDown className="w-8 h-8 text-orange-500" />
      recommendation = t.recommendationUnderweight
    } else if (bmi < 25) {
      category = 'normal'
      categoryText = t.normal
      color = 'from-emerald-500 to-green-500'
      progress = 50
      borderColor = 'border-emerald-500'
      bgColor = 'bg-emerald-500'
      icon = <Heart className="w-8 h-8 text-emerald-500" />
      recommendation = t.recommendationNormal
    } else if (bmi < 30) {
      category = 'overweight'
      categoryText = t.overweight
      color = 'from-yellow-500 to-orange-400'
      progress = 75
      borderColor = 'border-yellow-500'
      bgColor = 'bg-yellow-500'
      icon = <TrendingUp className="w-8 h-8 text-yellow-500" />
      recommendation = t.recommendationOverweight
    } else {
      category = 'obese'
      categoryText = t.obese
      color = 'from-red-500 to-rose-500'
      progress = 100
      borderColor = 'border-red-500'
      bgColor = 'bg-red-500'
      icon = <Activity className="w-8 h-8 text-red-500" />
      recommendation = t.recommendationObese
    }

    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      categoryText,
      recommendation,
      color,
      progress,
      borderColor,
      bgColor,
      icon
    })

    // Calculate Calories (BMR + TDEE)
    if (gender && ageNum >= 18) {
      let bmr = 0
      if (gender === 'male') {
        bmr = 10 * weightKg + 6.25 * (parseFloat(height)) - 5 * ageNum + 5
      } else {
        bmr = 10 * weightKg + 6.25 * (parseFloat(height)) - 5 * ageNum - 161
      }

      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      }

      const tdee = bmr * activityMultipliers[activityLevel]

      setCalories({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        loseWeight: Math.round(tdee - 500),
        maintain: Math.round(tdee),
        gainWeight: Math.round(tdee + 500)
      })
    } else {
      setCalories(null)
    }

    // Calculate Ideal Weight (using BMI 18.5-24.9)
    const idealMin = 18.5 * heightMeters * heightMeters
    const idealMax = 24.9 * heightMeters * heightMeters
    setIdealWeight({
      min: parseFloat(idealMin.toFixed(1)),
      max: parseFloat(idealMax.toFixed(1)),
      average: parseFloat(((idealMin + idealMax) / 2).toFixed(1))
    })

    // Save to history
    saveToHistory(parseFloat(bmi.toFixed(1)), categoryText, weightKg, parseFloat(height), ageNum)

    setIsLoading(false)
  }

  const resetForm = () => {
    setHeight('')
    setWeight('')
    setAge('')
    setGender('')
    setActivityLevel('moderate')
    setResult(null)
    setCalories(null)
    setIdealWeight(null)
    setBirthdate('')
    setAgeInputMode('manual')
  }

  const shareResult = async () => {
    if (!result) return

    const text = language === 'ar'
      ? `BMI: ${result.bmi} (${result.categoryText})\nالطول: ${height} سم\nالوزن: ${weight} كجم\n\n${t.recommendation}`
      : `BMI: ${result.bmi} (${result.categoryText})\nHeight: ${height} cm\nWeight: ${weight} kg\n\n${result.recommendation}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: t.title,
          text: text
        })
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (e) {
      console.error('Share failed:', e)
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 flex flex-col ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 py-6 px-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"
            >
              <Heart className="w-7 h-7 text-white fill-emerald-100" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium">
                {t.subtitle}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="h-10 px-4 border-2"
          >
            {language === 'ar' ? 'English' : 'عربي'}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 w-full max-w-3xl mx-auto px-4 py-6">
        <Tabs defaultValue="calculate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
            <TabsTrigger value="calculate" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              {t.calculateBMI}
            </TabsTrigger>
            <TabsTrigger value="calories" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Flame className="w-4 h-4 mr-2" />
              {t.calculateCalories}
            </TabsTrigger>
            <TabsTrigger value="ideal" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              {t.calculateIdealWeight}
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <History className="w-4 h-4 mr-2" />
              {t.history}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculate">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-xl shadow-slate-200/50 dark:shadow-slate-800/50 border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-6 space-y-2">
                      <CardTitle className="text-xl text-slate-800 dark:text-slate-100 font-bold">
                        {t.enterData}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Height Input with Slider */}
                      <div className="space-y-3">
                        <Label className="text-slate-700 dark:text-slate-300 font-semibold">
                          <Ruler className="w-4 h-4 inline mr-2 text-emerald-600" />
                          {t.height}
                        </Label>
                        <div className="space-y-4">
                          <div className="relative">
                            <Input
                              type="number"
                              value={height}
                              onChange={(e) => setHeight(e.target.value)}
                              className="text-center text-2xl font-bold h-16 border-2 border-emerald-200 dark:border-emerald-900 focus:border-emerald-500 transition-all bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-800"
                              min="120"
                              max="220"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-emerald-400 text-sm font-semibold">cm</div>
                          </div>
                          <Slider
                            value={[height ? parseInt(height) : 170]}
                            onValueChange={(value) => setHeight(value[0].toString())}
                            min={120}
                            max={220}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Weight Input with Slider */}
                      <div className="space-y-3">
                        <Label className="text-slate-700 dark:text-slate-300 font-semibold">
                          <Scale className="w-4 h-4 inline mr-2 text-emerald-600" />
                          {t.weight}
                        </Label>
                        <div className="space-y-4">
                          <div className="relative">
                            <Input
                              type="number"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              className="text-center text-2xl font-bold h-16 border-2 border-emerald-200 dark:border-emerald-900 focus:border-emerald-500 transition-all bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-800"
                              min="30"
                              max="200"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-emerald-400 text-sm font-semibold">kg</div>
                          </div>
                          <Slider
                            value={[weight ? parseInt(weight) : 70]}
                            onValueChange={(value) => setWeight(value[0].toString())}
                            min={30}
                            max={200}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Age Input */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 dark:text-slate-300 font-semibold">
                          <Zap className="w-4 h-4 inline mr-2 text-emerald-600" />
                          {t.age}
                        </Label>

                        {/* Age Input Mode Toggle */}
                        <div className="flex gap-2 mb-2">
                          <Button
                            type="button"
                            variant={ageInputMode === 'manual' ? 'default' : 'outline'}
                            size="sm"
                            className={`flex-1 text-sm ${
                              ageInputMode === 'manual'
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'border-2 border-slate-200 dark:border-slate-700'
                            }`}
                            onClick={() => setAgeInputMode('manual')}
                          >
                            {t.ageInputManual}
                          </Button>
                          <Button
                            type="button"
                            variant={ageInputMode === 'birthdate' ? 'default' : 'outline'}
                            size="sm"
                            className={`flex-1 text-sm ${
                              ageInputMode === 'birthdate'
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'border-2 border-slate-200 dark:border-slate-700'
                            }`}
                            onClick={() => setAgeInputMode('birthdate')}
                          >
                            {t.ageInputBirthdate}
                          </Button>
                        </div>

                        {/* Manual Age Input */}
                        {ageInputMode === 'manual' ? (
                          <div className="relative">
                            <Input
                              type="number"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              className="text-center text-2xl font-bold h-16 border-2 border-emerald-200 dark:border-emerald-900 focus:border-emerald-500 transition-all bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-800"
                              min="18"
                              max="120"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-emerald-400 text-sm font-semibold">{language === 'ar' ? 'سنة' : 'years'}</div>
                          </div>
                        ) : (
                          /* Birthdate Input */
                          <div className="space-y-3">
                            <div className="relative">
                              <Input
                                type="date"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                className="text-center text-lg h-14 border-2 border-emerald-200 dark:border-emerald-900 focus:border-emerald-500 transition-all bg-white dark:bg-slate-800"
                                max={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            {/* Calculated Age Display */}
                            {age && (
                              <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                                  {t.calculatedAge}
                                </div>
                                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                                  {age} {language === 'ar' ? 'سنة' : 'years'}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Gender Selection */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 dark:text-slate-300 font-semibold">
                          <User className="w-4 h-4 inline mr-2 text-emerald-600" />
                          {t.gender} {t.optional}
                        </Label>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant={gender === 'male' ? 'default' : 'outline'}
                            className={`flex-1 h-12 font-semibold transition-all ${
                              gender === 'male'
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-2 border-emerald-500 shadow-lg'
                                : 'border-2 border-slate-200 dark:border-slate-700'
                            }`}
                            onClick={() => setGender('male')}
                          >
                            {t.male}
                          </Button>
                          <Button
                            type="button"
                            variant={gender === 'female' ? 'default' : 'outline'}
                            className={`flex-1 h-12 font-semibold transition-all ${
                              gender === 'female'
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-2 border-emerald-500 shadow-lg'
                                : 'border-2 border-slate-200 dark:border-slate-700'
                            }`}
                            onClick={() => setGender('female')}
                          >
                            {t.female}
                          </Button>
                        </div>
                      </div>

                      {/* Activity Level */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 dark:text-slate-300 font-semibold">
                          <Flame className="w-4 h-4 inline mr-2 text-emerald-600" />
                          {t.activityLevel}
                        </Label>
                        <select
                          value={activityLevel}
                          onChange={(e) => setActivityLevel(e.target.value as any)}
                          className="w-full h-12 px-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                        >
                          <option value="sedentary">{t.activityLevels.sedentary}</option>
                          <option value="light">{t.activityLevels.light}</option>
                          <option value="moderate">{t.activityLevels.moderate}</option>
                          <option value="active">{t.activityLevels.active}</option>
                          <option value="veryActive">{t.activityLevels.veryActive}</option>
                        </select>
                      </div>

                      {/* Calculate Button */}
                      <Button
                        onClick={calculateAll}
                        disabled={!height || !weight || !age || isLoading}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-6 text-lg font-bold shadow-xl hover:shadow-emerald-500/40 transition-all h-14"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="w-5 h-5 ml-2 animate-spin" />
                            {t.calculating}
                          </>
                        ) : (
                          <>
                            <Activity className="w-5 h-5 ml-2" />
                            {t.calculate}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* BMI Result Card */}
                  <Card className={`shadow-xl border-2 ${result.borderColor} bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm`}>
                    <CardHeader className="text-center pb-4 flex justify-between items-center">
                      <div className="flex-1" />
                      <CardTitle className="text-xl text-slate-800 dark:text-slate-100 font-bold">
                        {t.bmiResult}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={shareResult}>
                          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* BMI Value */}
                      <div className="text-center py-6">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                          className="relative inline-block"
                        >
                          <div className={`relative w-36 h-36 rounded-full bg-gradient-to-br ${result.color} shadow-2xl flex items-center justify-center mx-auto`}>
                            <div className="w-32 h-32 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-5xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                                  {result.bmi}
                                </div>
                              </div>
                            </div>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-3 right-6 w-10 h-10 bg-white dark:bg-slate-900 rounded-full shadow-xl flex items-center justify-center border-2"
                          >
                            {result.icon}
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Category Badge */}
                      <div className="text-center">
                        <Badge className={`bg-gradient-to-r ${result.color} text-white text-xl px-8 py-3 shadow-lg font-semibold`}>
                          {result.categoryText}
                        </Badge>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 px-1">
                          <span className="text-orange-500">{t.underweight}</span>
                          <span className="text-emerald-500">{t.normal}</span>
                          <span className="text-yellow-500">{t.overweight}</span>
                          <span className="text-red-500">{t.obese}</span>
                        </div>
                        <div className="relative h-2.5 bg-gradient-to-r from-orange-400 via-emerald-400 to-red-400 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.progress}%` }}
                            transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                            className="absolute top-0 right-0 h-full bg-white/40 backdrop-blur-sm"
                          />
                          <motion.div
                            initial={{ left: '0%' }}
                            animate={{ left: `${result.progress}%` }}
                            transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2"
                            style={{ transform: 'translate(-50%, -50%)' }}
                          />
                        </div>
                      </div>

                      {/* Recommendation */}
                      <Alert className={`bg-gradient-to-r ${result.color} bg-opacity-10 border-2 ${result.borderColor} backdrop-blur-sm`}>
                        <Info className={`w-5 h-5 ${result.bgColor}`} />
                        <AlertDescription className="text-base text-slate-800 dark:text-slate-200 font-medium">
                          {result.recommendation}
                        </AlertDescription>
                      </Alert>

                      {/* Disclaimer */}
                      <Alert className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                        <AlertDescription className="text-xs text-amber-800 dark:text-amber-200 text-center">
                          {t.disclaimer}
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>

                  {/* Calories Result */}
                  {calories && (
                    <Card className="shadow-xl border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl text-slate-800 dark:text-slate-100 font-bold flex items-center justify-center gap-2">
                          <Flame className="w-5 h-5 text-orange-500" />
                          {t.caloriesResult}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{calories.bmr}</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{t.bmr}</div>
                          </div>
                          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-center border border-emerald-200 dark:border-emerald-800">
                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{calories.tdee}</div>
                            <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">{t.tdee}</div>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">{t.loseWeight}</span>
                            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{calories.loseWeight}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{t.maintain}</span>
                            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{calories.maintain}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{t.gainWeight}</span>
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{calories.gainWeight}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Ideal Weight */}
                  {idealWeight && (
                    <Card className="shadow-xl border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl text-slate-800 dark:text-slate-100 font-bold flex items-center justify-center gap-2">
                          <Target className="w-5 h-5 text-teal-500" />
                          {t.idealWeightResult}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 rounded-lg border border-teal-200 dark:border-teal-800">
                          <div className="text-sm text-teal-700 dark:text-teal-300 font-medium mb-1">{t.idealWeightRange}</div>
                          <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                            {idealWeight.min} - {idealWeight.max} kg
                          </div>
                          <div className="text-xs text-teal-600 dark:text-teal-400 mt-2">
                            {language === 'ar' ? 'المتوسط' : 'Average'}: {idealWeight.average} kg
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Health Tips */}
                  <Card className="shadow-xl border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg text-slate-800 dark:text-slate-100 font-bold flex items-center gap-2">
                        <Info className="w-5 h-5 text-emerald-600" />
                        {t.tipsTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.category === 'underweight' && t.tipsUnderweight.map((tip, i) => (
                          <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                        {result.category === 'normal' && t.tipsNormal.map((tip, i) => (
                          <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                        {result.category === 'overweight' && t.tipsOverweight.map((tip, i) => (
                          <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                        {result.category === 'obese' && t.tipsObese.map((tip, i) => (
                          <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Reset Button */}
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="w-full h-14 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
                  >
                    <RefreshCw className="w-5 h-5 ml-2" />
                    {t.recalculate}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="history">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row justify-between items-center pb-4">
                <CardTitle className="text-xl text-slate-800 dark:text-slate-100 font-bold">
                  {t.history}
                </CardTitle>
                {history.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearHistory}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{language === 'ar' ? 'لا يوجد سجل بعد' : 'No history yet'}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((entry) => (
                      <div key={entry.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-bold text-lg text-slate-800 dark:text-slate-100">
                              BMI: {entry.bmi}
                            </div>
                            <Badge className={`mt-1 ${
                              entry.category === t.underweight ? 'bg-orange-500' :
                              entry.category === t.normal ? 'bg-emerald-500' :
                              entry.category === t.overweight ? 'bg-yellow-500' : 'bg-red-500'
                            }`}>
                              {entry.category}
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {entry.date}
                          </div>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <div>{language === 'ar' ? 'الطول' : 'Height'}: {entry.height} cm | {language === 'ar' ? 'الوزن' : 'Weight'}: {entry.weight} kg | {language === 'ar' ? 'العمر' : 'Age'}: {entry.age} {language === 'ar' ? 'سنة' : 'years'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calories">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-slate-800 dark:text-slate-100 font-bold flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  {t.calculateCalories}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {calories ? language === 'ar' ? 'بناءً على بياناتك الحالية' : 'Based on your current data' : language === 'ar' ? 'أكمل بياناتك للحساب' : 'Complete your data to calculate'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {calories ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{calories.bmr}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{t.bmr}</div>
                      </div>
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-center border border-emerald-200 dark:border-emerald-800">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{calories.tdee}</div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">{t.tdee}</div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">{t.loseWeight}</span>
                        <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{calories.loseWeight}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{t.maintain}</span>
                        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{calories.maintain}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{t.gainWeight}</span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{calories.gainWeight}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <Flame className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{!gender ? language === 'ar' ? 'يرجى اختيار الجنس لحساب السعرات' : 'Please select gender to calculate calories' : language === 'ar' ? 'يظهر هنا بعد حساب BMI' : 'Will appear after BMI calculation'}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ideal">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-slate-800 dark:text-slate-100 font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-teal-500" />
                  {t.calculateIdealWeight}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {idealWeight ? language === 'ar' ? 'بناءً على طولك الحالي' : 'Based on your current height' : language === 'ar' ? 'أكمل بياناتك للحساب' : 'Complete your data to calculate'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {idealWeight ? (
                  <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 rounded-lg border border-teal-200 dark:border-teal-800">
                    <div className="text-sm text-teal-700 dark:text-teal-300 font-medium mb-2">{t.idealWeightRange}</div>
                    <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                      {idealWeight.min} - {idealWeight.max} kg
                    </div>
                    <div className="text-sm text-teal-600 dark:text-teal-400">
                      {language === 'ar' ? 'المتوسط' : 'Average'}: <span className="font-bold text-lg">{idealWeight.average} kg</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{!height ? language === 'ar' ? 'يرجى إدخال طولك' : 'Please enter your height' : language === 'ar' ? 'يظهر هنا بعد حساب BMI' : 'Will appear after BMI calculation'}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="relative w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 py-4 px-4 mt-auto">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {t.footer}
          </p>
        </div>
      </footer>
    </div>
  )
}
