'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Heart, Scale, Ruler, User, RefreshCw, Activity, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface BMIResult {
  bmi: number
  category: 'underweight' | 'normal' | 'overweight' | 'obese'
  categoryArabic: string
  recommendation: string
  color: string
  progress: number
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

    // محاكاة تأخير بسيط لتجربة مستخدم أفضل
    await new Promise(resolve => setTimeout(resolve, 500))

    const heightInMeters = parseFloat(height) / 100
    const weightKg = parseFloat(weight)
    const bmi = weightKg / (heightInMeters * heightInMeters)

    let category: 'underweight' | 'normal' | 'overweight' | 'obese'
    let categoryArabic: string
    let recommendation: string
    let color: string
    let progress: number

    if (bmi < 18.5) {
      category = 'underweight'
      categoryArabic = 'نحيف'
      color = 'bg-orange-500'
      progress = 20
      recommendation = 'يُنصح بزيادة الوزن بطريقة صحية من خلال تناول وجبات متوازنة وغنية بالعناصر الغذائية الضرورية. استشر متخصص تغذية للحصول على خطة مناسبة.'
    } else if (bmi < 25) {
      category = 'normal'
      categoryArabic = 'طبيعي'
      color = 'bg-green-500'
      progress = 50
      recommendation = 'وزنك ضمن المعدل الطبيعي! حافظ على نمط حياة صحي من خلال ممارسة الرياضة بانتظام وتناول غذاء متوازن.'
    } else if (bmi < 30) {
      category = 'overweight'
      categoryArabic = 'زيادة وزن'
      color = 'bg-yellow-500'
      progress = 75
      recommendation = 'يُنصح بتقليل الوزن قليلاً من خلال ممارسة النشاط البدني بانتظام واتباع نظام غذائي صحي ومتوازن.'
    } else {
      category = 'obese'
      categoryArabic = 'سمنة'
      color = 'bg-red-500'
      progress = 100
      recommendation = 'يُنصح باستشارة متخصص صحي للحصول على خطة لفقدان الوزن بطريقة آمنة وصحية. تجنب الحمولات القاسية واستشر طبيبك.'
    }

    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      categoryArabic,
      recommendation,
      color,
      progress
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
              Health Indicator
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
              مؤشر الصحة
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">
                    احسب مؤشر كتلة الجسم (BMI)
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                    أدخل بياناتك لحساب مؤشر الصحة الخاص بك
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Height Input */}
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-right w-full flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-emerald-600" />
                      الطول (سم)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="مثال: 170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="text-right text-lg"
                      min="50"
                      max="300"
                    />
                  </div>

                  {/* Weight Input */}
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-right w-full flex items-center justify-end gap-2">
                      الوزن (كجم)
                      <Scale className="w-4 h-4 text-emerald-600" />
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="مثال: 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="text-right text-lg"
                      min="20"
                      max="300"
                    />
                  </div>

                  {/* Age Input */}
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-right w-full flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      العمر (سنة)
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="مثال: 30"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="text-right text-lg"
                      min="1"
                      max="120"
                    />
                  </div>

                  {/* Gender Selection */}
                  <div className="space-y-2">
                    <Label className="text-right w-full flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      الجنس (اختياري)
                    </Label>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant={gender === 'male' ? 'default' : 'outline'}
                        className={`flex-1 ${gender === 'male' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                        onClick={() => setGender('male')}
                      >
                        ذكر
                      </Button>
                      <Button
                        type="button"
                        variant={gender === 'female' ? 'default' : 'outline'}
                        className={`flex-1 ${gender === 'female' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                        onClick={() => setGender('female')}
                      >
                        أنثى
                      </Button>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <Button
                    onClick={calculateBMI}
                    disabled={!height || !weight || !age || isLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-6 text-lg shadow-lg"
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
              {/* BMI Display Card */}
              <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">
                    نتيجة مؤشر كتلة الجسم
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* BMI Value */}
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="inline-block relative"
                    >
                      <div className={`w-40 h-40 rounded-full flex items-center justify-center mx-auto ${result.color} bg-opacity-10 dark:bg-opacity-20 shadow-xl`}>
                        <div className="text-center">
                          <div className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-slate-100">
                            {result.bmi}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            kg/m²
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Category Badge */}
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Badge className={`${result.color} text-white text-lg px-6 py-2 shadow-md`}>
                        {result.categoryArabic}
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>نحيف</span>
                      <span>طبيعي</span>
                      <span>زيادة وزن</span>
                      <span>سمنة</span>
                    </div>
                    <Progress value={result.progress} className="h-4" />
                  </div>

                  {/* Recommendation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Alert className="bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
                      <Info className="w-5 h-5 text-emerald-600" />
                      <AlertDescription className="text-base text-slate-800 dark:text-slate-200 text-right">
                        {result.recommendation}
                      </AlertDescription>
                    </Alert>
                  </motion.div>

                  {/* Non-medical Disclaimer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                      <AlertDescription className="text-sm text-amber-800 dark:text-amber-200 text-center">
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
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="w-full py-6 text-lg border-2"
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
      <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-4 mt-auto">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            By Gumaan Saeed
          </p>
        </div>
      </footer>
    </div>
  )
}
