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
    allResources: ResourceDataInterface[]
    }