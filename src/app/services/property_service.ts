import config from "../config";
export const getPropertiesFromAPI = async (page: number, limit: number = 10) => {
    try {
        const res = await fetch(`${config.baseUrl}/api/properties/?page=${page}&limit=${limit}`);
        if (res.status == 200) {
            const { data: properties, totalPages, totalItems } = await res.json()
            return ({ error: false, data: { totalPages, totalItems, properties } })
        } else {
            return ({ error: true, data: { totalPages: 0, totalItems: 0, properties: [], } })
        }
    } catch (error) {
        console.log(error)
        return ({ error: true, data: { totalPages: 0, totalItems: 0, properties: [] } })
    }
}