import { FileOutlined, HeartFilled } from '@ant-design/icons';
import { Breadcrumb, Card, Empty, PageHeader, message as antdMessage } from 'antd';
import React, { useEffect, useState } from 'react';
import { triggerAPIRequest, apis, HTTP_GET, HTTP_DELETE } from '../../api/apiConfig';
import QAPage from '../common/QAPage';
import { Answer, AnswerContainer, ContentContainer, DocumentTitle } from '../QuestionAnswering/style';

const FavoriteAnswersList = (props) => {
  const [favList, setFavList] = useState();
  const getFavList = () => {
    triggerAPIRequest(
      `${apis.answers.favList}`,
      HTTP_GET,
    )
      .then((data) => setFavList(data));
  };

  const unSubscribe = (id) => {
    triggerAPIRequest(`${apis.answers.unSubscribe}/${id}`, HTTP_DELETE)
      .then(({ message }) => {
        antdMessage.success(message)
        getFavList();
      })
      .catch((error) => antdMessage.error(error))
  };

  useEffect(() => {
    getFavList();
  }, []);

  return (
    <QAPage
      breadCrumb={(
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Answer</Breadcrumb.Item>
          <Breadcrumb.Item>My Favorite</Breadcrumb.Item>
        </Breadcrumb>
      )}
    >
      <Card style={{ margin: 10 }}>
        <div>
          <PageHeader
            title='我的收藏'
            subTitle='展示所收藏的答案'
            onBack={() => props.history.goBack()}
          />
        </div>

        <ContentContainer>
          {
            favList && favList.length > 0 ? 
              favList.map((item) =>(
                <AnswerContainer>
                  <DocumentTitle>
                    <span>
                      <FileOutlined />
                      来自文章 {item.document_title}
                    </span>
                  
                    <HeartFilled style={{ fontSize: 20, color: '#F81D52' }} onClick={() => unSubscribe(item.id)}/>
                  </DocumentTitle>
                  <Answer>
                    {item.answer.split(/[,，。]+/).map((para) => <p>{para}</p>)}
                  </Answer>
                  {item.concrete_answer?<b>总结:{item.concrete_answer.split(/[,，。]+/).map((para) => <p>{para}</p>)}</b> : <></>}
                </AnswerContainer>
              )) : <Empty description="还没有收藏过答案，快试用此功能吧！" />
          }
        </ContentContainer>
      </Card>
    </QAPage>
   
  )
}

export default FavoriteAnswersList;