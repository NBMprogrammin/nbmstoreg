// src/utils/dateUtils.js
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';

// دالة أساسية لعرض التاريخ النسبي
export const formatRelativeDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { 
      addSuffix: true,
      locale: ar
    });
  } catch (error) {
    return 'تاريخ غير معروف';
  }
};

// دالة متقدمة مع خيارات متعددة
// export const formatDate = (dateString, options = {}) => {
//   const {
//     type = 'relative', // relative, short, medium, long
//     withTime = false
//   } = options;

//   try {
//     const date = parseISO(dateString);

//     if (type === 'relative') {
//       return formatRelativeDate(dateString);
//     }

//     // للتنسيقات الأخرى نستخدم toLocaleDateString
//     const formatOptions = {
//       short: { day: '2-digit', month: '2-digit', year: 'numeric' },
//       medium: { day: '2-digit', month: 'short', year: 'numeric' },
//       long: { day: '2-digit', month: 'long', year: 'numeric' }
//     };

//     let formatted = date.toLocaleDateString('ar-EG', formatOptions[type]);
    
//     if (withTime) {
//       const time = date.toLocaleTimeString('ar-EG', { 
//         hour: '2-digit', 
//         minute: '2-digit' 
//       });
//       formatted += ` - ${time}`;
//     }

//     return formatted;
//   } catch (error) {
//     return 'تاريخ غير معروف';
//   }
// };

// دالة متقدمة مع خيارات متعددة
export const formatDate = (dateInput, options = {}) => {
  const {
    type = 'relative', // relative, short, medium, long, full
    withTime = false,
    locale = 'ar-EG'
  } = options;

  try {
    let date;
    
    // نفس منطق التحويل كما في formatRelativeDate
    if (dateInput instanceof Date) {
      date = dateInput;
    } else if (typeof dateInput === 'string' && dateInput.includes('T')) {
      date = parseISO(dateInput);
    } else if (typeof dateInput === 'string' && dateInput.includes('GMT')) {
      const isoDate = convertGMTToISO(dateInput);
      if (!isoDate) return 'تاريخ غير معروف';
      date = parseISO(isoDate);
    } else if (typeof dateInput === 'string') {
      date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        const parsedDate = parse(dateInput, 'EEE, dd MMM yyyy HH:mm:ss \'GMT\'', new Date(), { locale: ar });
        if (!isNaN(parsedDate.getTime())) {
          date = parsedDate;
        }
      }
    } else {
      return 'تاريخ غير معروف';
    }

    if (!date || isNaN(date.getTime())) {
      return 'تاريخ غير معروف';
    }

    // إذا كان النوع نسبي
    if (type === 'relative') {
      return formatRelativeDate(dateInput);
    }

    // للتنسيقات الثابتة
    const formatOptions = {
      short: { day: '2-digit', month: '2-digit', year: 'numeric' },
      medium: { day: '2-digit', month: 'short', year: 'numeric' },
      long: { day: '2-digit', month: 'long', year: 'numeric' },
      full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    };

    let formatted = date.toLocaleDateString(locale, formatOptions[type]);
    
    if (withTime) {
      const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true // استخدام 12 ساعة مع ص/م
      };
      const time = date.toLocaleTimeString(locale, timeOptions);
      formatted += ` - ${time}`;
    }

    return formatted;
  } catch (error) {
    console.error('خطأ في formatDate:', error);
    return 'تاريخ غير معروف';
  }
};