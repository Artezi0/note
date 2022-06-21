import React, { useState, useEffect } from 'react'
import data from '../../package.json'
import Spotlight from './Spotlight'
import '../styles/app.scss'

export default function Side({ onAdd, onDelete, setActive, active, notes, handleSide, sidebar }) {
  const [ note, isNote ] = useState(true)
  const [ ongoing, isOngoing ] = useState(true) 
  const [ delayed, isDelayed ] = useState(true) 
  const [ completed, isCompleted ] = useState(true) 
  const [ dropped, isDropped ] = useState(true) 
  const [ status, isStatus ] = useState(true)
  const [ state, setState ] = useState(true)
  const [ spot, isSpot ] = useState(false)
  
  let sorted

  let sortedActive = notes.filter((note) => note.stats.includes('#E8E7E3'))
  let sortedDelayed = notes.filter((note) => note.stats.includes('#FFBD44'))
  let sortedCompleted = notes.filter((note) => note.stats.includes('#89CA00'))
  let sortedDropped = notes.filter((note) => note.stats.includes('#FF605C'))

  if (state) { 
    sorted = notes.sort((a, b) => b.lastModified - a.lastModified)
  }
  if (!state) {
    sorted = notes.sort((a, b) => {
      if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
      if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
      
      return 0
    })
  }

  function deleteAll() {
    if (confirm('Are you sure want delete all of your data?') == true) {
      localStorage.removeItem('notes')
      location.reload()
    }
  }

  /* Keyboard shortcuts handler */
  function handleShortcut(e) {
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 70) { isSpot(!spot) }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleShortcut)
    
    return () => {
      document.removeEventListener('keyup', handleShortcut)
    }
  }, [handleShortcut])

  return (
    <>
      {spot && 
      <Spotlight 
        onAdd={onAdd}
        onDelete={onDelete}
        setActive={setActive} 
        active={active} 
        notes={notes} 
        isSpot={isSpot} 
        spot={spot} />
      }
      <div className='side'>
        <div className='side__header'>
          <div className='side__header-logo'>
            <svg width="14" height="14" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8.74151C0 3.91371 3.9137 0 8.7415 0H41.9585C46.7863 0 50.7 3.9137 50.7 8.7415V41.9585C50.7 46.7863 46.7863 50.7 41.9585 50.7H2.91384C1.30457 50.7 0 49.3954 0 47.7862V8.74151Z" fill="black"/>
              <path d="M10.2378 36.9614V45.231H6.27064V30.9267H10.0516V33.4505H10.2192C10.5358 32.6185 11.0667 31.9604 11.8117 31.4762C12.5567 30.9857 13.46 30.7405 14.5217 30.7405C15.515 30.7405 16.3811 30.9578 17.1199 31.3924C17.8587 31.827 18.433 32.4478 18.8428 33.2549C19.2525 34.0558 19.4574 35.0119 19.4574 36.1232V45.231H15.4902V36.831C15.4964 35.9556 15.2729 35.2727 14.8197 34.7822C14.3665 34.2855 13.7425 34.0372 12.9478 34.0372C12.4139 34.0372 11.9421 34.152 11.5323 34.3817C11.1288 34.6115 10.8121 34.9467 10.5824 35.3875C10.3589 35.8221 10.244 36.3467 10.2378 36.9614ZM20.5607 45.231V26.1586H24.5279V33.3294H24.6489C24.8228 32.9445 25.0742 32.5534 25.4033 32.156C25.7385 31.7525 26.1731 31.4172 26.707 31.1502C27.2472 30.8771 27.9177 30.7405 28.7186 30.7405C29.7616 30.7405 30.7239 31.0137 31.6055 31.56C32.4871 32.1001 33.1918 32.9166 33.7195 34.0092C34.2472 35.0957 34.5111 36.4585 34.5111 38.0975C34.5111 39.6931 34.2534 41.0403 33.7381 42.1392C33.229 43.2319 32.5337 44.0607 31.6521 44.6257C30.7767 45.1845 29.7957 45.4638 28.7093 45.4638C27.9394 45.4638 27.2844 45.3366 26.7443 45.082C26.2104 44.8275 25.7727 44.5077 25.4312 44.1228C25.0897 43.7317 24.829 43.3374 24.6489 42.9401H24.472V45.231H20.5607ZM24.4441 38.0789C24.4441 38.9294 24.562 39.6713 24.7979 40.3046C25.0339 40.9379 25.3753 41.4314 25.8223 41.7853C26.2693 42.133 26.8126 42.3068 27.4521 42.3068C28.0977 42.3068 28.6441 42.1299 29.0911 41.776C29.5381 41.4159 29.8765 40.9192 30.1062 40.286C30.3421 39.6465 30.46 38.9108 30.46 38.0789C30.46 37.2532 30.3452 36.5268 30.1155 35.8997C29.8858 35.2727 29.5474 34.7822 29.1004 34.4283C28.6534 34.0744 28.1039 33.8975 27.4521 33.8975C26.8064 33.8975 26.26 34.0682 25.813 34.4097C25.3722 34.7511 25.0339 35.2354 24.7979 35.8625C24.562 36.4895 24.4441 37.2283 24.4441 38.0789Z" fill="white"/>
            </svg>
            <p>Notebucket <span>{data.version}</span></p>
          </div>
          <button type='button' onClick={handleSide}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 6.85156C13.2266 5.9375 11.5039 5.12012 9.48242 5.12012C6.78418 5.12012 4.60449 6.51758 4.02441 7.84473V21.0371C4.02441 21.8984 4.58691 22.2324 5.21094 22.2324C5.67676 22.2324 5.94043 22.0918 6.23926 21.8721C6.83691 21.3887 7.8125 20.8262 9.48242 20.8262C11.1611 20.8262 12.3037 21.3887 12.8135 21.8193C13.0947 22.0303 13.4199 22.2324 14 22.2324C14.5801 22.2324 14.8965 22.0127 15.1865 21.8193C15.7314 21.415 16.8389 20.8262 18.5176 20.8262C20.1875 20.8262 21.1807 21.3975 21.7607 21.8721C22.0596 22.0918 22.3232 22.2324 22.7891 22.2324C23.4131 22.2324 23.9756 21.8984 23.9756 21.0371V7.84473C23.3955 6.51758 21.2246 5.12012 18.5176 5.12012C16.4961 5.12012 14.7822 5.9375 14 6.85156ZM5.93164 8.45117C6.16895 7.87109 7.46973 6.88672 9.48242 6.88672C11.4951 6.88672 12.8398 7.87988 13.0508 8.45117V20.0439C12.1455 19.3936 10.8535 19.042 9.48242 19.042C8.10254 19.042 6.81934 19.3936 5.93164 20.0703V8.45117ZM22.0684 8.45117V20.0703C21.1807 19.3936 19.8975 19.042 18.5176 19.042C17.1465 19.042 15.8545 19.3936 14.9492 20.0439V8.45117C15.1602 7.87988 16.5049 6.88672 18.5176 6.88672C20.5303 6.88672 21.8311 7.87109 22.0684 8.45117Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <ul className='side__actions'>
          <button type='button' onClick={() => isSpot(!spot)}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.53223 14.0332C8.92969 14.0332 10.2393 13.6113 11.3291 12.8906L15.1787 16.749C15.4336 16.9951 15.7588 17.1182 16.1104 17.1182C16.8398 17.1182 17.376 16.5469 17.376 15.8262C17.376 15.4922 17.2617 15.167 17.0156 14.9209L13.1924 11.0801C13.9834 9.95508 14.4492 8.59277 14.4492 7.11621C14.4492 3.31055 11.3379 0.199219 7.53223 0.199219C3.73535 0.199219 0.615234 3.31055 0.615234 7.11621C0.615234 10.9219 3.72656 14.0332 7.53223 14.0332ZM7.53223 12.1875C4.74609 12.1875 2.46094 9.90234 2.46094 7.11621C2.46094 4.33008 4.74609 2.04492 7.53223 2.04492C10.3184 2.04492 12.6035 4.33008 12.6035 7.11621C12.6035 9.90234 10.3184 12.1875 7.53223 12.1875Z" fill="currentColor"/>
            </svg>
            Find note
          </button>
          <button type='button' onClick={() => setState(!state)}>
            <svg width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.2744C9.46582 16.2744 9.84375 15.9053 9.84375 15.4395V7.73145C10.6787 7.39746 11.2764 6.57129 11.2764 5.62207C11.2764 4.67285 10.6787 3.84668 9.84375 3.5127V1.07812C9.84375 0.638672 9.46582 0.269531 9 0.269531C8.54297 0.269531 8.15625 0.638672 8.15625 1.07812V3.5127C7.32129 3.84668 6.72363 4.66406 6.72363 5.62207C6.72363 6.57129 7.32129 7.39746 8.15625 7.73145V15.4395C8.15625 15.9053 8.53418 16.2744 9 16.2744ZM12.8057 10.8252C12.8057 11.7744 13.3945 12.5918 14.2295 12.9346V15.4658C14.2295 15.9053 14.6074 16.2744 15.0732 16.2744C15.5479 16.2744 15.917 15.9053 15.917 15.4658V12.9346C16.7607 12.6006 17.3496 11.7744 17.3496 10.8252C17.3496 9.86719 16.7607 9.0498 15.917 8.70703V1.10449C15.917 0.638672 15.5391 0.269531 15.0732 0.269531C14.6162 0.269531 14.2295 0.638672 14.2295 1.10449V8.71582C13.3945 9.0498 12.8057 9.86719 12.8057 10.8252ZM2.92676 16.2744C3.39258 16.2744 3.77051 15.9053 3.77051 15.4658V12.9346C4.60547 12.5918 5.19434 11.7744 5.19434 10.8252C5.19434 9.86719 4.60547 9.0498 3.77051 8.71582V1.10449C3.77051 0.638672 3.39258 0.269531 2.92676 0.269531C2.46973 0.269531 2.08301 0.638672 2.08301 1.10449V8.70703C1.24805 9.0498 0.650391 9.86719 0.650391 10.8252C0.650391 11.7744 1.24805 12.6006 2.08301 12.9346V15.4658C2.08301 15.9053 2.46094 16.2744 2.92676 16.2744ZM7.91895 5.62207C7.91895 5.01562 8.39355 4.54102 9 4.54102C9.61523 4.54102 10.0811 5.01562 10.0811 5.62207C10.0811 6.2373 9.61523 6.70312 9 6.70312C8.39355 6.70312 7.91895 6.2373 7.91895 5.62207ZM13.9922 10.8252C13.9922 10.2188 14.4756 9.73535 15.082 9.73535C15.6973 9.73535 16.1631 10.2188 16.1631 10.8252C16.1631 11.4404 15.6973 11.9062 15.082 11.9062C14.4756 11.9062 13.9922 11.4404 13.9922 10.8252ZM1.8457 10.8252C1.8457 10.2188 2.32031 9.73535 2.92676 9.73535C3.54199 9.73535 4.00781 10.2188 4.00781 10.8252C4.00781 11.4404 3.54199 11.9062 2.92676 11.9062C2.32031 11.9062 1.8457 11.4404 1.8457 10.8252Z" fill="currentColor"/>
            </svg>
            Sort note
          </button>
          <button type='button' onClick={deleteAll}>
            <svg width="14" height="17" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.96582 20.7686H13.043C14.3965 20.7686 15.2666 19.9512 15.3369 18.5977L15.9258 5.94141H16.8926C17.3408 5.94141 17.6836 5.58984 17.6836 5.15039C17.6836 4.71094 17.332 4.37695 16.8926 4.37695H12.9902V3.05859C12.9902 1.70508 12.1289 0.914062 10.6611 0.914062H7.32129C5.85352 0.914062 4.99219 1.70508 4.99219 3.05859V4.37695H1.10742C0.667969 4.37695 0.316406 4.71973 0.316406 5.15039C0.316406 5.59863 0.667969 5.94141 1.10742 5.94141H2.07422L2.66309 18.5977C2.7334 19.96 3.59473 20.7686 4.96582 20.7686ZM6.63574 3.1377C6.63574 2.68945 6.95215 2.39941 7.43555 2.39941H10.5469C11.0303 2.39941 11.3467 2.68945 11.3467 3.1377V4.37695H6.63574V3.1377ZM5.1416 19.1953C4.6582 19.1953 4.30664 18.835 4.28027 18.3164L3.69141 5.94141H14.2822L13.7109 18.3164C13.6934 18.8438 13.3506 19.1953 12.8496 19.1953H5.1416ZM6.40723 17.7803C6.78516 17.7803 7.02246 17.543 7.01367 17.1914L6.75 7.99805C6.74121 7.64648 6.49512 7.41797 6.13477 7.41797C5.76562 7.41797 5.52832 7.65527 5.53711 8.00684L5.80078 17.2002C5.80957 17.5518 6.05566 17.7803 6.40723 17.7803ZM9 17.7803C9.36914 17.7803 9.62402 17.5518 9.62402 17.2002V8.00684C9.62402 7.65527 9.36914 7.41797 9 7.41797C8.63086 7.41797 8.38477 7.65527 8.38477 8.00684V17.2002C8.38477 17.5518 8.63086 17.7803 9 17.7803ZM11.5928 17.7891C11.9443 17.7891 12.1904 17.5518 12.1992 17.2002L12.4629 8.00684C12.4717 7.65527 12.2344 7.42676 11.8652 7.42676C11.5049 7.42676 11.2588 7.65527 11.25 8.00684L10.9863 17.2002C10.9775 17.543 11.2148 17.7891 11.5928 17.7891Z" fill="currentColor"/>
            </svg>
            Delete all
          </button>
        </ul>
        <div className='side__status'>
          <div className="side__status-btn">
            <button onClick={() => isStatus(!status)}>
              <svg width="12" height="16" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.31543 19.1816H12.6846C14.5654 19.1816 15.5498 18.1885 15.5498 16.29V3.02734C15.5498 1.12012 14.5742 0.135742 12.6846 0.135742H10.0566C9.73145 0.135742 9.5293 0.337891 9.5293 0.663086C9.5293 1.52441 8.93164 2.18359 8 2.18359C7.07715 2.18359 6.4707 1.52441 6.4707 0.663086C6.4707 0.337891 6.26855 0.135742 5.94336 0.135742H3.31543C1.43457 0.135742 0.450195 1.12012 0.450195 3.02734V16.29C0.450195 18.1885 1.43457 19.1816 3.31543 19.1816ZM3.47363 17.4238C2.62109 17.4238 2.19922 16.9756 2.19922 16.1758V3.1416C2.19922 2.33301 2.62109 1.88477 3.47363 1.88477H5.15234C5.53027 3.09766 6.59375 3.84473 8 3.84473C9.40625 3.84473 10.4697 3.09766 10.8477 1.88477H12.5264C13.3789 1.88477 13.8008 2.33301 13.8008 3.1416V16.1758C13.8008 16.9756 13.3789 17.4238 12.5264 17.4238H3.47363ZM4.80078 6.89453H11.208C11.5244 6.89453 11.7705 6.64844 11.7705 6.32324C11.7705 6.01562 11.5244 5.77832 11.208 5.77832H4.80078C4.4668 5.77832 4.22949 6.01562 4.22949 6.32324C4.22949 6.64844 4.4668 6.89453 4.80078 6.89453ZM4.80078 9.93555H7.90332C8.22852 9.93555 8.46582 9.68945 8.46582 9.38184C8.46582 9.06543 8.22852 8.81934 7.90332 8.81934H4.80078C4.4668 8.81934 4.22949 9.06543 4.22949 9.38184C4.22949 9.68945 4.4668 9.93555 4.80078 9.93555Z" fill="currentColor"/>
              </svg>
              Status
            </button>
          </div>
          {status &&
          <>
            <div className='side__status-list'>
              <button type='button' className='list__btn' onClick={() => isOngoing(!ongoing)}>
                <div className='list__btn-stats active'></div>Active
              </button>
              {ongoing && 
              <ul className="list__notes">
              {sortedActive.map(({ id, title }) => {
              return (
              <div className={`note ${id === active && "active"}`}
                  onClick={() => setActive(id)} 
                  key={id}>
                <p className='note__title'>{title}</p>
              </div>       
              )})}
              </ul>
              }
            </div>
            <div className='side__status-list' onClick={() => isDelayed(!delayed)}>
              <button type='button' className='list__btn'>
                <div className='list__btn-stats delayed'></div>Delayed
              </button>
              {delayed && 
              <ul className="list__notes">
              {sortedDelayed.map(({ id, title }) => {
              return (
              <div className={`note ${id === active && "active"}`}
                  onClick={() => setActive(id)} 
                  key={id}>
                <p className='note__title'>{title}</p>
              </div>       
              )})}
              </ul>
              }
            </div>
            <div className='side__status-list'>
              <button type='button' className='list__btn' onClick={() => isCompleted(!completed)}>
                <div className='list__btn-stats completed'></div>Completed
              </button>
              {completed && 
              <ul className="list__notes">
              {sortedCompleted.map(({ id, title }) => {
              return (
              <div className={`note ${id === active && "active"}`}
                  onClick={() => setActive(id)} 
                  key={id}>
                <p className='note__title'>{title}</p>
              </div>       
              )})}
              </ul>
              }
            </div>
            <div className='side__status-list'>
              <button type='button' className='list__btn' onClick={() => isDropped(!dropped)}>
                <div className='list__btn-stats dropped'></div>Dropped
              </button>
              {dropped && 
              <ul className="list__notes">
              {sortedDropped.map(({ id, title }) => {
              return (
              <div className={`note ${id === active && "active"}`}
                  onClick={() => setActive(id)} 
                  key={id}>
                <p className='note__title'>{title}</p>
              </div>       
              )})}
              </ul>              
              }
            </div>
          </>
          }
        </div>
        <div className='side__notes'>
          <div className="side__notes-btn">
            <button onClick={() => isNote(!note)}>
              <svg width="12" height="16" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.31543 19.1816H12.6846C14.5742 19.1816 15.5498 18.1885 15.5498 16.29V8.30957C15.5498 7.0791 15.3916 6.5166 14.627 5.73438L10.0303 1.06738C9.2832 0.311523 8.66797 0.135742 7.56055 0.135742H3.31543C1.43457 0.135742 0.450195 1.12891 0.450195 3.03613V16.29C0.450195 18.1885 1.43457 19.1816 3.31543 19.1816ZM3.46484 17.4238C2.62109 17.4238 2.19922 16.9844 2.19922 16.1758V3.1416C2.19922 2.3418 2.62109 1.89355 3.47363 1.89355H7.2002V6.6748C7.2002 7.94922 7.82422 8.56445 9.08984 8.56445H13.8008V16.1758C13.8008 16.9844 13.3789 17.4238 12.5264 17.4238H3.46484ZM9.25684 7.02637C8.8877 7.02637 8.72949 6.86816 8.72949 6.50781V2.12207L13.5635 7.02637H9.25684Z" fill="currentColor"/>
              </svg>
              Notes
            </button>
            <button type='button' onClick={onAdd}>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.63672 8.65625H6.99805V14.0176C6.99805 14.5625 7.44629 15.0195 8 15.0195C8.55371 15.0195 9.00195 14.5625 9.00195 14.0176V8.65625H14.3633C14.9082 8.65625 15.3652 8.20801 15.3652 7.6543C15.3652 7.10059 14.9082 6.65234 14.3633 6.65234H9.00195V1.29102C9.00195 0.746094 8.55371 0.289062 8 0.289062C7.44629 0.289062 6.99805 0.746094 6.99805 1.29102V6.65234H1.63672C1.0918 6.65234 0.634766 7.10059 0.634766 7.6543C0.634766 8.20801 1.0918 8.65625 1.63672 8.65625Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          {note &&
          <ul className='side__notes-list'>
          {sorted.map(({ id, title }) => {
            return (
              <div className={`note ${id === active && "active"}`}
                  onClick={() => setActive(id)} 
                  key={id}>
                <p className='note__title'>{title}</p>
              </div>       
            )})
          }
          </ul> 
          }
        </div>
      </div>
    </>
  )
}