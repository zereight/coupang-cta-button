// document loaded
document.addEventListener('DOMContentLoaded', () => {
    // constants
    const { header, sidebar, guestbook, article } = constants

    // header
    const { _handleToggleSearch, _handleOpenSidebar } = header
    const { searchToggleButton, sidebarOpenButton } = header.components

    // sidebar
    const {
      _handleInsertTagCloudStyle,
      _handleCompareCounterTodayAndYesterday,
      _handleCloseSidebar,
      _handleShowSidebarByWindowResizing,
    } = sidebar
    const { sidebarCloseButton } = sidebar.components

    // guestbook
    const {
      _handleInsertGuestbookUsernameStyle,
      _handleInsertGuestbookReportStyle,
    } = guestbook

    // article
    const {
      _handleToggleLockIconOnSecretBox,
      _handleInsertStyleArticleCommentListLinks,
      _handleShowPrevNextArticle,
      _handleArticleTableOfContent,
    } = article
    const { articleSecretCheckBox } = article.components

    // search button toggle event
    searchToggleButton &&
      searchToggleButton.addEventListener('click', _handleToggleSearch)

    // sidebar open event
    sidebarOpenButton &&
      sidebarOpenButton.addEventListener('click', _handleOpenSidebar)

    // sidebar close event
    sidebarCloseButton &&
      sidebarCloseButton.addEventListener('click', _handleCloseSidebar)

    // window resize
    window.addEventListener('resize', _handleShowSidebarByWindowResizing)

    // Compare visitor counter.
    _handleCompareCounterTodayAndYesterday()

    // Tag cloud style
    _handleInsertTagCloudStyle()

    // Guestbook username style
    _handleInsertGuestbookUsernameStyle()

    // Guestbook report style
    _handleInsertGuestbookReportStyle()

    // Toggle lock icon at write form of comment
    articleSecretCheckBox &&
      articleSecretCheckBox.addEventListener(
        'click',
        _handleToggleLockIconOnSecretBox
      )

    // Article comment link style
    _handleInsertStyleArticleCommentListLinks()

    // Recommend article
    window.addEventListener('scroll', _handleShowPrevNextArticle)

    // ToC
    _handleArticleTableOfContent()
  })

  const constants = {
    // header constants
    header: {
      components: {
        search: document.querySelector('.search'),
        searchIcon: document.querySelector('.search__toggle .uil-search'),
        searchCloseIcon: document.querySelector(
          '.search__toggle .uil-times'
        ),
        sidebarOpenButton: document.querySelector('.sidebar__open'),
        searchToggleButton: document.querySelector('.search__toggle'),
        searchInput: document.querySelector('.search__input'),
      },
      _handleToggleSearch: () => {
        const { search, searchIcon, searchCloseIcon, searchInput } =
          constants.header.components

        if (
          search.style.display === 'none' ||
          search.style.display === ''
        ) {
          search.style.display = 'flex'
          searchIcon.style.display = 'none'
          searchCloseIcon.style.display = 'block'
          searchInput.focus() // 검색창 누르면 포커싱
        } else {
          search.style.display = 'none'
          searchIcon.style.display = 'block'
          searchCloseIcon.style.display = 'none'
        }
      },
      _handleOpenSidebar: () => {
        constants.sidebar.components.sidebarCloseButton.style.display =
          'block'
        constants.sidebar.components.sidebar.style.display = 'block'
      },
    },
    // sidebar constants
    sidebar: {
      components: {
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
        counterUpIcon: document.querySelector(
          '.counter .uil-angle-double-up'
        ),
        counterDownIcon: document.querySelector(
          '.counter .uil-angle-double-down'
        ),
      },
      _handleInsertTagCloudStyle: () => {
        const {
          tagCloud1List,
          tagCloud2List,
          tagCloud3List,
          tagCloud4List,
          tagCloud5List,
        } = constants.sidebar.components

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
      _handleCompareCounterTodayAndYesterday: () => {
        const {
          counterYesterday,
          counterToday,
          counterDelta,
          counterDeltaGroup,
          counterUpIcon,
          counterDownIcon,
        } = constants.sidebar.components

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
      _handleCloseSidebar: () => {
        constants.sidebar.components.sidebar.style.display = 'none'
      },
      _handleShowSidebarByWindowResizing: () => {
        const _sidebar = constants.sidebar.components.sidebar
        const _sidebarCloseButton =
          constants.sidebar.components.sidebarCloseButton

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
    guestbook: {
      components: {
        guestbookUsernameList: document.querySelectorAll(
          '.guestbook__header-info .name a'
        ),
        guestbookReportList: document.querySelectorAll(
          '.guestbook__header-info .date span a'
        ),
      },
      _handleInsertGuestbookUsernameStyle: () => {
        const { guestbookUsernameList } = constants.guestbook.components

        if (guestbookUsernameList) {
          guestbookUsernameList.forEach((username) => {
            username.classList.add('link-hover-blue')
            username.classList.add('link')
          })
        }
      },
      _handleInsertGuestbookReportStyle: () => {
        const { guestbookReportList } = constants.guestbook.components

        if (guestbookReportList) {
          guestbookReportList.forEach((report) => {
            report.classList.add('link-red')
            report.classList.add('link')
            report.classList.add('link-sm')
          })
        }
      },
    },
    article: {
      components: {
        article: document.querySelector('#content .article'),
        articleContent: document.querySelector('.article__content'),
        articleToc: document.querySelector('.article__content-toc'),
        articleSecretCheckBox: document.querySelector(
          '#article-secret-checkbox'
        ),
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
      },
      _handleToggleLockIconOnSecretBox: () => {
        const {
          articleSecretCheckBox,
          articleSecretLockIcon,
          articleSecretUnLockIcon,
        } = constants.article.components
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
      _handleInsertStyleArticleCommentListLinks: () => {
        const {
          articleCommentListNameLinks,
          articleCommentListReportLinks,
        } = constants.article.components

        if (articleCommentListNameLinks) {
          articleCommentListNameLinks.forEach((nameLink) => {
            nameLink.classList.add('link')
            nameLink.classList.add('link-hover-blue')
          })
        }
        if (articleCommentListReportLinks) {
          articleCommentListReportLinks.forEach((reportLink) => {
            reportLink.classList.add('link')
            reportLink.classList.add('link-red')
          })
        }
      },
      _handleShowPrevNextArticle: () => {
        const { articleContent, articlePrev, articleNext } =
          constants.article.components
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
      _handleArticleTableOfContent: () => {
        const findMinLevel = () => {
          const { articleHeaderTags } = constants.article.components

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

        const setIdAtTags = () => {
          const { articleHeaderTags } = constants.article.components

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

        const generateToc = (minLevel) => {
          const { articleToc, articleHeaderTags } =
            constants.article.components

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
    },
  }