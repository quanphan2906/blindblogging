import React from "react";

function ImageUpload({
    previewImgUrl,
    handleFileSelected,
    handleChange,
    altText,
}) {
    return (
        <div className="upload-wrapper">
            <h1>Upload cover image</h1>
            <div className="upload-container">
                <img
                    src={previewImgUrl}
                    alt="preview your image here"
                    className="image-preview"
                />
                <div className="upload-input">
                    <input type="file" onChange={handleFileSelected} />

                    <textarea
                        id="altText"
                        type="text"
                        placeholder="Add alt text for the picture here"
                        value={altText}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default ImageUpload;
