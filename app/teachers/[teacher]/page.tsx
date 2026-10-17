import PublicSite from '../../../client/PublicSite';
export const metadata={title:'ගුරු පැතිකඩ | Wales'};
export default async function TeacherPage({params}:{params:Promise<{teacher:string}>}){const {teacher}=await params;return <PublicSite teacherId={teacher}/>}
