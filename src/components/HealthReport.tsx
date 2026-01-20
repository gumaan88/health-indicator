import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Activity, Ruler, Scale, User, Flame, Target, Calendar, Info, MapPin, Phone, Mail, Globe } from 'lucide-react'

interface HealthReportProps {
  data: {
    language: 'ar' | 'en'
    fullName?: string
    jobTitle?: string
    reportTitle?: string
    height: string
    weight: string
    age: string
    gender?: string
    activityLevel: string
    result: {
      bmi: number
      categoryText: string
      recommendation: string
      color: string
      progress: number
    }
    calories?: {
      bmr: number
      tdee: number
      loseWeight: number
      maintain: number
      gainWeight: number
    }
    idealWeight?: {
      min: number
      max: number
      average: number
    }
    tips: string[]
    t: any
  }
}

export const HealthReport: React.FC<HealthReportProps> = ({ data }) => {
  const { language, t, result, calories, idealWeight, tips } = data
  const isAr = language === 'ar'
  const date = new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const getCategoryColor = (category: string) => {
    if (category.includes('نحيف') || category.toLowerCase().includes('underweight')) return 'text-orange-500 bg-orange-50'
    if (category.includes('طبيعي') || category.toLowerCase().includes('normal')) return 'text-emerald-500 bg-emerald-50'
    if (category.includes('زيادة') || category.toLowerCase().includes('overweight')) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-500 bg-red-50'
  }

  return (
    <div
      id="health-report-template"
      className={`w-[794px] min-h-[1123px] bg-white p-12 text-slate-800 font-cairo ${isAr ? 'rtl' : 'ltr'} relative`}
      style={{ direction: isAr ? 'rtl' : 'ltr' }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full -ml-48 -mb-48" />

      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-emerald-500 pb-8 mb-8 relative z-10">
        <div>
          <h1 className="text-4xl font-black text-emerald-700 mb-2">
            {data.reportTitle || (isAr ? 'تقرير مؤشر الصحة' : 'Health Indicator Report')}
          </h1>
          <div className="flex items-center gap-4 text-slate-500 text-sm font-bold">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {t.reportDate}: {date}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-2 ml-auto">
            <Heart className="w-10 h-10 text-white fill-emerald-100" />
          </div>
          <div className="text-xl font-black text-emerald-600">HealthCheck AI</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 relative z-10">
        {/* Left Column - Patient Info & Basic Stats */}
        <div className="col-span-4 space-y-6">
          <section>
            <h3 className="text-lg font-black text-emerald-700 mb-4 flex items-center gap-2 border-r-4 border-emerald-500 pr-3">
              {t.patientInfo}
            </h3>
            <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100 shadow-sm">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.name}</p>
                <p className="text-lg font-black text-slate-700">{data.fullName || (isAr ? 'غير محدد' : 'Not specified')}</p>
              </div>
              {data.jobTitle && (
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.jobTitle}</p>
                  <p className="font-bold text-slate-600">{data.jobTitle}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.gender}</p>
                  <p className="font-bold text-slate-700">{data.gender === 'male' ? t.male : data.gender === 'female' ? t.female : '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.age}</p>
                  <p className="font-bold text-slate-700">{data.age} {isAr ? 'سنة' : 'yrs'}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-black text-emerald-700 mb-4 flex items-center gap-2 border-r-4 border-emerald-500 pr-3">
              {isAr ? 'القياسات الحيوية' : 'Vital Stats'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg"><Ruler className="w-5 h-5 text-emerald-600" /></div>
                  <span className="font-bold text-slate-600">{t.height}</span>
                </div>
                <span className="text-xl font-black text-emerald-700">{data.height} <small className="text-xs font-bold">CM</small></span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg"><Scale className="w-5 h-5 text-emerald-600" /></div>
                  <span className="font-bold text-slate-600">{t.weight}</span>
                </div>
                <span className="text-xl font-black text-emerald-700">{data.weight} <small className="text-xs font-bold">KG</small></span>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <p className="text-xs text-slate-400 font-bold mb-1">{t.activityLevel}</p>
                <p className="font-bold text-slate-700">{t.activityLevels[data.activityLevel as keyof typeof t.activityLevels] || data.activityLevel}</p>
              </div>
            </div>
          </section>

          {idealWeight && (
            <section>
              <h3 className="text-lg font-black text-emerald-700 mb-4 flex items-center gap-2 border-r-4 border-emerald-500 pr-3">
                {t.idealWeightResult}
              </h3>
              <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
                <p className="text-xs font-bold opacity-80 mb-2 uppercase tracking-widest">{t.idealWeightRange}</p>
                <p className="text-3xl font-black mb-1">{idealWeight.min} - {idealWeight.max} <small className="text-sm font-bold">KG</small></p>
                <p className="text-xs font-bold opacity-90">{isAr ? 'المتوسط المثالي' : 'Ideal Average'}: {idealWeight.average} kg</p>
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Results & Recommendations */}
        <div className="col-span-8 space-y-8">
          {/* BMI Score Section */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-800">{t.bmiResult}</h2>
                <p className="text-slate-500 font-medium">{isAr ? 'مؤشر كتلة الجسم الخاص بك' : 'Your Body Mass Index Assessment'}</p>
              </div>
              <div className={`px-6 py-2 rounded-full font-black text-lg ${getCategoryColor(result.categoryText)}`}>
                {result.categoryText}
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-200" />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * Math.min(result.bmi / 40, 1))}
                    className="text-emerald-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-black text-slate-800">{result.bmi}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Score</span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="h-4 w-full bg-slate-200 rounded-full flex overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: '18.5%' }} />
                  <div className="h-full bg-emerald-500" style={{ width: '25%' }} />
                  <div className="h-full bg-yellow-500" style={{ width: '25%' }} />
                  <div className="h-full bg-red-500" style={{ width: '31.5%' }} />
                </div>
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  <span>18.5</span>
                  <span>25.0</span>
                  <span>30.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <section>
            <h3 className="text-xl font-black text-emerald-700 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6" />
              {t.recommendations}
            </h3>
            <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 shadow-sm">
              <p className="text-slate-700 leading-relaxed font-bold text-lg italic">
                "{result.recommendation}"
              </p>
            </div>
          </section>

          {/* Calories Section */}
          {calories && (
            <section>
              <h3 className="text-xl font-black text-emerald-700 mb-4 flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                {t.caloriesResult}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t.bmr}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-800">{calories.bmr}</span>
                    <span className="text-xs font-bold text-slate-500">kcal/day</span>
                  </div>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-xs font-bold text-emerald-600 uppercase mb-1">{t.tdee}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-700">{calories.tdee}</span>
                    <span className="text-xs font-bold text-emerald-600">kcal/day</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="p-4 bg-orange-50 rounded-xl text-center border border-orange-100">
                  <p className="text-[10px] font-bold text-orange-600 mb-1">{t.loseWeight}</p>
                  <p className="text-lg font-black text-orange-700">{calories.loseWeight}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl text-center border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 mb-1">{t.maintain}</p>
                  <p className="text-lg font-black text-emerald-700">{calories.maintain}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl text-center border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-600 mb-1">{t.gainWeight}</p>
                  <p className="text-lg font-black text-blue-700">{calories.gainWeight}</p>
                </div>
              </div>
            </section>
          )}

          {/* Health Tips */}
          <section>
            <h3 className="text-xl font-black text-emerald-700 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-emerald-600" />
              {t.tipsTitle}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm items-start">
                  <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black">
                    {i + 1}
                  </div>
                  <p className="text-sm font-bold text-slate-700">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-12 left-12 right-12 pt-8 border-t-2 border-slate-100">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{isAr ? 'تواصل معنا' : 'Connect with us'}</p>
            <div className="flex gap-6 text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-emerald-500" /> healthcheck.ai</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-emerald-500" /> report@healthcheck.ai</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-500" /> +966 50 000 0000</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 mb-1">{t.generatedBy}</p>
            <p className="text-sm font-black text-emerald-600">{t.footer}</p>
          </div>
        </div>
      </div>

      {/* Disclaimer at the very bottom */}
      <div className="mt-12 pt-4 text-center">
        <p className="text-[9px] text-slate-300 font-medium max-w-lg mx-auto leading-tight">
          {t.disclaimer}
        </p>
      </div>
    </div>
  )
}
