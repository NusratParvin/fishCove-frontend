import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Button,
  Chip,
  Divider,
  Spinner,
  Skeleton,
} from "@nextui-org/react";
import { Mail, FileText, Users, Edit, Phone, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery } from "@/src/redux/features/user/userApi";
import ErrorNewsfeed from "../../../user/newsfeed/components/errorNewsfeed";

const AdminProfileDashboard = () => {
  const router = useRouter();
  const { data: userInfo, isLoading, error } = useGetUserInfoQuery(undefined);
  const user = userInfo?.data;

  if (isLoading)
    return (
      <div className="me-1">
        <Card className="w-full max-w-3xl mx-auto shadow-md" radius="none">
          {/* Background header with a gradient skeleton */}
          <CardHeader className="h-[120px] overflow-hidden p-0 relative">
            <Skeleton className="w-full h-full" />
          </CardHeader>

          {/* Avatar skeleton */}
          <Skeleton className="absolute top-16 left-4 w-32 h-32 border-4 border-white z-10" />

          {/* Main card body skeleton */}
          <CardBody className="mt-16 ps-8">
            {/* Name and Edit button skeleton */}
            <div className="flex justify-between items-start text-black mb-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-16" />
            </div>

            {/* Bio skeleton */}
            <Skeleton className="h-4 w-full mb-4" />

            {/* Additional profile details skeleton */}
            <div className="flex flex-wrap gap-y-2 text-sm text-gray-600 mb-4">
              <Skeleton className="h-4 w-1/4 mr-4" />
              <Skeleton className="h-4 w-1/4 mr-4" />
              <Skeleton className="h-4 w-1/4" />
            </div>

            {/* Followers and following count skeleton */}
            <div className="flex gap-4 mt-4 text-sm text-black/70">
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-4 w-1/6" />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  if (error) return <ErrorNewsfeed />;

  if (!user) return <p>No user information available.</p>;

  const handleEditProfile = () => {
    router.push("/admin/edit-profile");
  };

  return (
    <div className="flex justify-center items-center mt-6 ">
      <Card className="w-full text-black/80 p-4 text-xs">
        <CardBody>
          <div className="text-left items-start flex flex-row">
            <div className="w-1/2">
              <Avatar
                src={user.profilePhoto || "/default-avatar.jpg"}
                className="w-24 h-24 mx-auto"
                alt={user.name}
              />
            </div>
            <div className="w-1/2">
              <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
              <Chip
                color={user.role === "ADMIN" ? "danger" : "primary"}
                variant="flat"
                className="mt-2"
              >
                {user.role}
              </Chip>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>{user.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{user.address || "N/A"}</span>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* <div className="flex flex-row items-center justify-between"> */}
            <div className="text-right flex flex-row items-center gap-6">
              <p className="text-sm text-black/80">Articles </p>
              <p className="text-blue-500 text-base font-semibold">
                {user.articles.length}
              </p>
            </div>
            <div className="text-right flex flex-row items-center gap-6">
              <p className="text-sm text-black/80">Followers</p>
              <p className="text-blue-500 text-base font-semibold">
                {user.followers.length}
              </p>
            </div>
            {/* </div> */}
            {/* <div className="flex items-center justify-between"> */}

            <div className="text-right flex flex-row items-center gap-6 ">
              <p className="text-sm text-black/80">Following</p>
              <p className="text-blue-500 text-base font-semibold">
                {user.following.length}
              </p>
              {/* </div> */}
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            color="primary"
            variant="flat"
            startContent={<Edit size={16} />}
            className="w-full"
            onPress={handleEditProfile}
          >
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminProfileDashboard;
