const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');


// Inicializar S3
const s3 = new AWS.S3({ region: 'us-east-1' }); // Ajustar la región si es necesario

// Configurar Multer para manejo de archivos
const storage = multer.memoryStorage(); // Almacena los archivos en memoria temporalmente
const upload = multer({ storage: storage });

// Ruta para generar una URL firmada para un archivo en S3
router.get('/product_url/:filename', async (req, res) => {
    const filename = req.params.filename;
    const bucketName = '21030021tedw'; 

    // Parámetros para generar la URL firmada
    const params = {
        Bucket: bucketName,
        Key: filename,
        Expires: 60 // Tiempo de expiración de la URL (en segundos)
    };

    try {
        // Generar URL firmada
        const signedUrl = s3.getSignedUrl('getObject', params);
        res.status(200).json({ url: signedUrl });
    } catch (error) {
        console.error('Error al generar la URL firmada:', error);
        res.status(500).json({ message: 'Error al generar la URL firmada', error: error.message });
    }
});


// Ruta para subir una imagen y retornar su URL pública
router.post('/upload_image', upload.single('image'), async (req, res) => {
    const bucketName = '21030021tedw'; 
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
    }

    // Nombre del archivo en S3
    const key = `images/${Date.now()}_${file.originalname}`;

    // Parámetros para subir el archivo
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: file.buffer, // El contenido del archivo en memoria
        ContentType: file.mimetype, // Tipo de contenido (ejemplo: image/jpeg)
    };

    try {
        // Subir archivo al bucket
        await s3.upload(params).promise();

        // URL pública del archivo
        const publicUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;

        res.status(200).json({ url: publicUrl });
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ message: 'Error al subir la imagen', error: error.message });
    }
});

module.exports = router;
