const REFLECT_ACCESS_TOKEN = process.env.REFLECT_ACCESS_TOKEN;

export const appendToReflect = async (text: string) => {
    try { 
        const response = await fetch(
            "https://reflect.app/api/graphs/{graphId}/daily-notes",
            {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${REFLECT_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text,
                transform_type: "list-append",
            }),
            }
        );

        console.log(response.status)
    } catch (e) {
        console.log('error when adding to reflect: ', e);
        throw e;
    }
}
