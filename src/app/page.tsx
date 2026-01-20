'use client'

// Force dynamic rendering to ensure updates appear on Vercel
export const dynamic = 'force-dynamic';

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Heart, Scale, Ruler, User, RefreshCw, Activity, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface BMIResult {
  bmi: number
  category: 'underweight' | 'normal' | 'overweight' | 'obese'
  categoryArabic: string
  recommendation: string
  color: string
  progress: number
  borderColor: string
  bgColor: string
  icon: React.ReactNode
}

export default function HealthIndicator() {
  const [height, setHeight] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateBMI = async () => {
    if (!height || !weight || !age) {
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    const heightInMeters = parseFloat(height) / 100
    const weightKg = parseFloat(weight)
    const bmi = weightKg / (heightInMeters * heightInMeters)

    let category: 'underweight' | 'normal' | 'overweight' | 'obese'
    let categoryArabic: string
    let recommendation: string
    let color: string
    let progress: number
    let borderColor: string
    let bgColor: string
    let icon: React.ReactNode

    if (bmi < 18.5) {
      category = 'underweight'
      categoryArabic = 'نحيف'
      color = 'from-orange-500 to-amber-500'
      progress = 20
      borderColor = 'border-orange-500'
      bgColor = 'bg-orange-500'
      icon = <TrendingDown className="w-8 h-8 text-orange-500" />
      recommendation = 'يُنصح بزيادة الوزن بطريقة صحية من خلال تناول وجبات متوازنة وغنية بالعناصر الغذائية الضرورية. استشر متخصص تغذية للحصول على خطة مناسبة.'
    } else if (bmi < 25) {
      category = 'normal'
      categoryArabic = 'طبيعي'
      color = 'from-emerald-500 to-green-500'
      progress = 50
      borderColor = 'border-emerald-500'
      bgColor = 'bg-emerald-500'
      icon = <Heart className="w-8 h-8 text-emerald-500" />
      recommendation = 'وزنك ضمن المعدل الطبيعي! حافظ على نمط حياة صحي من خلال ممارسة الرياضة بانتظام وتناول غذاء متوازن.'
    } else if (bmi < 30) {
      category = 'overweight'
      categoryArabic = 'زيادة وزن'
      color = 'from-yellow-500 to-orange-400'
      progress = 75
      borderColor = 'border-yellow-500'
      bgColor = 'bg-yellow-500'
      icon = <TrendingUp className="w-8 h-8 text-yellow-500" />
      recommendation = 'يُنصح بتقليل الوزن قليلاً من خلال ممارسة النشاط البدني بانتظام واتباع نظام غذائي صحي ومتوازن.'
    } else {
      category = 'obese'
      categoryArabic = 'سمنة'
      color = 'from-red-500 to-rose-500'
      progress = 100
      borderColor = 'border-red-500'
      bgColor = 'bg-red-500'
      icon = <Activity className="w-8 h-8 text-red-500" />
      recommendation = 'يُنصح باستشارة متخصص صحي للحصول على خطة لفقدان الوزن بطريقة آمنة وصحية. تجنب الحمولات القاسية واستشر طبيبك.'
    }

    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      categoryArabic,
      recommendation,
      color,
      progress,
      borderColor,
      bgColor,
      icon
    })

    setIsLoading(false)
  }

  const resetForm = () => {
    setHeight('')
    setWeight('')
    setAge('')
    setGender('')
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 flex flex-col">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 py-8 px-4 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20"
          >
            <Heart className="w-8 h-8 text-white fill-emerald-100" />
          </motion.div>
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              Health Indicator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium"
            >
              مؤشر الصحة
            </motion.p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 w-full max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="shadow-xl shadow-slate-200/50 dark:shadow-slate-800/50 border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-6 space-y-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 font-bold">
                      احسب مؤشر كتلة الجسم (BMI)
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-400 mt-2">
                      أدخل بياناتك لحساب مؤشر الصحة الخاص بك
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent className="space-y-7">
                  {/* Height Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="height" className="text-right w-full flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                      <Ruler className="w-4 h-4 text-emerald-600" />
                      الطول (سم)
                    </Label>
                    <div className="relative">
                      <Input
                        id="height"
                        type="number"
                        placeholder="مثال: 170"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="text-right text-lg pr-4 h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                        min="50"
                        max="300"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">سم</div>
                    </div>
                  </motion.div>

                  {/* Weight Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="weight" className="text-right w-full flex items-center justify-end gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                      الوزن (كجم)
                      <Scale className="w-4 h-4 text-emerald-600" />
                    </Label>
                    <div className="relative">
                      <Input
                        id="weight"
                        type="number"
                        placeholder="مثال: 70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="text-right text-lg pr-4 h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                        min="20"
                        max="300"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">كجم</div>
                    </div>
                  </motion.div>

                  {/* Age Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="age" className="text-right w-full flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      العمر (سنة)
                    </Label>
                    <div className="relative">
                      <Input
                        id="age"
                        type="number"
                        placeholder="مثال: 30"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="text-right text-lg pr-4 h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                        min="1"
                        max="120"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">سنة</div>
                    </div>
                  </motion.div>

                  {/* Gender Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="space-y-2"
                  >
                    <Label className="text-right w-full flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                      <User className="w-4 h-4 text-emerald-600" />
                      الجنس (اختياري)
                    </Label>
                    <div className="flex gap-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          variant={gender === 'male' ? 'default' : 'outline'}
                          className={`w-full h-12 text-lg font-semibold transition-all duration-200 ${
                            gender === 'male'
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-2 border-emerald-500 shadow-lg shadow-emerald-500/25'
                              : 'border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500/50'
                          }`}
                          onClick={() => setGender('male')}
                        >
                          ذكر
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          variant={gender === 'female' ? 'default' : 'outline'}
                          className={`w-full h-12 text-lg font-semibold transition-all duration-200 ${
                            gender === 'female'
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-2 border-emerald-500 shadow-lg shadow-emerald-500/25'
                              : 'border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500/50'
                          }`}
                          onClick={() => setGender('female')}
                        >
                          أنثى
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Calculate Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={calculateBMI}
                      disabled={!height || !weight || !age || isLoading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-6 text-lg font-bold shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-14"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-5 h-5 ml-2 animate-spin" />
                          جاري الحساب...
                        </>
                      ) : (
                        <>
                          <Activity className="w-5 h-5 ml-2" />
                          احسب مؤشر الصحة
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* BMI Display Card */}
              <Card className={`shadow-xl shadow-slate-200/50 dark:shadow-slate-800/50 border-2 ${result.borderColor} bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm`}>
                <CardHeader className="text-center pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 font-bold">
                      نتيجة مؤشر كتلة الجسم
                    </CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* BMI Value */}
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                      className="relative inline-block"
                    >
                      {/* Outer ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br opacity-20 blur-xl animate-pulse" />
                      <div className={`relative w-44 h-44 rounded-full bg-gradient-to-br ${result.color} shadow-2xl flex items-center justify-center mx-auto`}>
                        <div className="w-40 h-40 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 }}
                              className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent"
                            >
                              {result.bmi}
                            </motion.div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                              kg/m²
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Icon badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                        className="absolute -bottom-4 right-8 w-12 h-12 bg-white dark:bg-slate-900 rounded-full shadow-xl flex items-center justify-center border-2"
                      >
                        {result.icon}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Category Badge */}
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Badge className={`bg-gradient-to-r ${result.color} text-white text-xl px-8 py-3 shadow-lg font-semibold`}>
                        {result.categoryArabic}
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 px-1">
                      <span className="text-orange-500">نحيف</span>
                      <span className="text-emerald-500">طبيعي</span>
                      <span className="text-yellow-500">زيادة وزن</span>
                      <span className="text-red-500">سمنة</span>
                    </div>
                    <div className="relative h-3 bg-gradient-to-r from-orange-400 via-emerald-400 to-red-400 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.progress}%` }}
                        transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
                        className="absolute top-0 right-0 h-full bg-white/40 backdrop-blur-sm"
                      />
                      {/* Indicator */}
                      <motion.div
                        initial={{ left: '0%' }}
                        animate={{ left: `${result.progress}%` }}
                        transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-slate-300"
                        style={{ transform: 'translate(-50%, -50%)' }}
                      />
                    </div>
                  </motion.div>

                  {/* BMI Range Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-2 gap-3 text-center"
                  >
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                      <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold">أقل من 18.5</div>
                      <div className="text-sm text-orange-700 dark:text-orange-300 font-medium">نحيف</div>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">18.5 - 24.9</div>
                      <div className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">طبيعي</div>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">25.0 - 29.9</div>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">زيادة وزن</div>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="text-xs text-red-600 dark:text-red-400 font-semibold">30.0 أو أكثر</div>
                      <div className="text-sm text-red-700 dark:text-red-300 font-medium">سمنة</div>
                    </div>
                  </motion.div>

                  {/* Recommendation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Alert className={`bg-gradient-to-r ${result.color} bg-opacity-10 dark:bg-opacity-10 border-2 ${result.borderColor} backdrop-blur-sm`}>
                      <Info className={`w-6 h-6 ${result.bgColor}`} />
                      <AlertDescription className="text-base text-slate-800 dark:text-slate-200 text-right font-medium">
                        {result.recommendation}
                      </AlertDescription>
                    </Alert>
                  </motion.div>

                  {/* Non-medical Disclaimer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <Alert className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700/50">
                      <AlertDescription className="text-sm text-amber-800 dark:text-amber-200 text-center font-medium">
                        هذه النتائج للأغراض التعليمية والتوعوية فقط ولا تغني عن استشارة الطبيب المختص
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Reset Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="w-full py-6 text-lg font-semibold border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 h-14"
                >
                  <RefreshCw className="w-5 h-5 ml-2" />
                  إعادة الحساب
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 py-4 px-4 mt-auto">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-slate-600 dark:text-slate-400 font-medium"
          >
            By Gumaan Saeed
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
