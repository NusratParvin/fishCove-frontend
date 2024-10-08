import { JwtPayload } from "jwt-decode";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  bio?: string;

  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IUserJwtPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export type TUserRole = "USER" | "ADMIN";
export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  phone: string;
  address: string;
  role: TUserRole;
  profilePhoto?: string;
  terms?: boolean;
  followers: string[];
  following: string[];
  articles: string[];
  purchasedArticles: string[];
  createdAt: string;
}

export type TPopulatedAuthor = {
  _id: string;
  name: string;
  profilePhoto?: string;
  followers: string[];
};

export type TArticle = {
  _id: string;
  authorId: TPopulatedAuthor;
  title: string;
  content: string;
  category: "Tip" | "Story";
  images?: string;
  upvotes: number;
  downvotes: number;
  voteInfo: TVoteInfo[];
  comments: string[];
  isPremium: boolean;
  isPublish?: boolean;

  price: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export interface TVoteInfo {
  userId: string;
  voteType: "upvote" | "downvote";
  _id: string;
}

export interface TComment {
  _id: string;
  articleId: string;
  commenter: {
    commenterId: string;
    name: string;
    profilePhoto: string;
  };
  content: string;
  upvotes: number;
  downvotes: number;
  voteInfo: TVoteInfo[];
  createdAt: string;
  updatedAt: string;
}

export type TTransaction = {
  _id?: string;
  transactionId: string;
  userId: string;
  articleId: string;
  amount: number;
  email: string;
  status: "completed" | "pending" | "failed";
  authorId: string;
  createdAt: string;
  updatedAt?: string;
};
