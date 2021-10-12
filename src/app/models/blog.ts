export class blog {
    "id": number;
    "name": string;
    "banner_img": string;
    "cover_img": string;
    "cooking_time": string;
    "summary": string;
    "description": string;
    "url_video_utube": string;
    "view": number;
    "status": number;
    "user_id": string;
    "category_id": number;
    "create_at": string;
    "update_at": string;

    "metarial": {
        "id": number;
        "title": string;
        "mass": number;
        "unit": string;
        "order": number;
        "blog_id": number;
    }

    "content": {
        "id": number;
        "name": string;
        "content": string;
        "banner_img": string;
        "banner_cover": string;
        "blog_id": number;
    }

    "step": {
        "id": number;
        "name": string;
        "banner_img": string;
        "description": string;
        "order": number;
        "blog_id": number;
    }
}