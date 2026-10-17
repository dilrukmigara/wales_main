import {notFound} from 'next/navigation';
import PublicSite from '../../../client/PublicSite';
const names:Record<string,string>={scholarship:'ශිෂ්‍යත්ව',ol:'සාමාන්‍ය පෙළ',al:'උසස් පෙළ'};
export async function generateMetadata({params}:{params:Promise<{programme:string}>}){const {programme}=await params;return {title:`${names[programme]||'පන්ති'} | Wales`,description:`${names[programme]||''} පන්ති සහ ගුරුවරුන් — වේල්ස් උසස් අධ්‍යාපන ආයතනය, රාවතාවත්ත.`};}
export default async function ProgrammePage({params}:{params:Promise<{programme:string}>}){const {programme}=await params;if(!names[programme])notFound();return <PublicSite programmeId={programme}/>}
