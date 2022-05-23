export interface ResourceDataInterface {
  name: string;
  author_name: string;
  url: string;
  description: string;
  tags: string;
  content_type: string;
  stage: string;
  original_recommendation: string;
  recommendation_reasoning: string;
  userid: number;
  resourceid: number;
  creation_date: string;
}

export interface RecentResourcesInterface {
  allResources: ResourceDataInterface[];
}

export interface AllUsersInterface {
  is_faculty: boolean;
  name: string;
  userid: number;
}

export interface SingleStudyResourceProps {
  resourceName: string;
  authorName: string;
  URL: string;
  description: string;
  tags: string;
  resourceType: string;
  buildPhaseWeek: string;
  recommendation: string;
  reasonForRecommendation: string;
  creationDate: string;
  userId: number;
  resourceId: number;
  loggedInUserId: number;
}

export interface likeDataInterface {
  likeValue: boolean;
  resourceID: number;
  userID: number;
}

export interface commentDataInterface {
  commentText: string;
  resourceID: number;
  userID: number;
}

export interface commentDataInputInterface {
  commentid: number;
  userid: number;
  resourceid: number;
  comment_text: string;
}
