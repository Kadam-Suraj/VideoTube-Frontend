import { getStats } from "@/api/user.api";
import { useEffect, useState } from "react"

const ProfileStats = () => {
    const [stat, setStat] = useState([]);

    const fetchStats = async () => {
        const response = await getStats();
        if (response.data.success) {
            setStat(response.data.data);
        }
    }
    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="grid gap-5 p-5 my-10 bg-gray-100 rounded-md sm:grid-cols-2 dark:bg-gray-800/30">
            {stat && stat.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-5 bg-white rounded-md dark:bg-black/65">
                    {Object.entries(item).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                            <h3 className="text-lg font-semibold capitalize">{key}</h3>
                            <h3 className="text-lg font-semibold">{value}</h3>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ProfileStats