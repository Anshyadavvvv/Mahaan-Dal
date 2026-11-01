'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Site } from '@/components/Site';
import { siteConfig } from '@/lib/config';
import {
  Shield,
  Award,
  Users,
  Scale,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Tractor,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Send,
  UserCheck,
  FileText,
  Clock,
  ChevronRight
} from 'lucide-react';
import hi from '@/lib/translations/hi.json';
import en from '@/lib/translations/en.json';

type Lang = 'hi' | 'en';

interface PageData {
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  render: (lang: Lang) => React.ReactNode;
}

const pagesData: Record<string, PageData> = {
  about: {
    titleHi: 'हमारे बारे में',
    titleEn: 'About Mahan Dal',
    subtitleHi: 'समानता, गरिमा और सामाजिक न्याय के लिए समर्पित जन आंदोलन',
    subtitleEn: 'A dedicated political movement for equality, dignity and constitutional justice',
    render: (lang) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        <div className="admin-card">
          <span className="kicker">{lang === 'hi' ? 'हमारा परिचय' : 'Our Identity'}</span>
          <h2 style={{ fontSize: 28, margin: '12px 0 16px', fontWeight: 800 }}>
            {lang === 'hi' ? 'महान दल: शोषितों और वंचितों की बुलंद आवाज़' : 'Mahan Dal: The Resolute Voice of the Marginalized'}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#334155' }}>
            {lang === 'hi'
              ? 'महान दल भारत निर्वाचन आयोग द्वारा विधिवत पंजीकृत एक जन-आधारित राजनीतिक दल है। राष्ट्रीय अध्यक्ष श्री केशव देव मौर्य के नेतृत्व में यह दल पिछले दो दशकों से समाज के उपेक्षित, पिछड़े, दलित और किसान समाज के संवैधानिक अधिकारों की रक्षा के लिए ज़मीनी स्तर पर संघर्ष कर रहा है।'
              : 'Mahan Dal is a registered political party with the Election Commission of India. Led by National President Shri Keshav Dev Maurya, the party has championed the cause of backward classes, Dalits, small farmers, and working families for more than two decades.'}
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#334155' }}>
            {lang === 'hi'
              ? 'हमारा दृढ़ विश्वास है कि जब तक समाज के अंतिम व्यक्ति तक सत्ता में न्यायसंगत हिस्सेदारी और सम्मानजनक जीवन का अवसर नहीं पहुँचता, तब तक लोकतन्त्र अधूरा है। महान दल महापुरुषों—महात्मा ज्योतिराव फुले, क्रांतिज्योति सावित्रीबाई फुले, छत्रपति शाहू जी महाराज, डॉ. भीमराव आंबेडकर, सम्राट अशोक और मान्यवर कांशीराम जी के विचारों को धरातल पर उतारने के लिए कृतसंकल्पित है।'
              : 'We firmly believe true democracy is achieved only when the last person in society receives equal representation and dignity. Mahan Dal is guided by the philosophy of Mahatma Jyotirao Phule, Savitribai Phule, Chhatrapati Shahu Ji Maharaj, Dr. B.R. Ambedkar, Emperor Ashoka, and Manyavar Kanshi Ram.'}
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Scale size={24} />
            </div>
            <h3>{lang === 'hi' ? 'समानुपातिक हिस्सेदारी' : 'Proportional Representation'}</h3>
            <p>
              {lang === 'hi'
                ? 'जिसकी जितनी संख्या भारी, उसकी उतनी हिस्सेदारी के सिद्धांत पर शासन व प्रशासन में भागीदारी।'
                : 'Ensuring fair representation in governance, administration, and public resources proportional to demographic presence.'}
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Users size={24} />
            </div>
            <h3>{lang === 'hi' ? 'किसान व मज़दूर कल्याण' : 'Farmers & Workers Welfare'}</h3>
            <p>
              {lang === 'hi'
                ? 'कृषि लागत के मुकाबले लाभकारी मूल्य, कर्ज़ मुक्ति सहायता और कामगारों के लिए न्यूनतम मजदूरी गारंटी।'
                : 'Remunerative crop prices at 1.5x production cost, debt relief mechanisms, and guaranteed fair living wages.'}
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <GraduationCap size={24} />
            </div>
            <h3>{lang === 'hi' ? 'सुलभ व निःशुल्क शिक्षा' : 'Free Universal Education'}</h3>
            <p>
              {lang === 'hi'
                ? 'कमज़ोर और ग्रामीण परिवारों के बच्चों के लिए प्राथमिक से लेकर उच्च शिक्षा व प्रतियोगी परीक्षाओं की निःशुल्क व्यवस्था।'
                : 'Universal high-standard schooling and free coaching for competitive examinations for rural and disadvantaged youth.'}
            </p>
          </div>
        </div>
      </div>
    )
  },

  history: {
    titleHi: 'हमारा इतिहास एवं संघर्ष यात्रा',
    titleEn: 'Our History & Journey',
    subtitleHi: 'दो दशकों का अनवरत संघर्ष, जन आंदोलन और सामाजिक चेतना का विस्तार',
    subtitleEn: 'Two decades of steadfast struggle, mass mobilization and social consciousness',
    render: (lang) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div className="admin-card">
          <span className="kicker">{lang === 'hi' ? 'स्थापना एवं पृष्ठभूमि' : 'Foundation & Background'}</span>
          <h2 style={{ fontSize: 26, margin: '12px 0 16px', fontWeight: 800 }}>
            {lang === 'hi' ? 'उद्देश्य एवं वैचारिक आंदोलन' : 'The Mission and Ideological Movement'}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#334155' }}>
            {lang === 'hi'
              ? 'महान दल की स्थापना समाज के उन उपेक्षित वर्गों को राजनीतिक शक्ति और स्वाभिमान का अहसास कराने के उद्देश्य से की गई, जो केवल मतदान तक सीमित रह गए थे और सत्ता के गलियारों में जिनकी कोई सुनवाई नहीं थी। राष्ट्रीय अध्यक्ष श्री केशव देव मौर्य जी ने ग्रामीण अंचलों में पदयात्राओं, जनसभाओं और आंदोलनों के ज़रिए शोषितों को एकजुट किया।'
              : 'Mahan Dal was founded to restore political agency and dignity to communities historically marginalized and neglected in policymaking. Under National President Shri Keshav Dev Maurya, the party organized extensive grassroots marches, rallies, and advocacy drives across Uttar Pradesh and adjoining regions.'}
          </p>
        </div>

        {/* Timeline Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="pillar-card" style={{ borderLeft: '4px solid #ea580c' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#ea580c' }}>2008</span>
            <h3 style={{ margin: '6px 0 10px' }}>{lang === 'hi' ? 'दल का औपचारिक गठन एवं निर्वाचन आयोग में पंजीकरण' : 'Formal Inception & ECI Registration'}</h3>
            <p>{lang === 'hi' ? 'भारत निर्वाचन आयोग के समक्ष दल का विधिवत पंजीकरण हुआ और शोषित-पिछड़े वर्ग की राजनीतिक आवाज़ बुलंद हुई।' : 'Formal registration with the Election Commission of India and establishment of core organizational units.'}</p>
          </div>

          <div className="pillar-card" style={{ borderLeft: '4px solid #15803d' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#15803d' }}>2010 - 2017</span>
            <h3 style={{ margin: '6px 0 10px' }}>{lang === 'hi' ? 'ऐतिहासिक किसान महापंचायतें एवं जन चेतना रैलियाँ' : 'Historic Farmer Rallies & Peasant Mobilization'}</h3>
            <p>{lang === 'hi' ? 'लाखों किसानों, युवाओं और दबे-कुचले नागरिकों के साथ ज़िला मुख्यालयों पर हक़ और अधिकार की गूँज।' : 'Organized state-wide peasant assemblies for fair crop pricing, timely fertilizer, and electricity subsides.'}</p>
          </div>

          <div className="pillar-card" style={{ borderLeft: '4px solid #1d4ed8' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#1d4ed8' }}>2018 - {lang === 'hi' ? 'वर्तमान' : 'Present'}</span>
            <h3 style={{ margin: '6px 0 10px' }}>{lang === 'hi' ? 'डिजिटल जन सुनवाई एवं 75+ ज़िलों में सक्रिय विस्तार' : 'Digital Jan Sunwai & Expansion to 75+ Districts'}</h3>
            <p>{lang === 'hi' ? 'आधुनिक तकनीक के साथ जन सुनवाई प्रकोष्ठ, अध्यक्ष को सीधा पत्र एवं 10 लाख से अधिक समर्पित कार्यकर्ताओं का नेटवर्क।' : 'Deployment of digital grievance cells, online direct letters to the president, and over 1 million dedicated cadres.'}</p>
          </div>
        </div>
      </div>
    )
  },

  agenda: {
    titleHi: 'हमारा 6-सूत्रीय एजेंडा',
    titleEn: 'Our 6-Point Charter',
    subtitleHi: 'जनहित, लोककल्याण एवं संवैधानिक न्याय के लिए हमारा नीतिगत घोषणापत्र',
    subtitleEn: 'Our core policy commitments for public welfare, prosperity and justice',
    render: (lang) => {
      const t = lang === 'hi' ? hi : en;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div className="subpage-agenda-grid">
            {t.agendaDetails.map((item, idx) => (
              <div className="agenda-item-card" key={idx}>
                <div className="agenda-item-header">
                  <div className="agenda-number-pill">
                    <span>0{idx + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="admin-card" style={{ textAlign: 'center', background: '#fffaf5', borderColor: '#fed7aa' }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 12px' }}>
              {lang === 'hi' ? 'इस संकल्प को साकार करने के लिए महान दल से जुड़ें' : 'Join Mahan Dal to Realize This Vision'}
            </h3>
            <p style={{ maxWidth: 600, margin: '0 auto 20px', color: '#64748b' }}>
              {lang === 'hi'
                ? 'हर नागरिक की भागीदारी से ही वास्तविक परिवर्तन संभव है। आज ही डिजिटल सदस्य बनें।'
                : 'Real change is possible through active civic participation. Become a digital member today.'}
            </p>
            <button
              className="btn-header-join"
              style={{ display: 'inline-flex' }}
              onClick={() => window.dispatchEvent(new CustomEvent('md:open', { detail: 'member' }))}
            >
              <UserCheck size={18} />
              <span>{t.membership}</span>
            </button>
          </div>
        </div>
      );
    }
  },

  contact: {
    titleHi: 'संपर्क एवं केंद्रीय कार्यालय',
    titleEn: 'Contact & Central Office',
    subtitleHi: 'हमसे संवाद करें, अपने क्षेत्र की समस्याएँ साझा करें अथवा सुझाव भेजें',
    subtitleEn: 'Reach out to our headquarters, share suggestions or seek guidance',
    render: (lang) => (
      <div className="office-grid">
        <div className="office-card-hq">
          <span className="kicker">{lang === 'hi' ? 'केंद्रीय कैंप कार्यालय' : 'National Headquarters'}</span>
          <h3>{lang === 'hi' ? 'कार्यालय विवरण' : 'Official Coordinates'}</h3>
          <div className="contact-lines" style={{ marginTop: 24 }}>
            <div className="contact-line-item">
              <div className="contact-icon-wrap">
                <MapPin size={22} />
              </div>
              <div>
                <strong>{lang === 'hi' ? 'पता' : 'Address'}</strong>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                  {lang === 'hi' ? siteConfig.officeAddress : siteConfig.officeAddressEn}
                </p>
              </div>
            </div>

            <div className="contact-line-item">
              <div className="contact-icon-wrap">
                <Phone size={22} />
              </div>
              <div>
                <strong>{lang === 'hi' ? 'दूरभाष एवं हेल्पलाइन' : 'Phone & Helpline'}</strong>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>{siteConfig.phone}</p>
                <p style={{ margin: '2px 0 0', color: '#15803d', fontWeight: 600 }}>
                  {siteConfig.missedCall}
                </p>
              </div>
            </div>

            <div className="contact-line-item">
              <div className="contact-icon-wrap">
                <Mail size={22} />
              </div>
              <div>
                <strong>{lang === 'hi' ? 'ईमेल' : 'Email'}</strong>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>{siteConfig.email}</p>
              </div>
            </div>

            <div className="contact-line-item">
              <div className="contact-icon-wrap">
                <Clock size={22} />
              </div>
              <div>
                <strong>{lang === 'hi' ? 'कार्यालय समय' : 'Office Timings'}</strong>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                  {lang === 'hi' ? 'सोमवार से शनिवार: 10:00 पूर्वाह्न से 06:00 अपराह्न' : 'Monday to Saturday: 10:00 AM to 06:00 PM'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="office-card-hq" style={{ background: '#f8fafc' }}>
          <span className="kicker">{lang === 'hi' ? 'त्वरित सहायता' : 'Fast Actions'}</span>
          <h3>{lang === 'hi' ? 'ऑनलाइन सेवाएँ' : 'Online Portals'}</h3>
          <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: 28 }}>
            {lang === 'hi'
              ? 'प्रशासनिक शिकायत अथवा न्याय संबंधी सहायता के लिए सीधे हमारे ऑनलाइन जन सुनवाई प्रकोष्ठ का प्रयोग करें।'
              : 'Use our online portals to lodge public grievances, write to party leadership, or enroll as a verified volunteer.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <button
              className="btn-portal"
              style={{ background: '#ea580c', color: '#ffffff' }}
              onClick={() => window.dispatchEvent(new CustomEvent('md:open', { detail: 'jan' }))}
            >
              <FileText size={18} />
              <span>{lang === 'hi' ? 'जन सुनवाई में समस्या दर्ज करें' : 'Submit Jan Sunwai Grievance'}</span>
            </button>

            <button
              className="btn-portal"
              style={{ background: '#15803d', color: '#ffffff' }}
              onClick={() => window.dispatchEvent(new CustomEvent('md:open', { detail: 'letter' }))}
            >
              <Send size={18} />
              <span>{lang === 'hi' ? 'राष्ट्रीय अध्यक्ष को पत्र लिखें' : 'Write to National President'}</span>
            </button>

            <button
              className="btn-portal"
              style={{ background: '#1d4ed8', color: '#ffffff' }}
              onClick={() => window.dispatchEvent(new CustomEvent('md:open', { detail: 'member' }))}
            >
              <UserCheck size={18} />
              <span>{lang === 'hi' ? 'डिजिटल सदस्य बनें' : 'Become a Digital Member'}</span>
            </button>
          </div>
        </div>
      </div>
    )
  },

  membership: {
    titleHi: 'सदस्यता महाअभियान',
    titleEn: 'Membership Campaign',
    subtitleHi: 'महान दल के जन आंदोलन से जुड़ें और सामाजिक परिवर्तन के सूत्रधार बनें',
    subtitleEn: 'Join the Mahan Dal movement and lead grassroots social change',
    render: (lang) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div className="admin-card">
          <span className="kicker">{lang === 'hi' ? 'सक्रिय भागीदारी' : 'Civic Engagement'}</span>
          <h2 style={{ fontSize: 26, margin: '12px 0 16px', fontWeight: 800 }}>
            {lang === 'hi' ? 'महान दल का सदस्य क्यों बनें?' : 'Why Join Mahan Dal?'}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#334155' }}>
            {lang === 'hi'
              ? 'महान दल केवल एक राजनीतिक दल नहीं, बल्कि समाज के दबे-कुचले, शोषित और उपेक्षित नागरिकों के स्वाभिमान व सम्मान की लड़ाई का मंच है। हमारी सदस्यता हर उस नागरिक के लिए खुली है जो समानता, बंधुत्व और संविधान के आदर्शों में निष्ठा रखता है।'
              : 'Mahan Dal is a dedicated civic platform championing equality, dignity, and rights for the marginalized. Membership is open to all citizens committed to democratic principles and social justice.'}
          </p>

          <div className="responsive-2col" style={{ marginTop: 24 }}>
            <div style={{ padding: 18, background: '#f0fdf4', borderRadius: 14, border: '1px solid #bbf7d0' }}>
              <strong style={{ color: '#166534', display: 'block', fontSize: 16, marginBottom: 4 }}>
                ✓ {lang === 'hi' ? 'निःशुल्क डिजिटल सदस्यता' : 'Free Digital Membership'}
              </strong>
              <span style={{ fontSize: 14, color: '#334155' }}>
                {lang === 'hi' ? 'ऑनलाइन फ़ॉर्म भरें अथवा केवल एक मिस्ड कॉल देकर सदस्य बनें।' : 'Register online or simply give a missed call to enroll.'}
              </span>
            </div>

            <div style={{ padding: 18, background: '#eff6ff', borderRadius: 14, border: '1px solid #bfdbfe' }}>
              <strong style={{ color: '#1e40af', display: 'block', fontSize: 16, marginBottom: 4 }}>
                ✓ {lang === 'hi' ? 'गोपनीयता की पूर्ण गारंटी' : 'Full Privacy Guarantee'}
              </strong>
              <span style={{ fontSize: 14, color: '#334155' }}>
                {lang === 'hi' ? 'हम कभी भी आधार कार्ड या संवेदनशील वित्तीय विवरण नहीं माँगते।' : 'We never solicit Aadhaar, voter ID, or sensitive personal data.'}
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button
              className="btn-header-join"
              style={{ fontSize: 16, padding: '14px 32px' }}
              onClick={() => window.dispatchEvent(new CustomEvent('md:open', { detail: 'member' }))}
            >
              <UserCheck size={20} />
              <span>{lang === 'hi' ? 'सदस्यता प्रपत्र भरें' : 'Fill Membership Form'}</span>
            </button>
          </div>
        </div>
      </div>
    )
  },

  'jan-sunwai': {
    titleHi: 'जन सुनवाई प्रकोष्ठ',
    titleEn: 'Jan Sunwai Grievance Cell',
    subtitleHi: 'नागरिकों की समस्याओं का पारदर्शी, उत्तरदायी और त्वरित निवारण',
    subtitleEn: 'Transparent, accountable and responsive redressal for public concerns',
    render: (lang) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div className="admin-card">
          <span className="kicker">{lang === 'hi' ? 'जन सेवा प्रकोष्ठ' : 'Citizen Assistance'}</span>
          <h2 style={{ fontSize: 26, margin: '12px 0 16px', fontWeight: 800 }}>
            {lang === 'hi' ? 'जन सुनवाई प्रणाली कैसे कार्य करती है?' : 'How Jan Sunwai Works'}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#334155' }}>
            {lang === 'hi'
              ? 'यदि आप या आपके क्षेत्र के नागरिक किसी प्रशासनिक लापरवाही, राजस्व विवाद, पुलिस प्रताड़ना, या बुनियादी नागरिक सुविधाओं के अभाव से जूझ रहे हैं, तो महान दल का जन सुनवाई प्रकोष्ठ आपके सहयोग के लिए सदैव तत्पर है।'
              : 'If you or your community are facing administrative apathy, land disputes, lack of basic civic services, or injustice, Mahan Dal’s dedicated Jan Sunwai grievance cell provides assistance.'}
          </p>

          <div className="portals-grid" style={{ marginTop: 24 }}>
            <div className="portal-card orange">
              <span style={{ fontSize: 28, fontWeight: 900, color: '#ea580c', marginBottom: 12 }}>01</span>
              <h3>{lang === 'hi' ? 'शिकायत दर्ज करें' : 'Submit Details'}</h3>
              <p>{lang === 'hi' ? 'समस्या का संक्षिप्त विवरण, ज़िला व आवश्यक दस्तावेज़ संलग्न करें।' : 'Provide full details, your district and attach relevant evidence.'}</p>
            </div>

            <div className="portal-card green">
              <span style={{ fontSize: 28, fontWeight: 900, color: '#15803d', marginBottom: 12 }}>02</span>
              <h3>{lang === 'hi' ? 'संदर्भ संख्या प्राप्त करें' : 'Get Reference ID'}</h3>
              <p>{lang === 'hi' ? 'शिकायत जमा होते ही आपको डिजिटल संदर्भ कोड प्राप्त होगा।' : 'Receive a unique tracking reference code immediately upon submission.'}</p>
            </div>

            <div className="portal-card blue">
              <span style={{ fontSize: 28, fontWeight: 900, color: '#1d4ed8', marginBottom: 12 }}>03</span>
              <h3>{lang === 'hi' ? 'प्रशासनिक संज्ञान' : 'Administrative Action'}</h3>
              <p>{lang === 'hi' ? 'दल के विधिक एवं जनसमस्या प्रतिनिधि संबंधित अधिकारियों से संपर्क कर समाधान का प्रयास करेंगे।' : 'Party legal and civic representatives take up the matter with authorities.'}</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button
              className="btn-header-join"
              style={{ background: '#ea580c', fontSize: 16, padding: '14px 32px' }}
              onClick={() => window.dispatchEvent(new CustomEvent('md:open', { detail: 'jan' }))}
            >
              <FileText size={20} />
              <span>{lang === 'hi' ? 'समस्या प्रपत्र खोलें' : 'Open Grievance Form'}</span>
            </button>
          </div>
        </div>
      </div>
    )
  },

  privacy: {
    titleHi: 'गोपनीयता नीति (Privacy Policy)',
    titleEn: 'Privacy Policy',
    subtitleHi: 'नागरिकों के व्यक्तिगत डेटा की सुरक्षा और गोपनीयता के प्रति हमारी दृढ़ प्रतिबद्धता',
    subtitleEn: 'Our rigorous commitment to protecting your personal data and privacy',
    render: (lang) => (
      <div className="admin-card" style={{ lineHeight: 1.8, color: '#334155' }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>1. {lang === 'hi' ? 'डेटा संग्रह एवं उद्देश्य' : 'Data Collection & Purpose'}</h3>
        <p>
          {lang === 'hi'
            ? 'महान दल पोर्टल पर एकत्रित की जाने वाली जानकारी (जैसे नाम, मोबाइल नंबर, ज़िला एवं जन समस्या विवरण) का उपयोग केवल जन सुनवाई, सदस्यता सत्यापन और प्रशासनिक सहायता प्रदान करने के उद्देश्य से किया जाता है।'
            : 'Information collected through this portal (such as name, mobile number, district, and grievance details) is strictly utilized for public grievance redressal, membership administration, and direct communication.'}
        </p>

        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginTop: 24 }}>2. {lang === 'hi' ? 'डेटा सुरक्षा एवं गैर-व्यावसायिक उपयोग' : 'Data Security & Non-Commercial Use'}</h3>
        <p>
          {lang === 'hi'
            ? 'हम किसी भी नागरिक के डेटा को किसी तीसरे पक्ष (Third Party) के साथ व्यावसायिक या विज्ञापन उद्देश्यों के लिए साझा अथवा विक्रय नहीं करते। आपकी समस्त जानकारी सुरक्षित सर्वरों पर संग्रहीत की जाती है।'
            : 'We never sell, trade, or share citizen information with commercial third parties. All submissions are stored securely with appropriate administrative and technical safeguards.'}
        </p>

        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginTop: 24 }}>3. {lang === 'hi' ? 'संवेदनशील पहचान पत्र' : 'Sensitive Identifiers'}</h3>
        <p>
          {lang === 'hi'
            ? 'महान दल अपनी सदस्यता अथवा जन सुनवाई के लिए कभी भी आधार संख्या, बैंक खाता विवरण या संवेदनशील वित्तीय जानकारी नहीं माँगता।'
            : 'Mahan Dal does not request Aadhaar numbers, bank account credentials, or sensitive financial information.'}
        </p>
      </div>
    )
  },

  terms: {
    titleHi: 'नियम एवं शर्तें (Terms & Conditions)',
    titleEn: 'Terms & Conditions',
    subtitleHi: 'महान दल आधिकारिक पोर्टल के उपयोग संबंधी मार्गदर्शिका व नियम',
    subtitleEn: 'Guidelines and conditions governing the use of the official portal',
    render: (lang) => (
      <div className="admin-card" style={{ lineHeight: 1.8, color: '#334155' }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>1. {lang === 'hi' ? 'सत्यता एवं सत्यनिष्ठा' : 'Accuracy and Truthfulness'}</h3>
        <p>
          {lang === 'hi'
            ? 'जन सुनवाई अथवा अध्यक्ष को पत्र प्रेषित करते समय प्रस्तुत किए गए तथ्य यथासंभव सत्य एवं प्रामाणिक होने चाहिए। किसी को दुर्भावनापूर्वक बदनाम करने के उद्देश्य से गलत शिकायत दर्ज करना वर्जित है।'
            : 'All facts and submissions presented via Jan Sunwai or letters to the leadership must be genuine and accurate. Submitting defamatory or intentionally misleading content is prohibited.'}
        </p>

        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginTop: 24 }}>2. {lang === 'hi' ? 'नागरिक आचार संहिता' : 'Civic Conduct'}</h3>
        <p>
          {lang === 'hi'
            ? 'यह पोर्टल जनता और नेतृत्व के बीच संवाद का एक गरिमामयी माध्यम है। यहाँ किसी भी प्रकार की अभद्र, साम्प्रदायिक अथवा असंवैधानिक भाषा का प्रयोग स्वीकार्य नहीं है।'
            : 'This portal is a dignified conduit for communication between citizens and leadership. Unlawful, abusive, or unconstitutional conduct will not be tolerated.'}
        </p>
      </div>
    )
  },

  support: {
    titleHi: 'सहायता एवं मार्गदर्शन (Support & Help)',
    titleEn: 'Support & Help',
    subtitleHi: 'जन समस्याओं के समाधान एवं पोर्टल के उपयोग में आपकी सहायता हेतु समर्पित',
    subtitleEn: 'Dedicated to assisting citizens and answering inquiries',
    render: (lang) => (
      <div className="office-grid">
        <div className="office-card-hq">
          <span className="kicker">{lang === 'hi' ? 'हेल्पडेस्क' : 'Helpdesk'}</span>
          <h3>{lang === 'hi' ? 'संपर्क साधन' : 'Helpline Contacts'}</h3>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
            {lang === 'hi'
              ? 'यदि आपको अपनी शिकायत की स्थिति जानने में अथवा पोर्टल पर किसी फ़ॉर्म को भरने में कोई कठिनाई आ रही है, तो संपर्क करें:'
              : 'If you need help tracking your reference number or submitting any online form, our coordinators are here to assist:'}
          </p>

          <div className="contact-lines">
            <div className="contact-line-item">
              <div className="contact-icon-wrap"><Phone size={20} /></div>
              <div>
                <strong>{lang === 'hi' ? 'टोल-फ्री हेल्पलाइन' : 'Toll-Free Helpline'}</strong>
                <p style={{ margin: '4px 0 0', color: '#15803d', fontWeight: 700 }}>1800-120-0000</p>
              </div>
            </div>

            <div className="contact-line-item">
              <div className="contact-icon-wrap"><Mail size={20} /></div>
              <div>
                <strong>{lang === 'hi' ? 'ईमेल सपोर्ट' : 'Email Support'}</strong>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>{siteConfig.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="office-card-hq" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <span className="kicker">{lang === 'hi' ? 'पूछे जाने वाले प्रश्न' : 'FAQ'}</span>
          <h3 style={{ color: '#166534' }}>{lang === 'hi' ? 'त्वरित प्रश्नोत्तर' : 'Quick Answers'}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
            <div>
              <strong style={{ fontSize: 15, color: '#14532d' }}>
                Q. {lang === 'hi' ? 'शिकायत की स्थिति कैसे पता चलेगी?' : 'How do I track my grievance?'}
              </strong>
              <p style={{ margin: '4px 0 0', fontSize: 14, color: '#334155' }}>
                {lang === 'hi'
                  ? 'शिकायत दर्ज होने के बाद प्राप्त संदर्भ संख्या के साथ आप हमारे हेल्पलाइन नंबर पर संपर्क कर स्थिति जान सकते हैं।'
                  : 'You can quote your unique Reference Number on our helpline to receive instant status updates.'}
              </p>
            </div>
            <div>
              <strong style={{ fontSize: 15, color: '#14532d' }}>
                Q. {lang === 'hi' ? 'सदस्यता का कोई शुल्क है?' : 'Is there a membership fee?'}
              </strong>
              <p style={{ margin: '4px 0 0', fontSize: 14, color: '#334155' }}>
                {lang === 'hi'
                  ? 'नहीं, महान दल की प्रारंभिक डिजिटल सदस्यता पूर्णतः निःशुल्क है।'
                  : 'No, initial digital membership with Mahan Dal is completely free of charge.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default function Page({ params }: { params: { page: string } }) {
  const [lang, setLang] = useState<Lang>('hi');

  useEffect(() => {
    setLang(document.documentElement.lang === 'en' ? 'en' : 'hi');
    const observer = new MutationObserver(() => {
      setLang(document.documentElement.lang === 'en' ? 'en' : 'hi');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
    return () => observer.disconnect();
  }, []);

  const pageData = pagesData[params.page];

  if (!pageData) {
    return <Site />;
  }

  const title = lang === 'hi' ? pageData.titleHi : pageData.titleEn;
  const subtitle = lang === 'hi' ? pageData.subtitleHi : pageData.subtitleEn;

  return (
    <Site>
      <main>
        {/* Subpage Hero Banner */}
        <section className="subpage-hero">
          <div className="wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#ffedd5', marginBottom: 12 }}>
              <Link href="/" style={{ color: '#ffffff', fontWeight: 600 }}>
                {lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}
              </Link>
              <ChevronRight size={14} />
              <span>{title}</span>
            </div>
            <h1>{title}</h1>
            <p style={{ fontSize: 18, color: '#fffaf0', margin: '10px 0 0', maxWidth: 720 }}>
              {subtitle}
            </p>
          </div>
        </section>

        {/* Subpage Body Content */}
        <section className="wrap subpage-body">
          {pageData.render(lang)}
        </section>
      </main>
    </Site>
  );
}
