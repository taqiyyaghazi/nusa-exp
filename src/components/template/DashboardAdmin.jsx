import { useGetWorklistsPlacesQuery } from '@/services/api/worklistsApi';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Typography,
} from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';
import DataTable from 'react-data-table-component';

const dashboardCard = [
    {
        title: 'Pengguna Aktif',
        value: 6000,
    },
    {
        title: 'Total Wisata',
        value: 60,
    },
    {
        title: 'Total Worklist',
        value: 60,
    },
];

const DashboardAdmin = () => {
    const { data, error, isLoading } = useGetWorklistsPlacesQuery();
    const columns = [
        {
            name: 'Nama',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Alamat',
            selector: (row) =>
                `${row.village}, ${row.subdistrict}, ${row.regency}, ${row.province}`,
            sortable: true,
        },
        {
            name: 'Terakhir Diubah',
            selector: (row) =>
                row.last_updated,
            sortable: true,
        },
        {
            name: 'Aksi',
            selector: (row) =>
            <Link href={`/dashboard/places/${row.id}`}>
                <Button size='sm'>Detail</Button>
            </Link>,
            sortable: true,
        },
    ];
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4">
                {dashboardCard &&
                    dashboardCard.map((item, key) => (
                        <Card key={key} className="flex-1">
                            <CardBody>
                                <Typography
                                    color="blue-gray"
                                    className="mb-2 font-bold text-center"
                                >
                                    {item.title}
                                </Typography>
                                <Typography className="text-4xl font-bold text-center">
                                    {item.value}
                                </Typography>
                            </CardBody>
                        </Card>
                    ))}
            </div>
            <Card className="mt-4">
                <CardBody>
                    <DataTable
                        title="Worklist"
                        columns={columns}
                        data={data?.data}
                        striped
                        highlightOnHover
                        persistTableHead
                        pagination
                        progressPending={isLoading}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default DashboardAdmin;
