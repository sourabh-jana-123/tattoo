const fs = require('fs');

exports.base64ToImg = () => {
    const filePath1 = './uploads/new.png';
    const data = fs.readFileSync(filePath1);
    const base64Data1 = data.toString('base64');

    const path = require('path');

    const base64Image = `${base64Data1}`;
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const bufferData = Buffer.from(base64Data, 'base64');

    const filePath = path.join(__dirname, './uploads/new.png');
    fs.writeFileSync(filePath, bufferData);

    const img = fs.readFileSync(filePath);
    console.log('Image loaded successfully');
}

