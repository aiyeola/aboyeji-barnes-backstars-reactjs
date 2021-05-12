import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

import ResetPasswordPage from '@components/ResetPassword/ResetPasswordPage';

export default ResetPasswordPage;

// export const getStaticProps = async ({
//   params: { userId, userToken },
// }: GetStaticPropsContext<{ userId: string; userToken: string }>): Promise<
//   GetStaticPropsResult<{
//     postsData: PostData[];
//     topic: string;
//     topics: string[];
//   }>
// > => {
//   const postsData = getSortedPostsData();
//   const topics = getSortedTopics();

//   return {
//     props: {
//       postsData: postsData.filter((pd) =>
//         pd.topics.map((t) => adaptTopicName(t)).includes(adaptTopicName(topic)),
//       ),
//       topic: topic,
//       topics,
//     },
//   };
// };
