import React from 'react';

const Header = ({title}) => {
    return (
        <h1>{title}</h1>
    );
}

const Part = ({text}) => {
    return (
        <p>{text}</p>
    );
}

const Course = ({courses}) => {

    const sum = (accumulator, currentValue) => accumulator+currentValue.exercises;

    return (
        courses.map(elem =>{ 
            const text1 = "total of " + elem.parts.reduce(sum,0) + " exercises";
            return (
                <div>
                    <Header key={"header"+elem.id} title={elem.name}/>
                    {elem.parts.map(i => {
                        const text2 = i.name + ' ' + i.exercises;
                        return (
                            <Part key={"part"+i.id} text={text2}/>
                        );
                    })}
                    <Part key={"total"+elem.id} text={text1}/>
                </div>
            );
        })
    );
}

export default Course;