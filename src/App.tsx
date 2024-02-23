import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import style from './style.scss';

type DragData = {
  columnIndex: number;
  dayIndex: number;
  data: any;
};

const mockTableData = [
  {
    subjectId: null,
    subjectName: null,
    daySort: null,
    date: 1708358400000,
    contents: [
      {
        title: 'B端测试-导学案地理',
        duration: 1046,
        parentContentId: 1312,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1312&lessonId=3093',
        contentId: '3093',
        subjectId: 1,
        subjectName: '语文',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3093-1-53820318367217538',
        contentKey: '1-3093',
        paperType: false,
        videoType: true,
      },
      {
        title: '晓蕾测试语文03-有导学案',
        duration: 1327,
        parentContentId: 1314,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1314&lessonId=2811',
        contentId: '2811',
        subjectId: 1,
        subjectName: '语文',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2811-1-53820318367225995',
        contentKey: '1-2811',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: null,
    subjectName: null,
    daySort: null,
    date: 1708444800000,
    contents: [
      {
        title: '古诗鉴赏古诗鉴赏古诗鉴赏古诗鉴赏古诗鉴赏',
        duration: 1000,
        parentContentId: 1312,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1312&lessonId=3093',
        contentId: '1111',
        subjectId: 1,
        subjectName: '语文',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3093-1-538203183672175333',
        contentKey: '1-3093',
        paperType: false,
        videoType: true,
      },
      {
        title: '语文-ModelForm操作及验证-1',
        duration: 776,
        parentContentId: 1286,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1286&lessonId=3052',
        contentId: '3052',
        subjectId: 2,
        subjectName: '数学',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3052-1-53820318367230744',
        contentKey: '1-3052',
        paperType: false,
        videoType: true,
      },
      {
        title: '语文-ModelForm操作及验证-2',
        duration: 1568,
        parentContentId: 1286,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1286&lessonId=3053',
        contentId: '3053',
        subjectId: 2,
        subjectName: '数学',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3053-1-53820318367233811',
        contentKey: '1-3053',
        paperType: false,
        videoType: true,
      },
      {
        title: '高中生学习力综合测评',
        duration: 1800,
        contentId: '1',
        subjectId: 10,
        subjectName: '心灵成长',
        contentType: 6,
        contentName: '测评',
        courseOrder: 0,
        resourceKey: '1-6-53820318367237007',
        contentKey: '6-1',
        paperType: false,
        videoType: false,
      },
    ],
  },
  {
    subjectId: null,
    subjectName: null,
    daySort: null,
    date: 1708531200000,
    contents: [
      {
        title: 'B端测试-英语导学案',
        duration: 2880,
        parentContentId: 1306,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1306&lessonId=3089',
        contentId: '3089',
        subjectId: 3,
        subjectName: '英语',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3089-1-53820318367241179',
        contentKey: '1-3089',
        paperType: false,
        videoType: true,
      },
      {
        title: 'bbb鲍小鱼包0916',
        duration: 5,
        parentContentId: 1232,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1232&lessonId=2651',
        contentId: '2651',
        subjectId: 3,
        subjectName: '英语',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2651-1-53820318367244304',
        contentKey: '1-2651',
        paperType: false,
        videoType: true,
      },
      {
        title: 'test1',
        duration: 175,
        parentContentId: 877,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=877&lessonId=2019',
        contentId: '2019',
        subjectId: 7,
        subjectName: '政治',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2019-1-53820318367247152',
        contentKey: '1-2019',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: null,
    subjectName: null,
    daySort: null,
    date: 1708617600000,
    contents: [
      {
        title: '浴火重生-信息第三章节',
        duration: 175,
        parentContentId: 222,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=222&lessonId=232',
        contentId: '232',
        subjectId: 14,
        subjectName: '信息技术',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '232-1-53820318367250605',
        contentKey: '1-232',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: null,
    subjectName: null,
    daySort: null,
    date: 1708704000000,
    contents: [
      {
        title: '测试444',
        duration: 651,
        contentUrl:
          '//web.test.mistong.com/spiritual-growth/#/xinqing?fmId=303528',
        contentId: '303528',
        subjectId: 10,
        subjectName: '心灵成长',
        contentType: 3,
        contentName: 'FM',
        courseOrder: 0,
        resourceKey: '303528-3-53820318367254188',
        contentKey: '3-303528',
        paperType: false,
        videoType: false,
      },
    ],
  },
  {
    subjectId: null,
    subjectName: null,
    daySort: null,
    date: 1708790400000,
    contents: [
      {
        title: '董妙妙123',
        duration: 175,
        parentContentId: 877,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=877&lessonId=2010',
        contentId: '2010',
        subjectId: 7,
        subjectName: '政治',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2010-1-53820318367257801',
        contentKey: '1-2010',
        paperType: false,
        videoType: true,
      },
      {
        title: '心态决定一切',
        duration: 175,
        parentContentId: 222,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=222&lessonId=235',
        contentId: '235',
        subjectId: 14,
        subjectName: '信息技术',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '235-1-53820318367260331',
        contentKey: '1-235',
        paperType: false,
        videoType: true,
      },
      {
        title: '中国古代科技史',
        duration: 175,
        parentContentId: 527,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=527&lessonId=766',
        contentId: '766',
        subjectId: 8,
        subjectName: '历史',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '766-1-53820318367262818',
        contentKey: '1-766',
        paperType: false,
        videoType: true,
      },
      {
        title: 'liujw测试课程讲(勿动)私有',
        duration: 4,
        parentContentId: 1296,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1296&lessonId=3079',
        contentId: '3079',
        subjectId: 9,
        subjectName: '地理',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3079-1-53820318367265476',
        contentKey: '1-3079',
        paperType: false,
        videoType: true,
      },
      {
        title: '测试-私有',
        duration: 120,
        parentContentId: 1296,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1296&lessonId=3081',
        contentId: '3081',
        subjectId: 9,
        subjectName: '地理',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3081-1-53820318367268153',
        contentKey: '1-3081',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: null,
    subjectName: null,
    daySort: null,
    date: 1708876800000,
    contents: [
      {
        title: 'zzj-导学案-化学1',
        duration: 8,
        parentContentId: 1241,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1241&lessonId=2667',
        contentId: '2667',
        subjectId: 5,
        subjectName: '化学',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2667-1-53820318367311405',
        contentKey: '1-2667',
        paperType: false,
        videoType: true,
      },
    ],
  },
];
// 所有科目（资源列表中包含的所有科目）
const subjects = [
  {
    subjectId: 1,
    subjectName: '语文',
    daySort: null,
    date: null,
    contents: [],
  },
  {
    subjectId: 2,
    subjectName: '数学',
    daySort: null,
    date: null,
    contents: [],
  },
  {
    subjectId: 3,
    subjectName: '英语',
    daySort: null,
    date: null,
    contents: [],
  },
  {
    subjectId: 5,
    subjectName: '化学',
    daySort: null,
    date: null,
    contents: [],
  },
  {
    subjectId: 7,
    subjectName: '政治',
    daySort: null,
    date: null,
    contents: [],
  },
  {
    subjectId: 8,
    subjectName: '历史',
    daySort: null,
    date: null,
    contents: [],
  },
  {
    subjectId: 9,
    subjectName: '地理',
    daySort: null,
    date: null,
    contents: [],
  },
  {
    subjectId: 10,
    subjectName: '心灵成长',
    daySort: null,
    date: null,
    contents: [],
  },
  {
    subjectId: 14,
    subjectName: '信息技术',
    daySort: null,
    date: null,
    contents: [],
  },
];

function Arrange() {
  const [tableData, setTableData] = useState([]);
  const dragDataRef = useRef<DragData>(null);

  const getTableData = () => {
    setTableData(mockTableData);
  };
  useEffect(() => {
    getTableData();
  }, []);

  const subjectData = useMemo(
    () =>
      subjects.reduce((data, subject) => {
        data[subject.subjectId] = tableData.map((row) => {
          if (
            !row.contents.length ||
            !row.contents.find((c) => c.subjectId === subject.subjectId)
          ) {
            return [];
          }
          return row.contents.filter((c) => c.subjectId === subject.subjectId);
        });
        return data;
      }, {}),
    [tableData],
  );

  // 计算每一行最高的高度，将每个元素置为最高
  const calcLineHeight = () => {
    const loop_time = tableData.length + 1;
    Array(loop_time)
      .fill()
      .forEach((_, index) => {
        const lineIndex = index + 1;
        const elements = document.querySelectorAll(`.line${lineIndex}`);
        const heights = [...elements].map(
          (element) => (element as HTMLElement).offsetHeight,
        );
        const maxHeight = Math.max(...heights);
        // eslint-disable-next-line no-unused-expressions, no-return-assign
        document
          .querySelectorAll(`.line${lineIndex}`)
          ?.forEach(
            (el) => ((el as HTMLElement).style.height = `${maxHeight}px`),
          );
      });
  };

  useEffect(() => {
    calcLineHeight();
  }, [tableData]);

  const calcSubjectName = (subjectId: number) =>
    subjects.find((s) => Number(s.subjectId) === Number(subjectId))
      ?.subjectName;

  const handleDragStart = (
    event: any,
    columnIndex: number,
    dayItemIndex: number,
    childIndex: number,
    subjectId: number,
    data: any,
  ) => {
    // 添加拖动时的样式类
    event.target.classList.add('dragging');
    // 给其他列添加禁用样式
    const columns = document.querySelectorAll('[class*="column-"]');
    columns.forEach((column) => {
      if (!column.classList.contains(`column-${columnIndex}`)) {
        column.classList.add('disabled'); // 添加禁用样式
      }
    });
    dragDataRef.current = {
      columnIndex,
      dayIndex: dayItemIndex,
      el: event.target,
      data,
    };
  };

  const calcMousePosition = (event) => {
    // 获取元素的高度
    const elementHeight = event.target.clientHeight;

    // 计算鼠标相对于元素顶部的距离
    const mouseY = event.clientY - event.target.getBoundingClientRect().top;

    // 计算鼠标经过元素高度的百分比
    const mousePercentage = (mouseY / elementHeight) * 100;
    return mousePercentage;
  };

  function createNewElement() {
    const newElement = document.createElement('div');
    newElement.textContent = '新元素';
    newElement.classList.add('new-element');
    newElement.classList.add(style.dayItemChild);
    newElement.dataset.draggable = 'true';
    return newElement;
  }

  // 传入一个元素，该元素高度设为其子元素高度之和
  function setParentHeightToChildrenSum(parentElement) {
    const children = parentElement.children;
    let totalHeight = 0;

    // 计算所有子元素的高度之和
    for (let i = 0; i < children.length; i++) {
      totalHeight += children[i].offsetHeight;
    }

    // 设置父元素的高度为子元素高度之和
    parentElement.style.height = totalHeight + 'px';
  }

  function insertElementAbove(target) {
    removeNewElement();
    const parentElement = target.parentElement;
    const newElement = createNewElement();
    parentElement.insertBefore(newElement, target);
    // 父元素高度设置为所有子元素高度之和
    setParentHeightToChildrenSum(parentElement);
    calcLineHeight();
  }

  function insertElementBelow(target) {
    removeNewElement();
    const parentElement = target.parentElement;
    const newElement = createNewElement();
    parentElement.insertBefore(newElement, target.nextSibling);
    // 父元素高度设置为所有子元素高度之和
    setParentHeightToChildrenSum(parentElement);
    calcLineHeight();
  }

  function removeNewElement() {
    const newElement = document.querySelector('.new-element');
    if (newElement) {
      newElement.remove();
    }
  }

  // 判断该元素上面的一个兄弟元素是否是类名为.new-element元素
  function isPreviousElementNewElement(targetElement) {
    const previousSibling = targetElement.previousElementSibling;
    if (previousSibling && previousSibling.classList.contains('new-element')) {
      console.log('上一个元素为new');
      return true;
    }
    return false;
  }

  // 判断该元素下面的一个兄弟元素是否是类名为.new-element元素
  function isNextElementNewElement(targetElement) {
    const nextSibling = targetElement.nextElementSibling;
    if (nextSibling && nextSibling.classList.contains('new-element')) {
      console.log('下一个元素为new');
      return true;
    }
    return false;
  }

  // 下方是不是自己
  function isBelowSelf(targetElement: HTMLElement) {
    if (!targetElement || !dragDataRef.current) return;
    const targetContentId = targetElement.dataset?.contentid;
    if (
      String(targetContentId) === String(dragDataRef.current?.data?.contentId)
    ) {
      // 下方是自己
      return true;
    } else {
      // 下方是兄弟
      return false;
    }
  }

  const handleDragOver = (
    event: any,
    columnIndex: number,
    dayIndex: number,
    subjectId: number,
  ) => {
    event.preventDefault();

    // 不是同一列||在虚拟元素上方||单元格内无子元素都不处理
    if (
      !dragDataRef?.current ||
      dragDataRef?.current?.columnIndex !== columnIndex ||
      hasLineClass(event.target) ||
      event.target.classList.contains('new-element')
    ) {
      return;
    }

    // 兄弟元素拖拽
    if (
      dragDataRef.current &&
      dragDataRef.current.columnIndex === columnIndex &&
      dragDataRef.current.dayIndex === dayIndex
    ) {
      console.log('event.target', event.target);
      const isSelf = isBelowSelf(event.target);
      if (isSelf) {
        return;
      }
      // return;
    }

    // 跨单元格拖拽
    const distance = calcMousePosition(event);
    if (distance <= 50 && !isPreviousElementNewElement(event.target)) {
      // 动态生成一个元素，插入该元素上方
      insertElementAbove(event.target);
    } else if (distance > 50 && !isNextElementNewElement(event.target)) {
      // 动态生成一个元素，插入该元素下方
      insertElementBelow(event.target);
    }
  };

  const clearDropStyle = () => {
    document.querySelectorAll('.drop-over').forEach((el) => {
      el.classList.remove('drop-over');
    });
  };

  function hasLineClass(target) {
    // 匹配以 "line" 开头的类名
    const regex = /^line\d+$/;
    return Array.from(target.classList).some((className) =>
      regex.test(className),
    );
  }

  const handleDragEnter = (
    event: any,
    columnIndex: number,
    childIndex: number,
    subjectId: number,
  ) => {
    event.preventDefault();
    clearDropStyle();
    if (
      dragDataRef.current &&
      dragDataRef.current.columnIndex === columnIndex &&
      // 目标元素含类名包含line
      hasLineClass(event.target)
    ) {
      event.target.classList.add('drop-over'); // 可放置标识
    }
  };

  // 参数为元素类名，返回一个对象：该元素前一个元素属性data-contentid值及后一个
  function getContentIds(className: string) {
    const element = document.querySelector(`.${className}`);
    if (!element) {
      return null; // 如果找不到对应类名的元素，则返回 null
    }

    const prevElement = element.previousElementSibling;
    const nextElement = element.nextElementSibling;

    const prevContentId = prevElement ? prevElement?.dataset?.contentid : null;
    const nextContentId = nextElement ? nextElement?.dataset?.contentid : null;

    return {
      prevContentId,
      nextContentId,
    };
  }

  const handleDrop = (
    event: any,
    columnIndex: number,
    dayIndex: number,
    subjectId: number,
    data: any,
  ) => {
    event.preventDefault();
    clearDropStyle();
    // 移除拖动时的样式类
    document.querySelectorAll('.dragging').forEach((el) => {
      el.classList.remove('dragging');
    });
    // 移除其他列的禁用样式
    const columns = document.querySelectorAll('[class*="column-"]');
    columns.forEach((column) => {
      column.classList.remove('disabled'); // 移除禁用样式
    });
    console.log('isBelowSelf(event.target)', isBelowSelf(event.target));
    if (
      !dragDataRef.current ||
      dragDataRef.current.columnIndex !== columnIndex ||
      isBelowSelf(event.target)
    ) {
      removeNewElement();
      return;
    }
    const tempdata = JSON.parse(JSON.stringify(tableData));
    // 该放置元素是否为动态生成的占位元素new-element
    const isNewElement = event.target?.classList?.contains('new-element');
    if (isNewElement) {
      // 得到其序号
      const indexObj = getContentIds('new-element');
      console.log('indexObj', indexObj);
      if (indexObj?.prevContentId) {
        // 插入到前一个元素之后
        const tempIndex = tempdata[dayIndex].contents.findIndex(
          (d) => String(d.contentId) === String(indexObj.prevContentId),
        );
        tempdata[dayIndex].contents.splice(
          tempIndex + 1,
          0,
          dragDataRef.current.data,
        );
      } else if (indexObj?.nextContentId) {
        // 插入到后一个元素之前;
        const tempIndex = tempdata[dayIndex].contents.findIndex(
          (d) => String(d.contentId) === String(indexObj.nextContentId),
        );
        tempdata[dayIndex].contents.splice(
          tempIndex,
          0,
          dragDataRef.current.data,
        );
      }
    } else {
      tempdata[dayIndex].contents.push(dragDataRef.current.data);
    }
    // 修改数据源

    const deleteIndex = tempdata[
      dragDataRef.current.dayIndex
    ].contents.findLastIndex(
      (v) => v.contentId === dragDataRef.current?.data?.contentId,
    );
    tempdata[dragDataRef.current?.dayIndex].contents.splice(deleteIndex, 1);
    setTableData(tempdata);
    removeNewElement();
  };

  return (
    <div className={style.container} key={JSON.stringify(tableData)}>
      <div className={style.left}>
        <div className={style.columns}>
          <div className={style.column}>
            <div className={classNames(style.dayItem, 'line1', style.first)}>
              天数/学科
            </div>
            {mockTableData?.map((d, index) => (
              <div
                key={d.subjectId}
                className={classNames(style.dayItem, `line${index + 2}`)}
              >
                第{index + 1}天
              </div>
            ))}
          </div>
          {Object.keys(subjectData)?.map((subjectId, columnIndex) => (
            <div
              className={classNames(style.column, `column-${columnIndex}`)}
              key={subjectId}
            >
              <div className={classNames(style.dayItem, 'line1', style.first)}>
                {calcSubjectName(Number(subjectId))}
              </div>
              {subjectData[subjectId]?.map((v, index: number) => (
                <div
                  className={classNames(style.dayItem, `line${index + 2}`)}
                  key={index}
                  onDragOver={(event) =>
                    handleDragOver(
                      event,
                      columnIndex,
                      index,
                      Number(subjectId),
                      v,
                    )
                  }
                  onDragEnter={(event) =>
                    handleDragEnter(
                      event,
                      columnIndex,
                      index,
                      Number(subjectId),
                    )
                  }
                  onDrop={(event) =>
                    handleDrop(event, columnIndex, index, Number(subjectId), v)
                  }
                >
                  {v.map((c, i) => (
                    <div
                      draggable
                      key={i}
                      data-contentid={c.contentId}
                      className={style.dayItemChild}
                      onDragStart={(event) =>
                        handleDragStart(
                          event,
                          columnIndex,
                          index,
                          i,
                          Number(subjectId),
                          c,
                        )
                      }
                    >
                      {c.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={style.right}>右</div>
    </div>
  );
}

export default Arrange;
