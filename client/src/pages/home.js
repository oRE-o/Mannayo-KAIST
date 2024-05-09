import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

const HomePage = () => {
    return (
        <>
        <Header />
        <div className='main-title'>
          <div className='space-200px'></div>
          <div className='title'>Enjoying Involved,</div>
          <div className='title'>ManNayo!</div>
          <div className='space-10px'></div>
          <div className='subtitle'>꿈꾸던 만남의 장소는 이미 이 곳에.</div>
          <div className='subtitle'>숨겨진 KAISTian들을 이어주는, 만나요 프로젝트입니다.</div>
        </div>
        <div className='space-300px'></div>
        <Footer />
        </>
    );
}

export default HomePage;