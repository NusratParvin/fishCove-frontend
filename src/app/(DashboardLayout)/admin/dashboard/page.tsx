"use client";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import {
  Users,
  FileText,
  DollarSign,
  Eye,
  Edit,
  Trash,
  Coins,
} from "lucide-react";
import AdminProfileDashboard from "./component/profileInfo";
import { useGetAllUsersQuery } from "@/src/redux/features/user/userApi";
import { useGetAllArticlesQuery } from "@/src/redux/features/articles/articlesApi";
import { useGetAllPaymentsQuery } from "@/src/redux/features/payment/paymentApi";
import { TTransaction } from "@/src/types";

export default function AdminDashboard() {
  const { data: allUser } = useGetAllUsersQuery(undefined);
  const { data: allArticle } = useGetAllArticlesQuery(undefined);
  const { data: allTransaction } = useGetAllPaymentsQuery(undefined);

  console.log(allTransaction?.data);

  const totalAmount = allTransaction?.data?.reduce(
    (acc: number, transaction: TTransaction) => {
      return acc + transaction.amount;
    },
    0
  );

  // Calculate 30% of total amount
  const revenue = totalAmount * 0.3;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <h1 className="text-lg font-semibold mb-3">Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 h-18">
            <Card radius="none">
              <CardBody>
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-base font-semibold text-black/80">
                      {allUser?.data?.length}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card radius="none">
              <CardBody>
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-green-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Total Articles</p>
                    <p className="text-base font-semibold text-black/80">
                      {" "}
                      {allArticle?.data?.length}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card radius="none">
              <CardBody>
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-purple-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Total Transaction</p>
                    <p className="text-base font-semibold text-black/80">
                      {allTransaction?.data?.length}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card radius="none">
              <CardBody>
                <div className="flex items-center">
                  <Coins className="w-8 h-8 text-purple-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-base font-semibold text-black/80">
                      ` $ {revenue}
                      <span className="text-xs">(30% of total)</span> `
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <AdminProfileDashboard />
        </main>
      </div>
    </div>
  );
}
