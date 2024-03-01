import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import style from './style.scss';
import useDropZone from './hooks/useDropZone';
import { DRAGGING_ELE, DROP_ABLE_ELE, PLACEHOLDER_ELE } from './dataConfig';

type DragData = {
  columnIndex: number;
  dayIndex: number | null; // null从资源池拖拽
  data: any;
  el: HTMLElement;
};

type ISubjectData = {
  subjectId: number;
  subjectName: string;
  contents: any[];
  daySort?: null;
  date?: null;
};

// TODO:动画、资源池

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
      // {
      //   title: '古诗鉴赏古诗鉴赏古诗鉴赏古诗鉴赏古诗鉴赏',
      //   duration: 1000,
      //   parentContentId: 1312,
      //   contentUrl:
      //     'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1312&lessonId=3093',
      //   contentId: '1111',
      //   subjectId: 1,
      //   subjectName: '语文',
      //   contentType: 1,
      //   contentName: '课程讲',
      //   courseOrder: 0,
      //   interactiveVideo: false,
      //   resourceKey: '3093-1-538203183672175333',
      //   contentKey: '1-3093',
      //   paperType: false,
      //   videoType: true,
      // },
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
    contents: [
      {
        title: 'B端测试-导学案地理2',
        duration: 1046,
        parentContentId: 1312,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1312&lessonId=3093',
        contentId: '30932',
        subjectId: 1,
        subjectName: '语文',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3093-1-54334002781445093',
        contentKey: '1-3093',
        paperType: false,
        videoType: true,
      },
      {
        title: '晓蕾测试语文03-有导学案2',
        duration: 1327,
        parentContentId: 1314,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1314&lessonId=2811',
        contentId: '28112',
        subjectId: 1,
        subjectName: '语文',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2811-1-54334002781451840',
        contentKey: '1-2811',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: 2,
    subjectName: '数学',
    daySort: null,
    date: null,
    contents: [
      {
        title: '语文-ModelForm操作及验证-12',
        duration: 776,
        parentContentId: 1286,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1286&lessonId=3052',
        contentId: '30522',
        subjectId: 2,
        subjectName: '数学',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3052-1-54334002781455330',
        contentKey: '1-3052',
        paperType: false,
        videoType: true,
      },
      {
        title: '语文-ModelForm操作及验证-22',
        duration: 1568,
        parentContentId: 1286,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1286&lessonId=3053',
        contentId: '30532',
        subjectId: 2,
        subjectName: '数学',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3053-1-54334002781457430',
        contentKey: '1-3053',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: 3,
    subjectName: '英语',
    daySort: null,
    date: null,
    contents: [
      {
        title: 'B端测试-英语导学案2',
        duration: 2880,
        parentContentId: 1306,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1306&lessonId=3089',
        contentId: '30892',
        subjectId: 3,
        subjectName: '英语',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3089-1-54334002781461073',
        contentKey: '1-3089',
        paperType: false,
        videoType: true,
      },
      {
        title:
          'bbb鲍小鱼包0916-是的话房价快速单号福建客户的数据库返回就肯定是放假看电视接口返回到数据库和放假看电视福建客户的数据库返回就肯定是放假看电视就开始是是是打飞机可给对方和高级开会打飞机可刚发的刚发2',
        duration: 5,
        parentContentId: 1232,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1232&lessonId=2651',
        contentId: '26512',
        subjectId: 3,
        subjectName: '英语',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2651-1-54334002781463606',
        contentKey: '1-2651',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: 5,
    subjectName: '化学',
    daySort: null,
    date: null,
    contents: [
      {
        title: 'zzj-导学案-化学12',
        duration: 8,
        parentContentId: 1241,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1241&lessonId=2667',
        contentId: '26672',
        subjectId: 5,
        subjectName: '化学',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2667-1-54334002781484675',
        contentKey: '1-2667',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: 7,
    subjectName: '政治',
    daySort: null,
    date: null,
    contents: [
      {
        title: '董妙妙1232',
        duration: 175,
        parentContentId: 877,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=877&lessonId=2010',
        contentId: '20102',
        subjectId: 7,
        subjectName: '政治',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2010-1-54334002781489355',
        contentKey: '1-2010',
        paperType: false,
        videoType: true,
      },
      {
        title: 'test12',
        duration: 175,
        parentContentId: 877,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=877&lessonId=2019',
        contentId: '20192',
        subjectId: 7,
        subjectName: '政治',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '2019-1-54334002781492949',
        contentKey: '1-2019',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: 8,
    subjectName: '历史',
    daySort: null,
    date: null,
    contents: [
      {
        title: '中国古代科技史2',
        duration: 175,
        parentContentId: 527,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=527&lessonId=766',
        contentId: '7662',
        subjectId: 8,
        subjectName: '历史',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '766-1-54334002781498208',
        contentKey: '1-766',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: 9,
    subjectName: '地理',
    daySort: null,
    date: null,
    contents: [
      {
        title: 'liujw测试课程讲(勿动)私有2',
        duration: 4,
        parentContentId: 1296,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1296&lessonId=3079',
        contentId: '30792',
        subjectId: 9,
        subjectName: '地理',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3079-1-54334002781502846',
        contentKey: '1-3079',
        paperType: false,
        videoType: true,
      },
      {
        title: '测试-私有2',
        duration: 120,
        parentContentId: 1296,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=1296&lessonId=3081',
        contentId: '30812',
        subjectId: 9,
        subjectName: '地理',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '3081-1-54334002781505866',
        contentKey: '1-3081',
        paperType: false,
        videoType: true,
      },
    ],
  },
  {
    subjectId: 10,
    subjectName: '心灵成长',
    daySort: null,
    date: null,
    contents: [
      {
        title: '测试4442',
        duration: 651,
        contentUrl:
          '//web.test.mistong.com/spiritual-growth/#/xinqing?fmId=303528',
        contentId: '3035282',
        subjectId: 10,
        subjectName: '心灵成长',
        contentType: 3,
        contentName: 'FM',
        courseOrder: 0,
        resourceKey: '303528-3-54334002781510795',
        contentKey: '3-303528',
        paperType: false,
        videoType: false,
      },
      {
        title: '高中生学习力综合测评2',
        duration: 1800,
        contentId: '12',
        subjectId: 10,
        subjectName: '心灵成长',
        contentType: 6,
        contentName: '测评',
        courseOrder: 0,
        resourceKey: '1-6-54334002781514696',
        contentKey: '6-1',
        paperType: false,
        videoType: false,
      },
    ],
  },
  {
    subjectId: 14,
    subjectName: '信息技术',
    daySort: null,
    date: null,
    contents: [
      {
        title: '浴火重生-信息第三章节2',
        duration: 175,
        parentContentId: 222,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=222&lessonId=232',
        contentId: '2322',
        subjectId: 14,
        subjectName: '信息技术',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '232-1-54334002781519563',
        contentKey: '1-232',
        paperType: false,
        videoType: true,
      },
      {
        title: '心态决定一切2',
        duration: 175,
        parentContentId: 222,
        contentUrl:
          'https://teacher.test.mistong.com/ewtbend/bend/index/index.html#/homework/play-videos?courseId=222&lessonId=235',
        contentId: '2352',
        subjectId: 14,
        subjectName: '信息技术',
        contentType: 1,
        contentName: '课程讲',
        courseOrder: 0,
        interactiveVideo: false,
        resourceKey: '235-1-54334002781522623',
        contentKey: '1-235',
        paperType: false,
        videoType: true,
      },
    ],
  },
];

function Arrange() {
  const [tableData, setTableData] = useState([]);
  const [allSubjectData, setAllSubjectData] = useState<ISubjectData[]>([]);
  const [activeSubjectId, setActiveSubjectId] = useState<number>(0);
  const [isFold, setIsFold] = useState(false);
  const dragDataRef = useRef<DragData | null>(null);

  const getTableData = () => {
    setTableData(mockTableData);
  };
  const getAllSubjectData = () => {
    setAllSubjectData(subjects);
    setActiveSubjectId(subjects[0].subjectId);
  };
  useEffect(() => {
    getTableData();
    getAllSubjectData();
  }, []);

  useEffect(() => {
    // 变化时，将表格内相应学科滚到视口
    const subjectEle = document.getElementById(`subject-${activeSubjectId}`);
    if (subjectEle) {
      subjectEle.scrollIntoView({
        behavior: 'smooth',
        inline: 'end',
      });
    }
  }, [activeSubjectId]);

  // 转换后的表格数据
  const subjectData = useMemo(
    () =>
      allSubjectData.reduce((data, subject) => {
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
    [tableData, allSubjectData],
  );

  // 计算每一行最高的高度，将每个元素置为最高
  const calcLineHeight = () => {
    console.log('calcHeight');
    const loop_time = tableData.length + 1;
    Array(loop_time)
      .fill(1)
      .forEach((_, index) => {
        const lineIndex = index + 1;
        const elements = document.querySelectorAll(`.line${lineIndex}`);
        [...elements].map((element) => {
          (element as HTMLElement).style.height = 'auto';
        });
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

  // 获取学科名称
  const calcSubjectName = (subjectId: number) =>
    allSubjectData.find((s) => Number(s.subjectId) === Number(subjectId))
      ?.subjectName;

  /**
   * 开始拖动
   */
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    columnIndex: number,
    dayItemIndex: number | null,
    data: any,
  ) => {
    // 拖动时图标
    event.dataTransfer.effectAllowed = 'linkMove'; // 'none'、'copy'、'copyLink'、'copyMove'、'link'、'linkMove'、'move'、
    // 添加拖动时的样式类
    event.target && (event.target as HTMLElement).classList.add(DRAGGING_ELE);
    // 给其他列添加禁用样式
    const columns = document.querySelectorAll('[class*="column-"]');
    columns.forEach((column) => {
      if (!column.classList.contains(`column-${columnIndex}`)) {
        column.classList.add('disabled'); // 添加禁用样式
      }
    });
    // 暂存正在拖动的数据
    dragDataRef.current = {
      columnIndex,
      dayIndex: dayItemIndex,
      el: event.target as HTMLElement,
      data,
    };
  };

  /**
   * 计算鼠标在目标元素上下的位置占比
   */
  const calcMousePosition = (event: React.DragEvent<HTMLElement>) => {
    // 获取元素的高度
    const elementHeight = (event.target as HTMLElement).clientHeight;
    // 计算鼠标相对于元素顶部的距离
    const mouseY =
      event.clientY - (event.target as HTMLElement).getBoundingClientRect().top;
    // 计算鼠标经过元素高度的百分比
    const mousePercentage = (mouseY / elementHeight) * 100;
    return mousePercentage;
  };

  /**
   * 创建占位元素（用于单元格内排序）
   */
  const createNewElement = () => {
    const newElement = document.createElement('div');
    newElement.textContent = '新元素';
    newElement.style.color = 'transparent';
    newElement.dataset.draggable = 'true';
    newElement.classList.add(PLACEHOLDER_ELE);
    newElement.classList.add(style.dayItemChild);
    return newElement;
  };

  // 将传入元素高度设为其子元素高度之和
  const setParentHeightToChildrenSum = (parentElement: HTMLElement) => {
    const children = parentElement.children;
    let totalHeight = 0;
    // 计算所有子元素的高度之和
    for (let i = 0; i < children.length; i++) {
      if (children[i]) {
        totalHeight += (children[i] as HTMLElement).offsetHeight;
      }
    }
    parentElement.style.height = totalHeight + 'px';
  };

  /**
   * 在传入元素前或后插入占位元素
   */
  const insertElement = (target: HTMLElement, position: 'above' | 'blow') => {
    removeNewElement();
    const parentElement = target.parentElement;
    const newElement = createNewElement();
    parentElement &&
      parentElement.insertBefore(
        newElement,
        position === 'above' ? target : target.nextSibling,
      );
    // 父元素高度设置为所有子元素高度之和
    setParentHeightToChildrenSum(parentElement as HTMLElement);
    calcLineHeight();
  };

  /**
   * 删除占位元素PLACEHOLDER_ELE
   */
  const removeNewElement = () => {
    const newElement = document.querySelector(`.${PLACEHOLDER_ELE}`);
    if (newElement) {
      newElement.remove();
    }
  };

  /**
   * 判断该元素的指定方向的兄弟元素是否是占位元素
   */
  const isSiblingNewElement = (
    targetElement: HTMLElement,
    direction: 'previous' | 'next',
  ) => {
    const sibling =
      direction === 'previous'
        ? targetElement.previousElementSibling
        : targetElement.nextElementSibling;
    return sibling && sibling.classList.contains(PLACEHOLDER_ELE);
  };

  /**
   * 判断下方是不是自己
   */
  const isBelowSelf = (targetElement: HTMLElement) => {
    if (!targetElement || !dragDataRef.current) return;
    const targetContentId = targetElement.dataset?.contentid;
    return (
      String(targetContentId) === String(dragDataRef.current?.data?.contentId)
    );
  };

  /**
   * 拖动时经过目标元素上方
   */
  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    columnIndex: number,
    dayIndex: number,
  ) => {
    event.preventDefault();
    // 不是同一列||在虚拟元素上方||单元格内无子元素都不处理
    if (
      !dragDataRef?.current ||
      dragDataRef?.current?.columnIndex !== columnIndex ||
      hasLineClass(event.target as HTMLElement) ||
      (event.target as HTMLElement).classList.contains(PLACEHOLDER_ELE) ||
      isBelowSelf(event.target as HTMLElement) // 自己
    ) {
      return;
    }

    // if (
    //   dragDataRef.current &&
    //   dragDataRef.current.columnIndex === columnIndex &&
    //   dragDataRef.current.dayIndex === dayIndex &&
    //   isBelowSelf(event.target as HTMLElement) // 自己
    // ) {
    //   return;
    // }

    // 跨单元格拖拽
    const distance = calcMousePosition(event);
    if (
      distance <= 50 &&
      !isSiblingNewElement(event.target as HTMLElement, 'previous')
    ) {
      // 动态生成一个元素，插入该元素上方
      insertElement(event.target as HTMLElement, 'above');
    } else if (
      distance > 50 &&
      !isSiblingNewElement(event.target as HTMLElement, 'next')
    ) {
      // 动态生成一个元素，插入该元素下方
      insertElement(event.target as HTMLElement, 'blow');
    }
  };

  /**
   * 清除拖拽元素可放置样式
   */
  const clearDropStyle = () => {
    document.querySelectorAll(`.${DROP_ABLE_ELE}`).forEach((el) => {
      el.classList.remove(DROP_ABLE_ELE);
    });
  };

  /**
   * 匹配以 "line" 开头的类名
   */
  const hasLineClass = (target: HTMLElement, class_name = 'line') => {
    // const regex = /^line\d+$/;
    const regex = new RegExp(`^${class_name}\\d+$`);
    return Array.from(target.classList).some((className) =>
      regex.test(className),
    );
  };

  /**
   * 拖拽元素进入目标元素,触发一次
   */
  const handleDragEnter = (
    event: React.DragEvent<HTMLElement>,
    columnIndex: number,
  ) => {
    event.preventDefault();
    clearDropStyle();
    if (
      dragDataRef.current &&
      dragDataRef.current.columnIndex === columnIndex &&
      // 目标元素含类名包含line
      hasLineClass(event.target as HTMLElement)
    ) {
      removeNewElement();
      (event.target as HTMLElement).classList.add(DROP_ABLE_ELE); // 可放置标识
    }
  };

  /**
   * 参数为元素类名，返回一个对象：该元素前一个元素属性data-contentid值及后一个
   */
  const getContentIds = (className: string) => {
    const element: HTMLElement | null = document.querySelector(`.${className}`);
    if (!element) {
      return null; // 如果找不到对应类名的元素，则返回 null
    }

    const prevElement = element.previousElementSibling;
    const nextElement = element.nextElementSibling;

    const prevContentId = prevElement
      ? (prevElement as HTMLElement)?.dataset?.contentid
      : null;
    const nextContentId = nextElement
      ? (nextElement as HTMLElement)?.dataset?.contentid
      : null;

    return {
      prevContentId,
      nextContentId,
    };
  };

  /**
   * 拖拽元素放下
   */
  const handleDrop = (
    event: React.DragEvent<HTMLElement>,
    columnIndex: number,
    dayIndex: number,
  ) => {
    event.preventDefault();
    clearDropStyle();
    // 移除拖动时的样式类
    document.querySelectorAll(`.${DRAGGING_ELE}`).forEach((el) => {
      el.classList.remove(DRAGGING_ELE);
    });
    // 移除其他列的禁用样式
    const columns = document.querySelectorAll('[class*="column-"]');
    columns.forEach((column) => {
      column.classList.remove('disabled'); // 移除禁用样式
    });
    if (
      !dragDataRef.current ||
      dragDataRef.current.columnIndex !== columnIndex ||
      isBelowSelf(event.target as HTMLElement)
    ) {
      removeNewElement();
      return;
    }
    const tempdata = JSON.parse(JSON.stringify(tableData));
    // 该放置元素是否为动态生成的占位元素new-element
    const isNewElement = (event.target as HTMLElement)?.classList?.contains(
      PLACEHOLDER_ELE,
    );
    if (isNewElement) {
      // 得到其序号
      const indexObj = getContentIds(PLACEHOLDER_ELE);
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

    if (dragDataRef.current.dayIndex === null) {
      // 从资源池拖拽
      const tempSubjectData = JSON.parse(JSON.stringify(allSubjectData));
      const deleteIndex = tempSubjectData[columnIndex]?.contents?.findIndex(
        (v) => v.contentId === dragDataRef.current?.data?.contentId,
      );
      tempSubjectData[columnIndex].contents.splice(deleteIndex, 1);
      setAllSubjectData(tempSubjectData);
    } else {
      // 表格内拖拽
      const deleteIndex = tempdata[
        dragDataRef.current.dayIndex
      ].contents.findLastIndex(
        (v) => v.contentId === dragDataRef.current?.data?.contentId,
      );
      tempdata[dragDataRef.current?.dayIndex].contents.splice(deleteIndex, 1);
    }
    setTableData(tempdata);
    dragDataRef.current = null;
    removeNewElement();
  };

  const handleSubjectClick = (subjectId: number) => {
    setActiveSubjectId(subjectId);
  };

  const currSubjectDataIndex = useMemo(() => {
    const index = allSubjectData.findIndex(
      (v) => v.subjectId === activeSubjectId,
    );
    return index;
  }, [allSubjectData, activeSubjectId]);

  const handleDropOutside = () => {
    // 拖拽元素放置在可放置区域外
    // 移除拖动时的样式类
    document.querySelectorAll(`.${DRAGGING_ELE}`).forEach((el) => {
      el.classList.remove(DRAGGING_ELE);
    });
    // 移除其他列的禁用样式
    const columns = document.querySelectorAll('[class*="column-"]');
    columns.forEach((column) => {
      column.classList.remove('disabled'); // 移除禁用样式
    });
    clearDropStyle();
    removeNewElement();
  };

  useDropZone(style.left, {
    onDropInside: () => {
      console.log('里面');
    },
    onDropOutside: handleDropOutside,
    onDragOverOutside: () => {
      console.log('拖拽元素放置在可放置区域外');
      clearDropStyle();
      removeNewElement();
    },
  });

  // 表格内数据删除
  const handleDeleteTableData = (
    subjectId: number,
    dayIndex?: number,
    contentId?: string,
  ) => {
    const tempData = JSON.parse(JSON.stringify(tableData));
    const tempSubjectData = JSON.parse(JSON.stringify(allSubjectData));
    const allDeleteResources = [];
    if (dayIndex !== undefined) {
      // 删除一条数据
      const tempContents = tempData[dayIndex].contents.filter(
        (d) => d.contentId !== contentId,
      );
      // 找出当前天中要删除的资源
      const deleteResources = tempData[dayIndex]?.contents?.filter(
        (d) => d.contentId === contentId,
      );
      tempData[dayIndex].contents = tempContents;
      allDeleteResources.push(...(deleteResources || []));
    } else {
      // 删除一列数据
      tempData.forEach((item) => {
        const tempContents = item?.contents?.filter(
          (d) => d.subjectId !== subjectId,
        );
        // 找出当前天中要删除的资源
        const deleteResources = item?.contents?.filter(
          (d) => d.subjectId === subjectId,
        );
        item.contents = tempContents;
        allDeleteResources.push(...(deleteResources || []));
      });
    }
    setTableData(tempData);
    // 更新待选
    const index = tempSubjectData.findIndex(
      (d) => Number(d.subjectId) === subjectId,
    );
    tempSubjectData[index].contents.push(...allDeleteResources);
    setAllSubjectData(tempSubjectData);
  };

  // 可拖拽元素hover事件
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    subjectId: number,
    dayIndex: number,
    contentId: string,
  ) => {
    const target = event.target as HTMLElement;
    target.style.position = 'relative';
    target.style.zIndex = '1000';
    // 动态生成一个删除<span>删除</span>子元素
    const deleteSpan = document.createElement('span');
    deleteSpan.innerText = '删除';
    deleteSpan.style.position = 'absolute';
    deleteSpan.style.right = '0';
    deleteSpan.style.bottom = '0';
    deleteSpan.style.color = 'red';
    deleteSpan.style.cursor = 'pointer';
    deleteSpan.style.zIndex = '1';
    deleteSpan.classList.add('delete-resource');
    deleteSpan.addEventListener('click', (event) => {
      console.log('点击删除');
      event.stopPropagation();
      handleDeleteTableData(subjectId, dayIndex, contentId);
    });
    deleteSpan.addEventListener('mousedown', function (event) {
      event.preventDefault(); // 阻止默认的拖拽操作
    });
    target.appendChild(deleteSpan);
  };

  // 删除可拖拽元素hover时产生的UI
  const deleteHoverStyle = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    // // 删除position等定位信息、删除<span>删除</span>子元素
    const target = event.target as HTMLElement;
    target.style.position = '';
    target.style.zIndex = '';
    const deleteSpans = document.querySelectorAll('.delete-resource');
    deleteSpans.forEach((span) => span.remove());
  };

  const handleFold = () => {
    const ele = document.querySelectorAll(`.${style.right}`);
    if (ele[0]) {
      // ele[0].style.display = 'none';
      ele[0].style.width = '0px';
      setIsFold(true);
    }
    console.log('ele', ele);
  };

  console.log('tableData', tableData);
  console.log('allSubjectData', allSubjectData);

  return (
    // <div className={style.container} key={JSON.stringify(tableData)}>
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.columns}>
          <div className={classNames(style.column, 'fixcolumn')}>
            <div
              className={classNames(style.dayItem, 'line1', style.first)}
              onDrop={handleDropOutside}
              onDragEnter={(event) => {
                event.preventDefault();
                clearDropStyle();
                removeNewElement();
              }}
              // style={{ left: 0, top: 0, right: 0, bottom: 0 }}
            >
              天数/学科
            </div>
            {tableData?.map((d, index) => (
              <div
                key={index}
                className={classNames(style.dayItem, `line${index + 2}`)}
                onDragOver={(event) => {
                  event.preventDefault();
                }}
                onDragEnter={(event) => {
                  event.preventDefault();
                  clearDropStyle();
                  removeNewElement();
                }}
                onDrop={handleDropOutside}
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
              <div
                id={`subject-${subjectId}`}
                className={classNames(style.dayItem, 'line1', style.first)}
                onDragOver={(event) => {
                  event.preventDefault();
                }}
                onDragEnter={(event) => {
                  event.preventDefault();
                  clearDropStyle();
                  removeNewElement();
                }}
                onDrop={handleDropOutside}
              >
                {calcSubjectName(Number(subjectId))}
                <span
                  style={{ color: '#ff0066' }}
                  onClick={() => handleDeleteTableData(Number(subjectId))}
                >
                  删除
                </span>
              </div>
              {subjectData[subjectId]?.map((v, index: number) => (
                <div
                  className={classNames(style.dayItem, `line${index + 2}`)}
                  style={{ position: 'relative', zIndex: 3 }}
                  key={index}
                  onDragOver={(event) =>
                    handleDragOver(event, columnIndex, index)
                  }
                  onDragEnter={(event) => handleDragEnter(event, columnIndex)}
                  onDrop={(event) => handleDrop(event, columnIndex, index)}
                >
                  {v.map((c, i) => (
                    <div
                      draggable
                      key={i}
                      data-contentid={c.contentId}
                      onMouseEnter={(event) => {
                        handleMouseEnter(
                          event,
                          Number(subjectId),
                          index,
                          c.contentId,
                        );
                      }}
                      onMouseLeave={(event) => {
                        console.log('离开');
                        deleteHoverStyle(event);
                      }}
                      className={style.dayItemChild}
                      onDragStart={(event) => {
                        deleteHoverStyle(event);
                        handleDragStart(event, columnIndex, index, c);
                      }}
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
      <div className={style.right}>
        <div style={isFold ? { display: 'none' } : { display: 'block' }}>
          <div className={style.subjectName}>
            {allSubjectData?.map((d) => (
              <span
                key={d.subjectId}
                onClick={() => handleSubjectClick(d.subjectId)}
                className={
                  d.subjectId === activeSubjectId
                    ? style.activeSubject
                    : undefined
                }
              >
                {d.subjectName}({d?.contents?.length || 0})
              </span>
            ))}
          </div>
          <div className={style.subjectContents}>
            {allSubjectData[currSubjectDataIndex]?.contents.map((d) => (
              <div
                className={style.resourceItem}
                key={d.contentId}
                draggable
                onDragStart={(event) =>
                  handleDragStart(event, currSubjectDataIndex, null, d)
                }
              >
                {d.title}
              </div>
            ))}
          </div>
        </div>
        {!isFold && (
          <div className={style.fold} onClick={handleFold}>
            收起
          </div>
        )}
      </div>
      {isFold && (
        <div
          onClick={() => {
            setIsFold(false);
            const ele = document.querySelectorAll(`.${style.right}`);
            if (ele[0]) {
              // ele[0].style.display = 'block';
              ele[0].style.width = '340px';
            }
          }}
        >
          展开
        </div>
      )}
    </div>
  );
}

export default Arrange;
