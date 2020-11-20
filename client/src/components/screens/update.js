import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row,Spinner } from "react-bootstrap";
import { validationFunc } from "../../redux/helper/validationForms";

function UpdateCampground(props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const id = props.match.params.id;
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [images , setImages ] = useState([]);
  const [message, setMessage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0);
  useEffect(() => {
    axios.get(`/api/campgrounds/${id}`).then((res) => {
      setTitle(res.data.title);
      setLocation(res.data.location);
      setPrice(res.data.price);
      setDescription(res.data.description);
      setImages(res.data.images);
    });
    validationFunc();
  }, [id]);

 const onChangeHandler = (e)=> {
  setFile(e.target.files[0]);
  setFilename(e.target.files[0].name);
  setUploadedFile('')
 }
 const onSubmit = async e => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('file', file);
  formData.append("upload_preset", "ynpufakf")
  try {
    const res = await axios.post('https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/momuzio/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 1000);
        setTimeout(() => setMessage(''), 1000);

      }
    });
    const url = res.data.secure_url
    const filename = res.data.original_filename
    const newImage = {url , filename }
    // setImages([...images ,newImage])
    images.push(newImage);
    setUploadedFile({ filename, url });
    setMessage('File Uploaded');
    setFile('')
    setFilename('Upload Others')

  

  } catch (err) {
    if (err.response.status === 500) {
      setMessage('There was a problem with the server');
    } else {
      setMessage(err.response.data.msg);
    }
  }

};




 

  const handleSubmit = (e) => {
    e.preventDefault();
    const campground = { title, location, id, description, price, images };
    axios.put(`/api/campgrounds/${id}`, campground).then((res) => {
      props.history.push(`/campgrounds/${id}`);
    });
  };
  return (
    <Container className="create-camp">
      <Row>
        <Form
          className="form needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1>Update Campground</h1>
          <hr />
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              placeholder="Campground Location"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              value={description}
              placeholder="Campground Description"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              placeholder="Campground Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Label>Images</Form.Label>
          <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='Image'
            onChange={onChangeHandler}
          />
          <label className='custom-file-label' htmlFor='Image'>
            {filename}
          </label>
        </div>
          {images && images.length > 0  ? (
                images.map(img => {
                  return  <div className="fom-fotor"><img  src={img.url} alt='' />
           
                  
                  </div>
                })
            ) : null}
           <div>
      
           <Button
            onClick={() => {
              props.history.push(`/campgrounds/${id}`);
            }}
            variant="secondary"
            type="button"
          >
            Back
          </Button>
           <Button variant="primary"  onClick={onSubmit} disabled={uploadedFile}>   
             Upload    
            </Button>
            {uploadPercentage > 0 &&
                  <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
   
             }  
         
          <Button variant="success" type="submit">
            Update Campground
          </Button>

           </div>
        </Form>
      </Row>
    </Container>
  );
}

export default UpdateCampground;
