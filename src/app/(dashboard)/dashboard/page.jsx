'use client';
import DashboardAdmin from '@/components/template/DashboardAdmin';
import { ROLE_ADMIN, ROLE_MANAGER } from '@/constant';
import { useAppSelector } from '@/hooks/useRedux';
import { useGetWorklistsPlacesQuery } from '@/services/api/worklistsApi';
import React from 'react';

const Dashboard = () => {
    const authUser = useAppSelector((state) => state.authUser);
    
    switch (authUser?.role_id) {
        case ROLE_ADMIN:
            return <DashboardAdmin />;
        case ROLE_MANAGER:
            return <div>Pengelola Wisata</div>;
        default:
            return <div>Halaman tidak ditemukan</div>;
    }
};

export default Dashboard;
