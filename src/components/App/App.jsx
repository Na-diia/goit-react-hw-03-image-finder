import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { SearchBar } from "../SearchBar/SearchBar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { fetchImage } from "services/fetch-image";
import { Modal } from 'components/Modal/Modal';
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";

import styles from './App.module.css';

export class App extends Component  {
 state = {
  search: "",
  images: [],
  loading: false,
  error: null,
  page: 1,
  showModal: false,
  status: 'idle',
  largeImageURL: null,
  totalHits: 0,
 };
 
 componentDidUpdate(prevProps, prevState) {
  const {search, page} = this.state;
   if(prevState.search !== search || prevState.page !== page) {
    this.setState({ status: 'pending' });
    this.lookForImages();
  };
 };

 async lookForImages ()  {
   try {
    this.setState({loading: true});
    const {search, page} = this.state;
    const searchValue = search.trim().toLowerCase();
    const data = await fetchImage(searchValue, page);
    if (data.hits.length === 0) {
      toast.warn(`Sorry! We didn't find anything, change your request!`);
      return;
    }
    this.setState({
      images: data.hits, status: 'resolved', totalHits: data.totalHits,
    });
      return;
   } catch (error) {
    this.setState({ status: 'rejected', error: error.message, images:null,});
    toast.error('Opps! Something went wrong!');
   } finally {
    this.setState({loading: false})
   };
 };

 searchImages = (search) => {
  if(search === this.state.search) {
    toast.warn('This is the same query!');
    return;
  } this.setState({search, images: [], page: 1});
 };

 loadMore = () => {
  this.setState(({page}) => ({page: page +1 }) );
 };

 showImage = largeImageURL => {
  this.setState({
      largeImageURL,
      showModal: true,
  });
 };

 closeModal = ()=> {
  this.setState({
    showModal: false,
    largeImageURL: null,
  })
 };

  render() { 
  const {images, loading, showModal, largeImageURL, totalHits, status} = this.state;
  const {searchImages, closeModal, showImage, loadMore} = this;

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={searchImages}/>
      <ImageGallery images={images} showImage={showImage}/>
      {loading && <Loader />}
      {showModal  && <Modal close={closeModal} image={largeImageURL}/>}
      {totalHits > 12 &&  status !== 'pending' && images.length !== 0 && (<Button onClick={loadMore}/>)}
       <ToastContainer autoClose={2000}/>
    </div>);
  };
};