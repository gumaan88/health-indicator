import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { height, weight, age, gender } = body

    // التحقق من البيانات المطلوبة
    if (!height || !weight || !age) {
      return NextResponse.json(
        { error: 'الرجاء إدخال جميع البيانات المطلوبة' },
        { status: 400 }
      )
    }

    // تحويل القيم إلى أرقام
    const heightInMeters = parseFloat(height) / 100
    const weightKg = parseFloat(weight)
    const ageValue = parseInt(age)

    // التحقق من نطاق القيم
    if (heightInMeters <= 0 || heightInMeters > 3) {
      return NextResponse.json(
        { error: 'قيمة الطول غير صالحة' },
        { status: 400 }
      )
    }

    if (weightKg <= 0 || weightKg > 500) {
      return NextResponse.json(
        { error: 'قيمة الوزن غير صالحة' },
        { status: 400 }
      )
    }

    if (ageValue <= 0 || ageValue > 150) {
      return NextResponse.json(
        { error: 'قيمة العمر غير صالحة' },
        { status: 400 }
      )
    }

    // حساب مؤشر كتلة الجسم (BMI)
    const bmi = weightKg / (heightInMeters * heightInMeters)

    // تصنيف النتيجة
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

    // إرجاع النتيجة
    return NextResponse.json({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      categoryArabic,
      recommendation,
      color,
      progress,
      metadata: {
        height,
        weight,
        age: ageValue,
        gender
      }
    })
  } catch (error) {
    console.error('Error calculating BMI:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حساب مؤشر الصحة' },
      { status: 500 }
    )
  }
}

// دعم طلب GET للحصول على معلومات عن نقطة النهاية
export async function GET() {
  return NextResponse.json({
    message: 'API لحساب مؤشر كتلة الجسم (BMI)',
    method: 'POST',
    endpoint: '/api/health-indicator',
    parameters: {
      height: 'الطول بالسنتيمتر (مطلوب)',
      weight: 'الوزن بالكيلوجرام (مطلوب)',
      age: 'العمر بالسنة (مطلوب)',
      gender: 'الجنس (اختياري) - male أو female'
    }
  })
}
