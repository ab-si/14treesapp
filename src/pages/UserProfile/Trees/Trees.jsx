import { Chip } from "../../../stories/Chip/Chip";
import { TreesPlanted } from '../../../stories/TreesPlanted/TreesPlanted';
import './trees.scss'
import 'primeflex/primeflex.css';

import { useRecoilValue } from 'recoil';
import { usersData } from '../../../store/atoms';

export const Trees = () => {

    const userinfo = useRecoilValue(usersData);
    let numTrees = userinfo.trees.length
    let images = [];
    for (const tree of userinfo.trees) {
        images.push.apply(images, tree['memories']);
    }
    images = images.sort((a, b) => 0.5 - Math.random());

    return (
        <div className="trees">
            {/* <h2>Trees Planted</h2> */}
            <div className="p-grid nested-grid">
                <div className="p-col-12 p-lg-6 p-md-6 treesplanted">
                    <div className="p-grid" style={{ "margin": 0 }}>
                        <div className="p-col-12" style={{ "padding": 0, "display": "flex" }}>
                            <h2 style={{ "margin": "0 0px 5px 0", paddingTop: '5px' }}>Trees Planted</h2>
                            {
                                numTrees > 2 &&
                                <Chip label={"See All >"} mode={'secondary'} size={'small'} />
                            }
                        </div>
                        <div className="p-col-6 p-lg-6 p-md-6" style={{ "padding": 0, "cursor": "pointer" }}>
                            {
                                numTrees > 0
                                    ?
                                    <TreesPlanted
                                        id={userinfo.trees[0].tree.sapling_id}
                                        name={userinfo.trees[0].tree.tree_id.name}
                                        img={userinfo.trees[0].tree.tree_id.image[0]}
                                        date={userinfo.trees[0].tree.date_added} />
                                    :
                                    <TreesPlanted />
                            }
                        </div>
                        <div className="p-col-6 p-lg-6 p-md-6" style={{ "padding": 0, "cursor": "pointer" }}>
                            {
                                numTrees > 1
                                    ?
                                    <TreesPlanted
                                        id={userinfo.trees[1].tree.sapling_id}
                                        name={userinfo.trees[1].tree.tree_id.name}
                                        img={userinfo.trees[1].tree.tree_id.image[0]}
                                        date={userinfo.trees[1].tree.date_added} />
                                    :
                                    <TreesPlanted />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}