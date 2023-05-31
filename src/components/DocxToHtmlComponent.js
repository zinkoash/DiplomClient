// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import mammoth from 'mammoth';

// const DocxToHtmlComponent = ({ docxUrl }) => {
//     const [htmlContent, setHtmlContent] = useState('');
  
//     useEffect(() => {
//         axios.get(docxUrl, { responseType: 'arraybuffer' })
//         .then(response => {
//           const arrayBuffer = response.data;
  
//           mammoth.extractRawText({ arrayBuffer: arrayBuffer })
//             .then(result => {
//               const html = result.value;
//               setHtmlContent(html);
//             })
//             .done();
//         })
//         .catch(error => {
//           console.error('Error fetching DOCX file:', error);
//         });
//     }, [docxUrl]);
  
//     return (
//       <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
//     );
//   };
//   export default DocxToHtmlComponent;