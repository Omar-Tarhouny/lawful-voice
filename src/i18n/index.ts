import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation & Header
      'nav.home': 'Home',
      'nav.legalAid': 'Legal Aid',
      'nav.reportCrime': 'Report Crime',
      'nav.trackReport': 'Track Report',
      'nav.dashboard': 'Dashboard',
      
      // Theme & Language
      'theme.light': 'Light Mode',
      'theme.dark': 'Dark Mode',
      'language.english': 'English',
      'language.arabic': 'العربية',
      
      // Home Page
      'home.title': 'AI Legal Aid & Crime Reporting Platform',
      'home.subtitle': 'Secure legal guidance and anonymous crime reporting for citizens',
      'home.legalAid.title': 'AI Legal Aid',
      'home.legalAid.description': 'Get instant legal guidance from our AI assistant trained on laws and real cases',
      'home.legalAid.button': 'Start Legal Chat',
      'home.reporting.title': 'Anonymous Reporting',
      'home.reporting.description': 'Report crimes safely and anonymously with encrypted data protection',
      'home.reporting.button': 'File Report',
      'home.tracking.title': 'Track Reports',
      'home.tracking.description': 'Monitor the status of your submitted reports using your case ID',
      'home.tracking.button': 'Track Case',
      
      // Legal Aid Chat
      'chat.title': 'AI Legal Assistant',
      'chat.subtitle': 'Ask any legal question in Arabic or English',
      'chat.placeholder': 'Type your legal question here...',
      'chat.send': 'Send',
      'chat.export': 'Export PDF',
      'chat.clear': 'Clear Chat',
      'chat.welcome': 'Hello! I\'m your AI legal assistant. How can I help you today?',
      'chat.typing': 'AI is typing...',
      
      // Crime Reporting
      'report.title': 'Anonymous Crime Report',
      'report.subtitle': 'Your identity will be protected',
      'report.category': 'Crime Category',
      'report.category.theft': 'Theft',
      'report.category.assault': 'Assault',
      'report.category.corruption': 'Corruption',
      'report.category.cybercrime': 'Cybercrime',
      'report.category.fraud': 'Fraud',
      'report.category.harassment': 'Harassment',
      'report.category.other': 'Other',
      'report.description': 'Description',
      'report.description.placeholder': 'Please provide details about the incident...',
      'report.attachments': 'Attachments',
      'report.attachments.hint': 'Upload any relevant files or images',
      'report.submit': 'Submit Report',
      'report.success.title': 'Report Submitted Successfully',
      'report.success.subtitle': 'Your case ID is:',
      'report.success.note': 'Please save this ID to track your report status',
      
      // Common
      'button.loading': 'Loading...',
      'button.back': 'Back',
      'button.next': 'Next',
      'button.cancel': 'Cancel',
      'button.save': 'Save',
      'footer.rights': '© 2024 AI Legal Platform. All rights reserved.',
    }
  },
  ar: {
    translation: {
      // Navigation & Header
      'nav.home': 'الرئيسية',
      'nav.legalAid': 'المساعدة القانونية',
      'nav.reportCrime': 'بلاغ جريمة',
      'nav.trackReport': 'تتبع البلاغ',
      'nav.dashboard': 'لوحة التحكم',
      
      // Theme & Language
      'theme.light': 'الوضع الفاتح',
      'theme.dark': 'الوضع المظلم',
      'language.english': 'English',
      'language.arabic': 'العربية',
      
      // Home Page
      'home.title': 'منصة المساعدة القانونية والإبلاغ عن الجرائم',
      'home.subtitle': 'إرشاد قانوني آمن وإبلاغ مجهول عن الجرائم للمواطنين',
      'home.legalAid.title': 'المساعدة القانونية الذكية',
      'home.legalAid.description': 'احصل على إرشاد قانوني فوري من مساعدنا الذكي المدرب على القوانين والقضايا الحقيقية',
      'home.legalAid.button': 'ابدأ المحادثة القانونية',
      'home.reporting.title': 'الإبلاغ المجهول',
      'home.reporting.description': 'أبلغ عن الجرائم بأمان ومجهولية مع حماية البيانات المشفرة',
      'home.reporting.button': 'تقديم بلاغ',
      'home.tracking.title': 'تتبع البلاغات',
      'home.tracking.description': 'راقب حالة البلاغات المقدمة باستخدام رقم القضية',
      'home.tracking.button': 'تتبع القضية',
      
      // Legal Aid Chat
      'chat.title': 'المساعد القانوني الذكي',
      'chat.subtitle': 'اسأل أي سؤال قانوني بالعربية أو الإنجليزية',
      'chat.placeholder': 'اكتب سؤالك القانوني هنا...',
      'chat.send': 'إرسال',
      'chat.export': 'تصدير PDF',
      'chat.clear': 'مسح المحادثة',
      'chat.welcome': 'مرحباً! أنا مساعدك القانوني الذكي. كيف يمكنني مساعدتك اليوم؟',
      'chat.typing': 'الذكي الاصطناعي يكتب...',
      
      // Crime Reporting
      'report.title': 'بلاغ جريمة مجهول',
      'report.subtitle': 'ستتم حماية هويتك',
      'report.category': 'فئة الجريمة',
      'report.category.theft': 'سرقة',
      'report.category.assault': 'اعتداء',
      'report.category.corruption': 'فساد',
      'report.category.cybercrime': 'جريمة إلكترونية',
      'report.category.fraud': 'احتيال',
      'report.category.harassment': 'مضايقة',
      'report.category.other': 'أخرى',
      'report.description': 'الوصف',
      'report.description.placeholder': 'يرجى تقديم تفاصيل عن الحادثة...',
      'report.attachments': 'المرفقات',
      'report.attachments.hint': 'ارفع أي ملفات أو صور ذات صلة',
      'report.submit': 'تقديم البلاغ',
      'report.success.title': 'تم تقديم البلاغ بنجاح',
      'report.success.subtitle': 'رقم قضيتك هو:',
      'report.success.note': 'يرجى حفظ هذا الرقم لتتبع حالة بلاغك',
      
      // Common
      'button.loading': 'جارٍ التحميل...',
      'button.back': 'رجوع',
      'button.next': 'التالي',
      'button.cancel': 'إلغاء',
      'button.save': 'حفظ',
      'footer.rights': '© 2024 منصة القانونية الذكية. جميع الحقوق محفوظة.',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;