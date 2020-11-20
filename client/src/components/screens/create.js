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
  }
  const onSubmit = async e => {
    console.log(file , filename)
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
      setImages([...images ,newImage])
      setUploadedFile({ filename, url });
      setMessage('File Uploaded');
      console.log(uploadedFile)

    

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
            {message? <Message msg={message} /> : null}
            <Form.Control
              type="file"
              placeholder="Campground Image"
              onChange={onChangeHandler}
              name="file"
      
              multiple
            />
             {/* <Button variant="primary"  onClick={onSubmit}>Upload</Button> */}
             <Button variant="primary"  onClick={onSubmit} >
               {uploadPercentage > 0 && 
                  <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
               /> }
               { uploadPercentage > 0  ?" Loading... " :  "Upload"}
            </Button>
              {/* {uploadedFile ? (
              <div className='row mt-5'>
                <div className='col-md-6 m-auto'>
                  <h3 className='text-center'>{uploadedFile.fileName}</h3>
                  <img style={{ width: "60px" }} src={uploadedFile.url} alt='' />
                </div>
              </div>
            ) : null} */}
     
                 
            {/* {uploadPercentage > 0 && <Progress percentage={uploadPercentage} />} */}
            
          </Form.Group>
          <Button variant="success" type="submit" disabled={images.length === 0}>
            Add Campground
          </Button>
        </Form>
       
      </Row>
    </Container>
  )
}
 
export default CreateCampground;
