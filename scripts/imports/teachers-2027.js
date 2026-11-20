// Transcribed from the eight supplied Wales brochures. No hall assignments are inferred.
const days=['සඳුදා','අඟහරුවාදා','බදාදා','බ්‍රහස්පතින්දා','සිකුරාදා','සෙනසුරාදා','ඉරිදා'];
const records=[];
function add(id,name,subject,grades,qualifications,rows,extra={}){records.push({id:'brochure-2027-'+id,name,subject,grades,qualifications,programme:'ol',medium:'සිංහල මාධ්‍ය',keywords:id.replaceAll('-',' ')+' '+subject,bio:grades+' · '+subject,notes:'',photo:'/images/teachers/'+id+'.webp',media:null,type:'male',color:'sage',published:true,demo:false,schedule:[],announcedSchedule:rows.map(([grade,day,start,end,note=''])=>({grade,day:days[day],start,end,note,location:'පන්ති ශාලාව ආයතනයෙන් තහවුරු කරගන්න.'})),...extra});}
add('rasika-maths','රසික සර්','ගණිතය','9–11 ශ්‍රේණි','B.Com (University of Sri Jayewardenepura); Diploma in Psychology & Counseling',[
['9 ශ්‍රේණිය',1,'15:30','17:30'],['10 ශ්‍රේණිය',4,'17:00','20:00'],['11 ශ්‍රේණිය',1,'17:30','20:30']]);
add('devaka-mahinga','දේවක මිහිරංග','ගණිතය','6, 9, 10, 11 ශ්‍රේණි','B.Tec (Eng), OUSL; QS Acta',[
['6 ශ්‍රේණිය',4,'15:15','16:45'],['9 ශ්‍රේණිය',2,'17:30','19:30'],['10 ශ්‍රේණිය · 1 කණ්ඩායම',3,'15:30','18:00'],['10 ශ්‍රේණිය · 2 කණ්ඩායම',4,'19:00','21:00'],['11 ශ්‍රේණිය · 1 කණ්ඩායම',3,'18:00','21:15'],['11 ශ්‍රේණිය · 2 කණ්ඩායම',4,'17:00','19:00']]);
add('vidula-perera','විදුප පෙරේරා','ගණිතය','6–11 ශ්‍රේණි','',[
['6 ශ්‍රේණිය',0,'15:30','17:30'],['7 ශ්‍රේණිය',1,'15:30','17:30'],['8 ශ්‍රේණිය',5,'15:30','17:30'],['9 ශ්‍රේණිය',5,'13:30','15:30'],['10 ශ්‍රේණිය',5,'10:30','13:30'],['11 ශ්‍රේණිය',5,'07:30','10:30']],{notes:'පත්‍රිකාවේ සඳහන් ස්ථානය: සිටි බේක් හවුස් උඩු මහල, වේල්ස් Hall No. 04. G/R/B hall code එක තහවුරු කරගන්න.'});
add('indum-gunawardhana','ඉඳුම් ගුණවර්ධන','ගණිතය','6–11 ශ්‍රේණි','BBA; Diploma in Teaching (Mathematics); Diploma in Psychology & Counseling',[
['6 ශ්‍රේණිය',5,'15:00','16:30'],['7 ශ්‍රේණිය',5,'11:00','13:00'],['8 ශ්‍රේණිය',5,'09:00','11:00'],['9 ශ්‍රේණිය',5,'08:00','10:00'],['10 ශ්‍රේණිය',5,'16:30','18:30'],['11 ශ්‍රේණිය',5,'13:00','15:00']],{notes:'පත්‍රිකාවේ 8 සහ 9 ශ්‍රේණි වේලාවන් එකිනෙක අතිච්ඡාදනය වේ. ආයතනයෙන් තහවුරු කරගන්න.'});
add('achintha-aramasinghe','අචින්ත අරමසිංහ','ගණිතය / විද්‍යාව','6, 7, 8, 10, 11 ශ්‍රේණි','B.Sc (Hons), University of Sri Jayewardenepura',[
['6 ශ්‍රේණිය · ගණිතය',1,'17:30','19:00'],['10 ශ්‍රේණිය · ගණිතය',6,'16:30','18:30'],['11 ශ්‍රේණිය · ගණිතය',6,'13:30','16:30'],['6 ශ්‍රේණිය · විද්‍යාව',0,'18:00','19:30'],['7 ශ්‍රේණිය · විද්‍යාව',0,'15:00','16:30'],['8 ශ්‍රේණිය · විද්‍යාව',0,'16:30','18:00']]);
add('krd','KRD සර්','ගණිතය','6–11 ශ්‍රේණි','B.Sc (Hons), University of Colombo',[
['6 ශ්‍රේණිය',2,'16:30','18:30'],['7 ශ්‍රේණිය',6,'16:30','18:00'],['8 ශ්‍රේණිය',5,'11:30','13:30','පත්‍රිකාවේ ප.ව. 11.30–1.30 ලෙස ඇත; දහවල් වේලාව තහවුරු කරගන්න.'],['9 ශ්‍රේණිය',2,'18:30','20:30'],['10 ශ්‍රේණිය',5,'13:30','15:30'],['11 ශ්‍රේණිය',5,'08:00','11:00']]);
add('prageeth-madushan','ප්‍රගීත් මධුෂාන්','විද්‍යාව','9–11 ශ්‍රේණි','B.A.M.S., University of Colombo',[
['9 ශ්‍රේණිය',4,'15:15','17:15'],['10 ශ්‍රේණිය',0,'16:00','18:00'],['11 ශ්‍රේණිය',0,'18:00','20:00']]);
add('madhusanka-samarasekara','මධුසංක සමරසේකර','විද්‍යාව','6–9 ශ්‍රේණි','B.Sc (Hons) (Bio), USJ; Researcher (MRI), Colombo; Diploma in Psychology & Counseling',[
['6 ශ්‍රේණිය',4,'17:00','18:30'],['7 ශ්‍රේණිය',4,'18:30','20:00'],['8 ශ්‍රේණිය',0,'17:00','18:30'],['9 ශ්‍රේණිය',0,'18:30','20:00']]);
add('prasanna-gihan','ප්‍රසන්න ගීගනගේ','ඉංග්‍රීසි','4–11 ශ්‍රේණි','B.A., University of Colombo',[
['4–6 ශ්‍රේණි · Spoken English',0,'15:30','17:00'],['6 ශ්‍රේණිය',0,'17:00','19:00'],['7 ශ්‍රේණිය',5,'08:30','10:30'],['8 ශ්‍රේණිය',2,'17:30','19:30'],['9 ශ්‍රේණිය',2,'15:30','17:30'],['10 ශ්‍රේණිය',5,'10:30','12:30'],['11 ශ්‍රේණිය',1,'17:30','19:30']]);
add('koshala-kannangara','කොශාල් කන්නන්ගර','ඉංග්‍රීසි','10–11 ශ්‍රේණි','Diploma in English (Aqu. College); B.Bm (Kelaniya)',[
['10 ශ්‍රේණිය',1,'18:15','20:15'],['11 ශ්‍රේණිය',1,'16:00','18:00']]);
add('isuru-nanayakkara','ඉසුරු නානායක්කාර','ඉංග්‍රීසි','6–9 ශ්‍රේණි','B.A. International Relations (SP), University of Colombo; Diploma in English',[
['6 ශ්‍රේණිය',6,'15:00','16:30'],['7 ශ්‍රේණිය',0,'15:30','17:00'],['8 ශ්‍රේණිය',0,'17:00','18:30'],['9 ශ්‍රේණිය',0,'18:30','20:30']]);
add('isuru-kaluwadewage','ඉසුරු කළුවරදෙවගේ (කළු / Black)','සිංහල','10–11 ශ්‍රේණි','B.A. (Sinhala) Special, University of Sri Jayewardenepura',[
['10 ශ්‍රේණිය · 1 කණ්ඩායම',3,'19:00','21:00'],['10 ශ්‍රේණිය · 2 කණ්ඩායම',4,'16:00','18:00'],['11 ශ්‍රේණිය · 1 කණ්ඩායම',3,'16:00','19:00'],['11 ශ්‍රේණිය · 2 කණ්ඩායම',4,'18:00','21:00']]);
add('ayantha-sudesh','අයන්ත සුනේෂ්','සිංහල','6–9 ශ්‍රේණි','B.A. (SP), University of Colombo',[
['6 ශ්‍රේණිය',1,'17:30','19:30'],['7 ශ්‍රේණිය',2,'15:30','17:30'],['8 ශ්‍රේණිය',0,'15:30','17:00'],['9 ශ්‍රේණිය',1,'15:30','17:30']]);
add('sanjeewa-panvilage','සංජීව පන්විලගේ','ඉතිහාසය','6–11 ශ්‍රේණි','B.A. (History), University of Sri Jayewardenepura',[
['6 ශ්‍රේණිය',3,'15:30','17:00'],['7 ශ්‍රේණිය',2,'17:30','19:00'],['8 ශ්‍රේණිය',3,'17:00','18:30'],['9 ශ්‍රේණිය',2,'16:00','17:30'],['10 ශ්‍රේණිය · 1 කණ්ඩායම',1,'18:30','20:30'],['10 ශ්‍රේණිය · 2 කණ්ඩායම',3,'18:30','20:30'],['11 ශ්‍රේණිය · 1 කණ්ඩායම',1,'15:30','18:30'],['11 ශ්‍රේණිය · 2 කණ්ඩායම',2,'19:00','21:30']]);
add('yasantha-madushan','යසන්ත මධුෂාන්','ඉතිහාසය','6, 10, 11 ශ්‍රේණි','B.A. (Kelaniya); B.Ed.; PGDEM',[
['6 ශ්‍රේණිය',0,'14:30','16:00'],['10 ශ්‍රේණිය',6,'14:00','16:00'],['11 ශ්‍රේණිය',6,'16:00','18:00']]);
add('keshan-munasinghe','කෙෂාන් මුණසිංහ','ඉතිහාසය','9–11 ශ්‍රේණි','B.A. (UG) History, BPU; Diploma in English; Diploma in ICT',[
['10 ශ්‍රේණිය',4,'18:15','20:15'],['11 ශ්‍රේණිය',4,'15:30','17:30']],{notes:'පත්‍රිකාවේ සඳහන් ස්ථානය: සිටි බේක් හවුස් උඩු මහල, වේල්ස් Hall No. 04. 9 ශ්‍රේණියේ වේලාව සඳහන් නැත.'});
add('tharuka-dhananjaya','තරුක ධනංජය','ව්‍යාපාර හා ගිණුම්කරණ අධ්‍යයනය','10–11 ශ්‍රේණි','B.Sc (Management), USJP; AAT Passed Finalist; Certified Business Accountant (CBA)',[
['10 ශ්‍රේණිය · 1 කණ්ඩායම',2,'18:00','20:00'],['10 ශ්‍රේණිය · 2 කණ්ඩායම',3,'15:30','17:30'],['11 ශ්‍රේණිය · 1 කණ්ඩායම',2,'15:00','18:00'],['11 ශ්‍රේණිය · 2 කණ්ඩායම',3,'17:30','20:30']]);
add('prabhath-elladeniya','ප්‍රභාත් ඇල්ලදෙනිය','ව්‍යාපාර හා ගිණුම්කරණ අධ්‍යයනය','10–11 ශ්‍රේණි','BBA (Management) Special, University of Colombo; CBF, DBF (IBSL), AIB Sri Lanka',[
['10 ශ්‍රේණිය',1,'15:00','17:00'],['11 ශ්‍රේණිය',1,'17:00','19:00'],['Paper Class',1,'19:00','20:30']]);
add('sankha-fernando','සංඛ ප්‍රනාන්දු','ව්‍යාපාර හා ගිණුම්කරණ අධ්‍යයනය','10–11 ශ්‍රේණි','B.Sc (Management) Special, University of Sri Jayewardenepura',[
['10 ශ්‍රේණිය',2,'15:30','17:30'],['11 ශ්‍රේණිය',1,'18:00','20:00']]);
add('nuwan-wijesurendra','නුවන් විජේසුරේන්ද්‍ර','තොරතුරු හා සන්නිවේදන තාක්ෂණය','6, 10, 11 ශ්‍රේණි','BIT (University of Colombo); B.Sc (Hons) Computer Science (University of Westminster)',[
['6 ශ්‍රේණිය',3,'16:00','17:30','සිංහල හා ඉංග්‍රීසි මාධ්‍ය'],['10 ශ්‍රේණිය',6,'15:00','17:00','සිංහල මාධ්‍ය'],['10 ශ්‍රේණිය',1,'18:00','20:00','ඉංග්‍රීසි මාධ්‍ය'],['11 ශ්‍රේණිය',3,'19:00','21:00','සිංහල මාධ්‍ය'],['11 ශ්‍රේණිය',5,'18:30','20:30','ඉංග්‍රීසි මාධ්‍ය']],{medium:'සිංහල / English'});
add('rashmi-wijesurendra','රශ්මි විජේසුරේන්ද්‍ර','තොරතුරු හා සන්නිවේදන තාක්ෂණය','7–9 ශ්‍රේණි','BIT (University of Colombo); DBF (Banking and Finance)',[
['7 ශ්‍රේණිය',5,'11:30','13:00'],['8 ශ්‍රේණිය',5,'10:00','11:30'],['9 ශ්‍රේණිය',4,'17:00','18:30']],{medium:'සිංහල / English',type:'female'});
add('lahiru-fernando','ලහිරු ප්‍රනාන්දු','දෙමළ','6–9 ශ්‍රේණි','',[
['6 ශ්‍රේණිය · 1 කණ්ඩායම',0,'15:00','16:30'],['6 ශ්‍රේණිය · 2 කණ්ඩායම',3,'18:00','19:30'],['7 ශ්‍රේණිය',0,'16:30','18:00'],['8 ශ්‍රේණිය',3,'15:00','16:30'],['9 ශ්‍රේණිය · 1 කණ්ඩායම',3,'16:30','18:00'],['9 ශ්‍රේණිය · 2 කණ්ඩායම',5,'15:30','17:00']]);
add('rasika-wickramarathna','රසික වික්‍රමරත්න','ශිෂ්‍යත්වය','3–5 ශ්‍රේණි','',[
['3 ශ්‍රේණිය',5,'13:45','15:45'],['4 ශ්‍රේණිය',5,'15:30','17:30'],['5 ශ්‍රේණිය',5,'17:00','19:30']],{programme:'scholarship',notes:'පත්‍රිකාවේ පන්ති වේලාවන් කොටසක් අතිච්ඡාදනය වේ. පැමිණීමට පෙර ආයතනයෙන් තහවුරු කරගන්න.'});
add('nikesha-sajini','නිකේෂා සජිනි','ජපන් භාෂාව','6–11 ශ්‍රේණි','Faculty of Humanities and Education, CINEC; International Diploma in General Psychology and Counseling, ICBT; JLPT N5/N4/N3',[
['6 ශ්‍රේණිය',2,'15:00','17:00'],['7 ශ්‍රේණිය',2,'15:00','17:00'],['8 ශ්‍රේණිය',2,'15:00','17:00'],['9 ශ්‍රේණිය',2,'15:00','17:00'],['10 ශ්‍රේණිය',4,'15:00','17:00'],['11 ශ්‍රේණිය',4,'15:00','17:00']],{type:'female',notes:'පත්‍රිකාවේ 6–9 ශ්‍රේණිවලට එකම වේලාවත්, 10–11 ශ්‍රේණිවලට එකම වේලාවත් සඳහන්ය. ඒකාබද්ධ පන්තියක්ද යන්න ආයතනයෙන් තහවුරු කරගන්න.'});
add('nilmini-wickramasinghe','Nilmini Wickramasinghe','Mathematics / Science','Grades 6–11','B.Sc (OUSL)',[
['Grade 6 · Maths',4,'17:15','19:00'],['Grade 7 · Maths',4,'15:30','17:15'],['Grade 8 · Maths',6,'17:00','19:00'],['Grade 9 · Maths · Group I',5,'13:30','15:30'],['Grade 9 · Maths · Group II',4,'19:00','20:45'],['Grade 10 · Maths',2,'18:30','21:30'],['Grade 11 · Maths',2,'16:00','19:00'],['Grade 6 · Science · Group I',5,'08:30','10:30'],['Grade 6 · Science · Group II',6,'19:00','20:30'],['Grade 7 · Science',5,'18:30','20:30'],['Grade 8 · Science',1,'15:30','17:30'],['Grade 9 · Science',0,'18:00','20:00'],['Grade 10 · Science',5,'15:30','18:30'],['Grade 11 · Science',5,'10:30','13:30','Brochure prints 10.30–1.30am; please confirm the end time.']],{medium:'English',type:'female',notes:'Wednesday Maths classes overlap by 30 minutes in the brochure. Please confirm with the institute.'});
add('sanjeewa-weerasooriya','Sanjeewa Weerasooriya','Commerce','Grades 10–11','B.Sc Marketing Management (Special)',[
['Grade 10 · Group I',4,'18:30','20:30'],['Grade 10 · Group II',6,'16:00','18:00'],['Grade 11 · Group I',4,'15:30','18:30'],['Grade 11 · Group II',6,'11:00','14:00']],{medium:'English'});
add('mahesh-dilhan','Mahesh Dilhan','Commerce','Grades 10–11','BBA SP FIN, University of Colombo; PGDE, Open University of Sri Lanka; Advanced Level Paper Marking Examiner',[
['Grade 10',4,'18:00','20:00'],['Grade 11',4,'16:00','18:00']],{medium:'English',notes:'Brochure location: Wales Hall No. 04, upstairs at City Bake House. Please confirm the G/R/B hall code.'});
add('shivanthi-sulakkana','Shivanthi Sulakkana','English Literature','Grades 10–11','Diploma/HND in English Language and Literature; Former Teacher, Louvre International College',[
['Grade 10',6,'14:00','16:00'],['Grade 11',6,'16:00','18:00']],{medium:'English',type:'female'});
records.forEach(t=>{t.keywords+=' '+({'ගණිතය':'maths mathematics','විද්‍යාව':'science','ගණිතය / විද්‍යාව':'maths mathematics science','ඉංග්‍රීසි':'english','සිංහල':'sinhala','ඉතිහාසය':'history','ව්‍යාපාර හා ගිණුම්කරණ අධ්‍යයනය':'commerce business accounting','තොරතුරු හා සන්නිවේදන තාක්ෂණය':'ICT information technology','දෙමළ':'tamil','ශිෂ්‍යත්වය':'scholarship primary','ජපන් භාෂාව':'japanese'}[t.subject]||'');});
export const brochureTeachers=records;
// Idempotent: retain subsequent admin edits and all existing records.
export function mergeBrochureTeachers(data){
 const next=structuredClone(data);
 for(const teacher of brochureTeachers){
  if(!next.teachers.some(t=>t.id===teacher.id))next.teachers.push(structuredClone(teacher));
  for(const existing of next.teachers){
   if(existing.programme==='al'&&existing.name===teacher.name&&!existing.photo)existing.photo=teacher.photo;
  }
 }
 return next;
}
