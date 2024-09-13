const fs = require('fs').promises;
const path = require('path');

type ReflectDocument = {
    id: string;
    subject: string;
    document_json: string;
    created_at: string;
    updated_at: string;
    edited_at: string;
    daily_at: unknown;
    backlinked_count: number;
}

const main = async () => {
    try {
        const filePath = '/Users/personal/Documents/decision-making-projects/writing-randomizer/writing-cache/last-week-i-learned/deep-dives/home-robotics.json';
        const fileContent = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        const jsonContent = jsonData['document_json'];
        const parsedContent = JSON.parse(jsonContent);

        const content = parsedContent['content'];
        console.log('Content:', content);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

main();