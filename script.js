// document loaded
document.addEventListener('DOMContentLoaded', () => {
  // constants
  const { header, sidebar, guestbook, article } = constants

  // header
  const { toggleSearchInput, openSidebar } = header.func
  const { searchToggleButton, sidebarOpenButton } = header.elements

  // sidebar
  const { sidebarCloseButton } = sidebar.elements
  const {
    tagCloudStyle,
    compareCounterTodayAndYesterday,
    closeSidebar,
    showSidebarByWindowResizing,
  } = sidebar.func

  // guestbook
  const { guestbookUsernameStyle, guestbookReportStyle } = guestbook.func

  // article
  const {
    toggleLockIconOnSecretBox,
    articleCommentListLinkStyle,
    showPrevNextArticle,
    articleTableOfContent,
    copyToClipboard,
  } = article.func
  const { articleSecretCheckBox } = article.elements

  // 검색 버튼을 누를면, 검색창을 토글한다.
  searchToggleButton &&
    searchToggleButton.addEventListener('click', toggleSearchInput)

  // 사이드바를 오픈한다.
  sidebarOpenButton && sidebarOpenButton.addEventListener('click', openSidebar)

  // 사이드바를 닫는다.
  sidebarCloseButton &&
    sidebarCloseButton.addEventListener('click', closeSidebar)

  // window resize
  window.addEventListener('resize', showSidebarByWindowResizing)

  // 방문자 수를 비교하고, 스타일을 적용
  compareCounterTodayAndYesterday()

  // Tag cloud 스타일 적용
  tagCloudStyle()

  // Guestbook username 스타일 적용
  guestbookUsernameStyle()

  // Guestbook report 스타일 적용
  guestbookReportStyle()

  // 댓글의 lock icon 을 토글한다.
  articleSecretCheckBox &&
    articleSecretCheckBox.addEventListener('click', toggleLockIconOnSecretBox)

  // 댓글 링크 스타일 적용
  articleCommentListLinkStyle()

  // 본문의 스크롤이 하단에 도달했을때, 추천글을 띄운다.
  window.addEventListener('scroll', showPrevNextArticle)

  // ToC
  articleTableOfContent()

  // code를 클립보드에 복사한다.
  copyToClipboard()
})

const constants = {
  // header elements & functions
  header: {
    elements: {
      search: document.querySelector('.search'),
      searchIcon: document.querySelector('.search__toggle .uil-search'),
      searchCloseIcon: document.querySelector('.search__toggle .uil-times'),
      sidebarOpenButton: document.querySelector('.sidebar__open'),
      searchToggleButton: document.querySelector('.search__toggle'),
      searchInput: document.querySelector('.search__input'),
    },
    func: {
      /**
       * Search 창을 토글한다.
       */
      toggleSearchInput: () => {
        const { search, searchIcon, searchCloseIcon, searchInput } =
          constants.header.elements

        if (search.style.display === 'none' || search.style.display === '') {
          // search 창이 숨겨져 있는 경우, 보이도록 설정
          search.style.display = 'flex' // search 창 보이기
          searchIcon.style.display = 'none' // search open Icon 숨기기
          searchCloseIcon.style.display = 'block' // search close Icon 보이기
          searchInput.focus() // 검색창 누르면 포커싱
        } else {
          search.style.display = 'none' // search 창 숨기기
          searchIcon.style.display = 'block' // search open Icon 보이기
          searchCloseIcon.style.display = 'none' // search close Icon 숨기기
        }
      },
      /**
       * 사이드바를 오픈한다.
       */
      openSidebar: () => {
        const { sidebarCloseButton, sidebar } = constants.sidebar.elements

        sidebarCloseButton.style.display = 'block'
        sidebar.style.display = 'block'
      },
    },
  },
  // sidebar elements & functions
  sidebar: {
    elements: {
      sidebar: document.querySelector('#sidebar'),
      sidebarCloseButton: document.querySelector('.sidebar__close'),
      tagCloud1List: document.querySelectorAll('.cloud1'),
      tagCloud2List: document.querySelectorAll('.cloud2'),
      tagCloud3List: document.querySelectorAll('.cloud3'),
      tagCloud4List: document.querySelectorAll('.cloud4'),
      tagCloud5List: document.querySelectorAll('.cloud5'),
      counterYesterday: document.querySelector('.counter__yesterday'),
      counterToday: document.querySelector('.counter__today'),
      counterTotal: document.querySelector('.counter__total'),
      counterDelta: document.querySelector('.counter__delta'),
      counterDeltaGroup: document.querySelector('.counter__deltagroup'),
      counterUpIcon: document.querySelector('.counter .uil-angle-double-up'),
      counterDownIcon: document.querySelector(
        '.counter .uil-angle-double-down'
      ),
    },
    func: {
      /**
       * Tag Cloud 에 스타일을 입힌다.
       */
      tagCloudStyle: () => {
        const {
          tagCloud1List,
          tagCloud2List,
          tagCloud3List,
          tagCloud4List,
          tagCloud5List,
        } = constants.sidebar.elements

        tagCloud1List &&
          tagCloud1List.forEach((tagCloud) => {
            tagCloud.classList.add('btn-blue')
          })

        tagCloud2List &&
          tagCloud2List.forEach((tagCloud) => {
            tagCloud.classList.add('btn-green')
          })

        tagCloud3List &&
          tagCloud3List.forEach((tagCloud) => {
            tagCloud.classList.add('btn-red')
          })

        tagCloud4List &&
          tagCloud4List.forEach((tagCloud) => {
            tagCloud.classList.add('btn-orange')
          })

        tagCloud5List &&
          tagCloud5List.forEach((tagCloud) => {
            tagCloud.classList.add('btn-violet')
          })
      },
      /**
       * 오늘 방문자 수와 어제 방문자 수를 비교하고, 스타일을 입힌다.
       */
      compareCounterTodayAndYesterday: () => {
        const {
          counterYesterday,
          counterToday,
          counterDelta,
          counterDeltaGroup,
          counterUpIcon,
          counterDownIcon,
        } = constants.sidebar.elements

        if (counterYesterday === undefined || counterYesterday === null) {
          return
        }
        if (counterToday === undefined || counterToday === null) {
          return
        }
        if (counterDelta === undefined || counterDelta === null) {
          return
        }
        if (counterDeltaGroup === undefined || counterDeltaGroup === null) {
          return
        }
        if (counterUpIcon === undefined || counterUpIcon === null) {
          return
        }
        if (counterDownIcon === undefined || counterDownIcon === null) {
          return
        }

        const yesterday = counterYesterday.getAttribute('data-value')
        const today = counterToday.getAttribute('data-value')
        const delta = today - yesterday

        if (delta === 0) {
          counterDownIcon.style.display = 'none'
          counterUpIcon.style.display = 'none'
        } else if (delta > 0) {
          counterDownIcon.style.display = 'none'
          counterDeltaGroup.style.color = '#f03e3e'
          counterDelta.innerHTML = delta
        } else if (delta < 0) {
          counterUpIcon.style.display = 'none'
          counterDeltaGroup.style.color = '#4263eb'
          counterDelta.innerHTML = delta * -1
        }
      },
      /**
       * 사이드 바를 닫는다.
       */
      closeSidebar: () => {
        constants.sidebar.elements.sidebar.style.display = 'none'
      },
      /**
       * 창 크기에 따라 사이드바를 보이게 하거나 숨긴다.
       */
      showSidebarByWindowResizing: () => {
        const _sidebar = constants.sidebar.elements.sidebar
        const _sidebarCloseButton =
          constants.sidebar.elements.sidebarCloseButton

        if (960 <= window.innerWidth) {
          _sidebar.style.display = 'block'
          _sidebarCloseButton.style.display = 'none'
        } else {
          if (_sidebar.style.display === 'block') {
            _sidebar.style.display = 'none'
          }
        }
      },
    },
  },
  guestbook: {
    elements: {
      guestbookUsernameList: document.querySelectorAll(
        '.guestbook__header-info .name a'
      ),
      guestbookReportList: document.querySelectorAll(
        '.guestbook__header-info .date span a'
      ),
    },
    func: {
      /**
       * guestbook의 usename에 스타일을 적용한다.
       */
      guestbookUsernameStyle: () => {
        const { guestbookUsernameList } = constants.guestbook.elements

        guestbookUsernameList &&
          guestbookUsernameList.forEach((username) => {
            username.classList.add('link-hover-blue')
            username.classList.add('link')
          })
      },
      /**
       * guestbook의 '신고' 버튼에 스타일을 적용한다.
       */
      guestbookReportStyle: () => {
        const { guestbookReportList } = constants.guestbook.elements

        guestbookReportList &&
          guestbookReportList.forEach((report) => {
            report.classList.add('link-red')
            report.classList.add('link')
            report.classList.add('link-sm')
          })
      },
    },
  },
  article: {
    elements: {
      article: document.querySelector('#content .article'),
      articleContent: document.querySelector('.article__content'),
      articleToc: document.querySelector('.article__content-toc'),
      articleSecretCheckBox: document.querySelector('#article-secret-checkbox'),
      articleSecretLockIcon: document.querySelector(
        '.article__comment-secret .uil-lock'
      ),
      articleSecretUnLockIcon: document.querySelector(
        '.article__comment-secret .uil-unlock'
      ),
      articleCommentListNameLinks: document.querySelectorAll(
        '.article__comment-content-wrap .article__comment-name span a'
      ),
      articleCommentListReportLinks: document.querySelectorAll(
        '.article__comment-content .date a'
      ),
      articlePrev: document.querySelector('.article__prev'),
      articleNext: document.querySelector('.article__next'),
      articleHeaderTags: document.querySelector('.article__content')
        ? document
            .querySelector('.article__content')
            .querySelectorAll('h1, h2, h3, h4')
        : undefined,
      articlePreTags: document.querySelectorAll(
        '.article__container .article__content pre'
      ),
    },
    func: {
      /**
       * 댓글 쓰기의 lock icon을 토글한다. (비밀글 아이콘)
       */
      toggleLockIconOnSecretBox: () => {
        const {
          articleSecretCheckBox,
          articleSecretLockIcon,
          articleSecretUnLockIcon,
        } = constants.article.elements
        if (articleSecretCheckBox) {
          const isLocked = articleSecretCheckBox.getAttribute('lock')

          if (isLocked === 'true') {
            articleSecretCheckBox.setAttribute('lock', 'false')
            articleSecretLockIcon.style.display = 'none'
            articleSecretUnLockIcon.style.display = 'block'
          } else {
            articleSecretCheckBox.setAttribute('lock', 'true')
            articleSecretLockIcon.style.display = 'block'
            articleSecretUnLockIcon.style.display = 'none'
          }
        }
      },
      /**
       * 댓글 링크에 스타일 적용
       */
      articleCommentListLinkStyle: () => {
        const { articleCommentListNameLinks, articleCommentListReportLinks } =
          constants.article.elements

        articleCommentListNameLinks &&
          articleCommentListNameLinks.forEach((nameLink) => {
            nameLink.classList.add('link')
            nameLink.classList.add('link-hover-blue')
          })

        articleCommentListReportLinks &&
          articleCommentListReportLinks.forEach((reportLink) => {
            reportLink.classList.add('link')
            reportLink.classList.add('link-red')
          })
      },
      /**
       * 스크롤이 본문 하단에 도달했을때, 추천글을 띄운다.
       */
      showPrevNextArticle: () => {
        const { articleContent, articlePrev, articleNext } =
          constants.article.elements
        if (!articleContent) {
          return
        }

        const currentScrollY = window.scrollY + window.innerHeight

        // 이전 글이 있을때
        if (articlePrev) {
          if (currentScrollY >= articleContent.scrollHeight) {
            if (
              articlePrev.style.display === '' ||
              articlePrev.style.display === 'none'
            ) {
              articlePrev.style.display = 'flex'
            }
          } else {
            if (articlePrev.style.display === 'flex') {
              articlePrev.style.display = 'none'
            }
          }
        }

        // 다음 글이 있을때
        if (articleNext) {
          if (currentScrollY >= articleContent.scrollHeight) {
            if (
              articleNext.style.display === '' ||
              articleNext.style.display === 'none'
            ) {
              articleNext.style.display = 'flex'
            }
          } else {
            if (articleNext.style.display === 'flex') {
              articleNext.style.display = 'none'
            }
          }
        }
      },
      /**
       * ToC 설정
       */
      articleTableOfContent: () => {
        /**
         * ToC 설정 - header 태그에서 가장 level이 낮을것을 찾음
         */
        const findMinLevel = () => {
          const { articleHeaderTags } = constants.article.elements

          // 본문에서 모든 header 태그를 가지고 옴
          // header 태그가 있는 경우에만 실행
          if (articleHeaderTags) {
            // header 태그 중 제일 level이 낮은 것을 찾음
            // => h1: 1 / h2: 2 / h3: 3 / h4: 4
            let minLevel = 99

            let tocHtml = ''
            articleHeaderTags.forEach((tag) => {
              // indent를 나누기 위해 level을 먼저 구함
              if (minLevel !== 1) {
                let currentLevel = 0
                if (tag.tagName === 'H1') {
                  currentLevel = 1
                } else if (tag.tagName === 'H2') {
                  currentLevel = 2
                } else if (tag.tagName === 'H3') {
                  currentLevel = 3
                } else if (tag.tagName === 'H4') {
                  currentLevel = 4
                }

                if (currentLevel === 1) {
                  // h1 인 경우, 뒤에 볼 필요도 없음
                  minLevel = 1
                }

                minLevel = minLevel < currentLevel ? minLevel : currentLevel
              }
            })
            return minLevel
          }
          return 0
        }

        /**
         * ToC 설정 - 태그에 id 값을 넣는다.
         */
        const setIdAtTags = () => {
          const { articleHeaderTags } = constants.article.elements

          articleHeaderTags &&
            articleHeaderTags.forEach((tag) => {
              if (
                tag.tagName[1] === '4' &&
                tag.innerText.indexOf('카테고리의 다른 글') !== -1
              ) {
                return
              }

              // Tag에 id 값 부여
              tag.id = `toc-${tag.innerText}`

              // 눌렀을때 스크롤 이동
              tag.addEventListener('click', () => {
                window.location.href = `#${tag.id}`
              })
            })
        }

        /**
         * ToC 설정 - ToC를 생성한다.
         */
        const generateToc = (minLevel) => {
          const { articleToc, articleHeaderTags } = constants.article.elements

          const indexNumbers = { 0: 0, 1: 0, 2: 0, 3: 0 }

          articleToc &&
            articleHeaderTags &&
            articleHeaderTags.forEach((tag) => {
              if (
                tag.tagName[1] === '4' &&
                tag.innerText.indexOf('카테고리의 다른 글') !== -1
              ) {
                return
              }

              const indentNumber = Number(tag.tagName[1]) - minLevel
              indexNumbers[indentNumber] += 1

              const p = document.createElement('p')
              p.classList.add('link')
              p.classList.add('link-sm')
              p.classList.add('link-hover-blue')
              p.classList.add(`indent${indentNumber}`)
              p.addEventListener('click', () => {
                window.location.href = `#${tag.id}`
              })

              let prefixText = ''
              for (let i = 0; i <= indentNumber; i++) {
                prefixText += `${indexNumbers[i]}.`
              }
              // 다음 level clear
              for (let i = indentNumber + 1; i <= 3; i++) {
                indexNumbers[i] = 0
              }

              p.innerText = `${prefixText} ${tag.innerText}`
              tag.innerText = `${prefixText} ${tag.innerText}`
              articleToc.appendChild(p)
            })
        }

        const minLevel = findMinLevel()
        if (minLevel !== 0) {
          setIdAtTags()
          generateToc(minLevel)
        }
      },
      copyToClipboard: () => {
        const { articlePreTags } = constants.article.elements

        articlePreTags &&
          articlePreTags.forEach((preTag) => {
            const lang = preTag.getAttribute('data-ke-language')
            if (lang) {
              const span = document.createElement('span')
              span.classList.add('code-lang')
              span.innerText = lang
              span.addEventListener('mouseover', () => {
                span.innerText = 'copy!'
              })
              span.addEventListener('click', () => {
                navigator.clipboard.writeText(
                  preTag.innerText.split('\n').slice(0, -1).join('\n')
                )
                span.innerText = 'copied!'
              })
              span.addEventListener('mouseleave', () => {
                span.innerText = lang
              })
              preTag.appendChild(span)
            }
          })
      },
    },
  },
}
