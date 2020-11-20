import { useState, useEffect } from "react";
import { Form, Button, Container, Row ,Spinner } from "react-bootstrap";
import axios from "axios";
import { validationFunc } from "../../redux/helper/validationForms";
import {postNewCampground} from '../../redux/action/campgroundAction'
import {useDispatch , useSelector} from "react-redux"
import Message from './Message'
import Progress from './Progress'

function CreateCampground(props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const { isAuhenticated, user} = currentUser;
  const [images , setImages ] = useState([]);


  useEffect(() => { 
    validationFunc();
    if (!isAuhenticated ){
      props.history.push(`/signin`);
      
    }
  }, [isAuhenticated , user,dispatch ]);

  const onChangeHandler = (e) => {
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
          setTimeout(() => setUploadPercentage(0), 500);

        }
      });
      const url = res.data.secure_url
      const filename = res.data.original_filename
      const newImage = {url , filename }
      setImages([...images ,newImage])
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
    const author = user._id
    const campground = { title, location, description,images, price, author };
    if(images.length === 0 ){
      console.log(images)
      console.log(campground)
    }
    else{
      dispatch(postNewCampground(campground ));

    }
    props.history.push(`/`);
  }
   

  


  return (
    <Container className="create-camp">
      <Row>
        <Form
          className="form needs-validation"
          onSubmit={handleSubmit}
          noValidate
          encType="multipart/form-data"
          id="form"
        >
          {message ? <Message msg={message} /> : null}
          <h1>Create Campground</h1>
          <hr />
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
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
              placeholder="Campground Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="Image">
            <Form.Label>Images</Form.Label>
            {/* {message? <Message msg={message} /> : null} */}
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
            
          </Form.Group>
  


          {images && images.length > 0  ? (
                images.map(img => {
                  return  <div className="fom-fotor"><img  src={img.url} alt='' /></div>
                })
            ) : null}
            <div>
          
            {uploadPercentage > 0 ?
                 <Button variant="primary" disabled>
                 <Spinner
                   as="span"
                   animation="grow"
                   size="sm"
                   role="status"
                   aria-hidden="true"
                 />
                 Loading...
               </Button> : 
                 
              <Button  variant="primary"  onClick={onSubmit} disabled={uploadedFile}>   
              Upload 
             </Button>
   
             } 
            <Button  variant="success" type="submit" disabled={images.length === 0} block >
            Add Campground
          </Button>
            </div>
            
        </Form>
      
      </Row>
    </Container>
  )
}
 
export default CreateCampground;
