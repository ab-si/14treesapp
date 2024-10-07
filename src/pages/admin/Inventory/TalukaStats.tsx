import { FC, useEffect, useState } from "react"
import ApiClient from "../../../api/apiClient/apiClient"
import { GridFilterItem } from "@mui/x-data-grid"
import { PaginatedResponse } from "../../../types/pagination"
import GeneralStats from "./GeneralStats"

interface TalukaStatsProps {
    talukas: string[]
}

const TalukaStats: FC<TalukaStatsProps> = ({ talukas }) => {

    const [talukaTreeCountData, setTalukaTreeCountData] = useState<PaginatedResponse<any>>({ total: 0, offset: 0, results: [] });

    const [filters, setFilters] = useState<Record<string, GridFilterItem>>({});
    const handleSetFilters = (filters: Record<string, GridFilterItem>) => {
        setFilters(filters);
    }
    const [orderBy, setOrderBy] = useState<{column: string, order: 'ASC' | 'DESC'}[]>([])

    const getTalukas = async () => {
        const apiClient = new ApiClient();
        const filtersData = Object.values(filters);
        filtersData.forEach((item) => {
            if (item.columnField === 'category' && item.value.includes('Unknown')) {
                item.value = (item.value as string[]).filter(item => item !== 'Unknown');
                item.value.push(null);
            }
        })

        if (talukas.length !== 0) {
            filtersData.push({ columnField: 'taluka', operatorValue: 'isAnyOf', value: talukas });
        }
        const stats = await apiClient.getTreesCountForTalukas(0, 10, filtersData, orderBy);
        
        if (stats.offset === 0) {
            setTalukaTreeCountData(stats);
        }
    }

    useEffect(() => {
        getTalukas();
    }, [filters, orderBy, talukas])

    return (
        <GeneralStats 
            field="taluka"
            treesCountData={talukaTreeCountData}
            orderBy={orderBy}
            onOrderByChange={setOrderBy}
            filters={filters}
            onFiltersChange={handleSetFilters}
        />
    )
}

export default TalukaStats;