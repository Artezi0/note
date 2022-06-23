import ReactTooltip from 'react-tooltip'
import FileSaver from 'file-saver'
import uuid from 'react-uuid'
import React, { useState } from 'react'
import '../styles/app.scss'

export default function Top({ notes, setNotes, setActive, handleSide, sidebar, active, isSplit, split, isRead, read,  }) {
  const [ submenu, isSubmenu ] = useState(false)
  let filenameStyle = undefined
  let filename = undefined 
  let menuStyle = undefined

  function handleStyle() {
    if (active) {
      filename = active.title
      filenameStyle = { color: '#000000' }
      document.title = active.title + " - Notebucket"
    } 
    if (!active) {
      filename = "No selected"
      menuStyle = { 
        pointerEvents: 'none' 
      }
      filenameStyle = { 
        color: "#19171199",
        pointerEvents: "none"
      }
    }

    return filename && filenameStyle
  }
  handleStyle()

  const Submenu = () => {
    function handleImport() {
      let blob = document.getElementById('importFile').files[0];
      let reader = new FileReader()
      let textFile = /text.plain.*/

      console.log(blob)
      
      if (blob.type.match(textFile)) {
        reader.onload = function(e) {
          let newNote = {
            id: uuid(),
            cover: {
              isCover: false,
              value: '#E8E7E3',
            },
            stats: '',
            title: blob.name.replace(/\.[^.$]+$/, ''),
            body: e.target.result,
            lastModified: Date.now()
          }
        
          setNotes([newNote, ...notes])
          setActive(newNote.id)
        }
      }

      reader.readAsText(blob)
      isSubmenu(false)
    }
    
  
    function handleExport() {
      let blob = new Blob([active.body], {type: "text/plain;charset=utf-8"})
      
      FileSaver.saveAs(blob, `${active.title}.txt`)
      isSubmenu(false)
    }
  
    return (
      <div className='submenu'>
        <p className='submenu__title'>Options</p>
        <ul className="submenu__actions">
          <div className='submenu__actions-import'>
            <label htmlFor="importFile">
              <svg width="16" height="14" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 11.1113C11.2109 11.1113 11.4043 11.041 11.6064 10.8389L14.4629 8.08789C14.6035 7.94727 14.6826 7.78906 14.6826 7.57812C14.6826 7.18262 14.3662 6.89258 13.9795 6.89258C13.7773 6.89258 13.584 6.97168 13.4434 7.12988L12.2656 8.37793L11.7383 9.01074L11.8262 7.69238V1.10059C11.8262 0.669922 11.457 0.291992 11 0.291992C10.5518 0.291992 10.1826 0.669922 10.1826 1.10059V7.69238L10.2705 9.01953L9.73438 8.37793L8.56543 7.12988C8.4248 6.97168 8.22266 6.89258 8.02051 6.89258C7.63379 6.89258 7.31738 7.18262 7.31738 7.57812C7.31738 7.78906 7.39648 7.94727 7.5459 8.08789L10.4023 10.8389C10.6045 11.041 10.7979 11.1113 11 11.1113ZM3.47656 19.9883H18.5146C20.4219 19.9883 21.415 19.0039 21.415 17.123V11.9639C21.415 11.0322 21.3008 10.5312 20.8789 9.98633L17.9785 6.25977C16.9238 4.89746 16.2559 4.20312 14.6475 4.20312H13.4521V5.64453H14.7266C15.3418 5.64453 15.9482 6.1543 16.3525 6.67285L19.3584 10.6279C19.6572 11.0234 19.543 11.1904 19.0947 11.1904H13.584C13.127 11.1904 12.916 11.5156 12.916 11.8584V11.8936C12.916 12.8428 12.1777 13.8535 11 13.8535C9.81348 13.8535 9.0752 12.8428 9.0752 11.8936V11.8584C9.0752 11.5156 8.87305 11.1904 8.40723 11.1904H2.90527C2.44824 11.1904 2.35156 10.9971 2.6416 10.6279L5.64746 6.67285C6.05176 6.1543 6.6582 5.64453 7.27344 5.64453H8.54785V4.20312H7.35254C5.74414 4.20312 5.07617 4.88867 4.02148 6.25977L1.1123 9.98633C0.699219 10.54 0.584961 11.0322 0.584961 11.9639V17.123C0.584961 19.0039 1.57812 19.9883 3.47656 19.9883ZM3.56445 18.2305C2.75586 18.2305 2.31641 17.8086 2.31641 16.9648V12.7373H7.58105C7.8623 14.3018 9.22461 15.4619 11 15.4619C12.7754 15.4619 14.1377 14.3018 14.4189 12.7373H19.6836V16.9648C19.6836 17.8086 19.2354 18.2305 18.4268 18.2305H3.56445Z" fill="currentColor"/>
              </svg>
              Import
            </label>
            <input 
              type="file" 
              id='importFile'
              accept='.txt, .pdf, .docx'
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </div>
          <div className="submenu__actions-export">
            <label onClick={handleExport}>
              <svg width="16" height="15" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 12.9902C11.457 12.9902 11.8262 12.6211 11.8262 12.1816V3.73535L11.7559 2.43457L12.3008 3.07617L13.5312 4.38574C13.6719 4.54395 13.874 4.62305 14.0762 4.62305C14.4805 4.62305 14.8145 4.33301 14.8145 3.91992C14.8145 3.7002 14.7266 3.54199 14.5771 3.39258L11.6328 0.553711C11.4131 0.342773 11.2197 0.272461 11 0.272461C10.7891 0.272461 10.5869 0.342773 10.376 0.553711L7.42285 3.39258C7.27344 3.54199 7.19434 3.7002 7.19434 3.91992C7.19434 4.33301 7.51953 4.62305 7.92383 4.62305C8.12598 4.62305 8.33691 4.54395 8.47754 4.38574L9.69922 3.07617L10.2441 2.42578L10.1826 3.73535V12.1816C10.1826 12.6211 10.5518 12.9902 11 12.9902ZM3.47656 20.9883H18.5146C20.4219 20.9883 21.415 20.0039 21.415 18.123V12.9639C21.415 12.0322 21.3271 11.5225 20.8789 10.9863L18.3213 7.83984C17.1523 6.40723 16.7129 6.06445 15.1045 6.06445H13.4521V7.52344H15.1484C15.7549 7.52344 16.1416 7.64648 16.6426 8.26172L19.3584 11.6279C19.666 12.0234 19.543 12.1904 19.0947 12.1904H13.584C13.127 12.1904 12.916 12.5156 12.916 12.8584V12.8936C12.916 13.8428 12.1777 14.8535 11 14.8535C9.81348 14.8535 9.0752 13.8428 9.0752 12.8936V12.8584C9.0752 12.5156 8.87305 12.1904 8.40723 12.1904H2.90527C2.44824 12.1904 2.35156 11.9971 2.6416 11.6279L5.33984 8.28809C5.8584 7.65527 6.23633 7.52344 6.85156 7.52344H8.54785V6.06445H6.89551C5.28711 6.06445 4.85645 6.39844 3.66113 7.85742L1.1123 10.9863C0.681641 11.5137 0.584961 12.0322 0.584961 12.9639V18.123C0.584961 20.0039 1.57812 20.9883 3.47656 20.9883ZM3.56445 19.2305C2.75586 19.2305 2.31641 18.8086 2.31641 17.9648V13.7373H7.58105C7.8623 15.3018 9.22461 16.4619 11 16.4619C12.7754 16.4619 14.1377 15.3018 14.4189 13.7373H19.6836V17.9648C19.6836 18.8086 19.2354 19.2305 18.4268 19.2305H3.56445Z" fill="currentColor"/>
              </svg>
              Export
              <pre>text (pdf on work)</pre>
            </label>
          </div>
        </ul>
        <ul className='submenu__info'>
          <li><a href='https://github.com/Artezi0/note' target='_blank'>
            <svg width="14" height="14" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99121 18.7422C14.9746 18.7422 19.0879 14.6289 19.0879 9.6543C19.0879 4.67969 14.9658 0.566406 9.98242 0.566406C5.00781 0.566406 0.90332 4.67969 0.90332 9.6543C0.90332 14.6289 5.0166 18.7422 9.99121 18.7422ZM9.99121 16.9316C5.95703 16.9316 2.73145 13.6885 2.73145 9.6543C2.73145 5.62012 5.95703 2.38574 9.98242 2.38574C14.0166 2.38574 17.2598 5.62012 17.2686 9.6543C17.2773 13.6885 14.0254 16.9316 9.99121 16.9316ZM9.98242 11.1133C10.4658 11.1133 10.7471 10.8408 10.7559 10.3311L10.8877 6.10352C10.9053 5.58496 10.5186 5.20703 9.97363 5.20703C9.42871 5.20703 9.05078 5.57617 9.06836 6.09473L9.19141 10.3311C9.20898 10.832 9.49023 11.1133 9.98242 11.1133ZM9.98242 14.0312C10.5537 14.0312 11.0195 13.6182 11.0195 13.0557C11.0195 12.502 10.5625 12.0889 9.98242 12.0889C9.41113 12.0889 8.94531 12.502 8.94531 13.0557C8.94531 13.6094 9.41992 14.0312 9.98242 14.0312Z" fill="currentColor"/>
            </svg>
            Updates
          </a></li>
          <li><a href="#">
            <svg width="14" height="14" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.08789 18.1758C14.0713 18.1758 18.1846 14.0625 18.1846 9.08789C18.1846 4.11328 14.0625 0 9.0791 0C4.10449 0 0 4.11328 0 9.08789C0 14.0625 4.11328 18.1758 9.08789 18.1758ZM9.08789 16.3652C5.05371 16.3652 1.82812 13.1221 1.82812 9.08789C1.82812 5.05371 5.05371 1.81934 9.0791 1.81934C13.1133 1.81934 16.3564 5.05371 16.3652 9.08789C16.374 13.1221 13.1221 16.3652 9.08789 16.3652ZM8.89453 10.8369C9.37793 10.8369 9.68555 10.5557 9.71191 10.1953C9.71191 10.1689 9.71191 10.125 9.7207 10.0898C9.74707 9.6416 10.0547 9.34277 10.626 8.96484C11.4961 8.40234 12.0498 7.89258 12.0498 6.88184C12.0498 5.42285 10.7314 4.5791 9.16699 4.5791C7.66406 4.5791 6.63574 5.26465 6.36328 6.09082C6.31055 6.24023 6.27539 6.38965 6.27539 6.54785C6.27539 6.97852 6.60938 7.24219 7.01367 7.24219C7.53223 7.24219 7.64648 6.97852 7.91895 6.67969C8.2002 6.24023 8.56934 5.98535 9.08789 5.98535C9.78223 5.98535 10.2393 6.38086 10.2393 6.96973C10.2393 7.50586 9.87012 7.7959 9.12305 8.30566C8.49902 8.74512 8.04199 9.19336 8.04199 9.98438V10.0811C8.04199 10.582 8.34961 10.8369 8.89453 10.8369ZM8.87695 13.5352C9.43945 13.5352 9.90527 13.1309 9.90527 12.5684C9.90527 12.0146 9.44824 11.6016 8.87695 11.6016C8.30566 11.6016 7.83984 12.0146 7.83984 12.5684C7.83984 13.1221 8.30566 13.5352 8.87695 13.5352Z" fill="currentColor"/>
            </svg>
            Help
          </a></li>
        </ul>
      </div>
    )
  }

  return (
    <>
      {submenu && <Submenu />}
      <nav className='top'>
        <div className="top__info">
          {!sidebar &&
          <>
            <button type='button' className='top__info-btn' onClick={handleSide} data-tip data-for="sideTip">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 6.85156C13.2266 5.9375 11.5039 5.12012 9.48242 5.12012C6.78418 5.12012 4.60449 6.51758 4.02441 7.84473V21.0371C4.02441 21.8984 4.58691 22.2324 5.21094 22.2324C5.67676 22.2324 5.94043 22.0918 6.23926 21.8721C6.83691 21.3887 7.8125 20.8262 9.48242 20.8262C11.1611 20.8262 12.3037 21.3887 12.8135 21.8193C13.0947 22.0303 13.4199 22.2324 14 22.2324C14.5801 22.2324 14.8965 22.0127 15.1865 21.8193C15.7314 21.415 16.8389 20.8262 18.5176 20.8262C20.1875 20.8262 21.1807 21.3975 21.7607 21.8721C22.0596 22.0918 22.3232 22.2324 22.7891 22.2324C23.4131 22.2324 23.9756 21.8984 23.9756 21.0371V7.84473C23.3955 6.51758 21.2246 5.12012 18.5176 5.12012C16.4961 5.12012 14.7822 5.9375 14 6.85156ZM5.93164 8.45117C6.16895 7.87109 7.46973 6.88672 9.48242 6.88672C11.4951 6.88672 12.8398 7.87988 13.0508 8.45117V20.0439C12.1455 19.3936 10.8535 19.042 9.48242 19.042C8.10254 19.042 6.81934 19.3936 5.93164 20.0703V8.45117ZM22.0684 8.45117V20.0703C21.1807 19.3936 19.8975 19.042 18.5176 19.042C17.1465 19.042 15.8545 19.3936 14.9492 20.0439V8.45117C15.1602 7.87988 16.5049 6.88672 18.5176 6.88672C20.5303 6.88672 21.8311 7.87109 22.0684 8.45117Z" fill="currentColor"/>
              </svg>
            </button>    
            <ReactTooltip id='sideTip' effect='solid' type='dark' place='right' className='tooltip' backgroundColor='#000' arrowColor='transparent'>
              <span>Toggle Sidebar</span>
            </ReactTooltip>      
          </>
          }
          <p className='top__info-filename' style={filenameStyle}>{filename}</p>
        </div>
        <div className="top__menu" style={menuStyle}>
          <button type='button' data-tip data-for="readTip" className="top__menu-readonly" onClick={() => isRead(!read) & isSplit(false)}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.38379 21.8281C11.2051 21.8281 13.3672 18.5234 13.3672 13.6543C13.3672 8.77637 11.2051 5.48926 8.38379 5.48926C5.5625 5.48926 3.40039 8.77637 3.40039 13.6543C3.40039 18.5234 5.5625 21.8281 8.38379 21.8281ZM19.6074 21.8281C22.4287 21.8281 24.5908 18.5234 24.5908 13.6543C24.5908 8.77637 22.4287 5.48926 19.6074 5.48926C16.7949 5.48926 14.624 8.77637 14.624 13.6543C14.624 18.5234 16.7949 21.8281 19.6074 21.8281ZM6.61719 16.6777C8.09375 16.6777 9.07812 15.6582 9.07812 14.1113C9.07812 12.582 8.09375 11.5449 6.61719 11.5449C6.01074 11.5449 5.49219 11.7207 5.08789 12.0283C5.43945 9.02246 6.79297 7.0625 8.38379 7.05371C10.2646 7.04492 11.7939 9.7168 11.7939 13.6543C11.7939 17.5654 10.2646 20.2549 8.38379 20.2637C6.97754 20.2725 5.76465 18.752 5.25488 16.3174C5.63281 16.5547 6.08984 16.6777 6.61719 16.6777ZM17.8408 16.6777C19.3086 16.6777 20.3018 15.6582 20.3018 14.1113C20.3018 12.582 19.3086 11.5449 17.8408 11.5449C17.2256 11.5449 16.707 11.7207 16.2939 12.0283C16.6543 9.02246 18.0078 7.0625 19.6074 7.0625C21.4795 7.0625 23.0088 9.73438 23.0088 13.6543C23.0088 17.5742 21.4795 20.2549 19.6074 20.2549C18.2012 20.2549 16.9795 18.7432 16.4697 16.3174C16.8477 16.5547 17.3135 16.6777 17.8408 16.6777ZM5.92285 13.8037C5.61523 13.751 5.41309 13.3818 5.4834 12.9951C5.5625 12.6084 5.87012 12.3359 6.16895 12.3887C6.48535 12.4502 6.66992 12.8193 6.59082 13.1973C6.52051 13.584 6.23047 13.8564 5.92285 13.8037ZM17.1465 13.8037C16.8301 13.7422 16.6367 13.3818 16.707 12.9951C16.7861 12.6084 17.0762 12.3359 17.3838 12.3887C17.709 12.4414 17.8936 12.8193 17.8145 13.1973C17.7354 13.584 17.4541 13.8564 17.1465 13.8037Z" fill="currentColor"/>
            </svg>
          </button>
          <ReactTooltip id='readTip' effect='solid' type='dark' place='bottom' className='tooltip' backgroundColor='#000' arrowColor='transparent'>
            <span>Read-only</span>
          </ReactTooltip>
          <button type='button' data-tip data-for="splitTip" className="top__menu-split" onClick={() => isSplit(!split)}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.45898 20.29C6.45898 22.1885 7.43457 23.1729 9.31543 23.1729H18.6758C20.5566 23.1729 21.5322 22.1885 21.5322 20.29V7.02734C21.5322 5.1377 20.5566 4.14453 18.6758 4.14453H9.31543C7.43457 4.14453 6.45898 5.1377 6.45898 7.02734V20.29ZM8.18164 20.1846V7.13281C8.18164 6.31543 8.60352 5.86719 9.45605 5.86719H13.1299V21.4502H9.45605C8.60352 21.4502 8.18164 21.002 8.18164 20.1846ZM18.5264 5.86719C19.3789 5.86719 19.8096 6.31543 19.8096 7.13281V20.1846C19.8096 21.002 19.3789 21.4502 18.5264 21.4502H14.8525V5.86719H18.5264Z" fill="currentColor"/>
            </svg>
          </button>
          <ReactTooltip id='splitTip' effect='solid' type='dark' place='bottom' className='tooltip' backgroundColor='#000' arrowColor='transparent'>
            <span>Split window</span>
          </ReactTooltip>
          <button type='button' className='top__menu-submenu' onClick={() => isSubmenu(!submenu)}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.16016 9.50586C6.85449 9.50586 7.4082 8.95215 7.4082 8.25781C7.4082 7.57227 6.85449 7.00977 6.16016 7.00977C5.47461 7.00977 4.91211 7.57227 4.91211 8.25781C4.91211 8.95215 5.47461 9.50586 6.16016 9.50586ZM10.291 9.10156H22.2266C22.7012 9.10156 23.0791 8.73242 23.0791 8.25781C23.0791 7.7832 22.71 7.41406 22.2266 7.41406H10.291C9.8252 7.41406 9.44727 7.7832 9.44727 8.25781C9.44727 8.73242 9.81641 9.10156 10.291 9.10156ZM6.16016 14.9111C6.85449 14.9111 7.4082 14.3574 7.4082 13.6631C7.4082 12.9775 6.85449 12.415 6.16016 12.415C5.47461 12.415 4.91211 12.9775 4.91211 13.6631C4.91211 14.3574 5.47461 14.9111 6.16016 14.9111ZM10.291 14.5068H22.2266C22.7012 14.5068 23.0791 14.1377 23.0791 13.6631C23.0791 13.1885 22.71 12.8193 22.2266 12.8193H10.291C9.8252 12.8193 9.44727 13.1885 9.44727 13.6631C9.44727 14.1377 9.81641 14.5068 10.291 14.5068ZM6.16016 20.3164C6.85449 20.3164 7.4082 19.7627 7.4082 19.0684C7.4082 18.3828 6.85449 17.8203 6.16016 17.8203C5.47461 17.8203 4.91211 18.3828 4.91211 19.0684C4.91211 19.7627 5.47461 20.3164 6.16016 20.3164ZM10.291 19.9121H22.2266C22.7012 19.9121 23.0791 19.543 23.0791 19.0684C23.0791 18.5938 22.71 18.2246 22.2266 18.2246H10.291C9.8252 18.2246 9.44727 18.5938 9.44727 19.0684C9.44727 19.543 9.81641 19.9121 10.291 19.9121Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </nav>
    </>
  )
}
