import { Card, Media, Heading, Content, Image } from 'react-bulma-components';


const Pet = ({pet}) => {
    return (
        <Card style={{ width: 300, margin: 'auto' }}>
          <Card.Image
            size="4by3"
            src={pet.photoURL}
          />
          <Card.Content>
            <Media>
              <Media.Item renderAs="figure" align="left">
                <Image
                  size={64}
                  alt="64x64"
                  src={pet.photoURL}
                />
              </Media.Item>
              <Media.Item>
                <Heading size={4}>{pet.name}</Heading>
                <Heading subtitle size={6}>
                    {`${pet.breed}, age ${pet.age}`}
                </Heading>
              </Media.Item>
            </Media>
            <Content className='block-ellipsis'>
              {pet.description}
              <br />
              <span>{pet.adoptionStatus}</span>
            </Content>
          </Card.Content>
        </Card>
      );
};

export default Pet;
