import React from "react";

const Card = ({
    company,
    contract,
    featured,
    languages,
    level,
    location,
    logo,
    new: isNew,
    position,
    postedAt,
    role,
    tools,
    addFilterHandler,
}) => {
    let tags = [role, level];

    languages.forEach((lang) => tags.push(lang));
    tools.forEach((tool) => tags.push(tool));

    return (
        <div className={`card ${featured && "featured"}`}>
            <img className="card-image" src={logo} alt={company} />
            <div className="card-body">
                <div className="card-heading">
                    {company && <p>{company}</p>}
                    {isNew && <div className="tag tag-new">new!</div>}
                    {featured && <div className="tag tag-featured">featured</div>}
                </div>
                {position && <h3 className="card-title">{position}</h3>}
                <div className="card-footer">
                    <div className="tag tag-transparent duration-tag">{postedAt}</div>
                    <div className="tag tag-transparent">{contract}</div>
                    <div className="tag tag-transparent">{location}</div>
                </div>
            </div>
            <div className="card-tags">
                {tags.map((tag, index) => (
                    <div
                        onClick={() => {
                            addFilterHandler(tag);
                        }}
                        className="card-tag"
                        key={index}
                    >
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
