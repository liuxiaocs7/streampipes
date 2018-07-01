/*
 * Copyright 2018 FZI Forschungszentrum Informatik
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package org.streampipes.processors.transformation.flink.processor.hasher;

import io.flinkspector.datastream.DataStreamTestBase;
import org.junit.Test;
import org.streampipes.processors.transformation.flink.processor.hasher.algorithm.Md5HashAlgorithm;
import org.streampipes.processors.transformation.flink.processor.hasher.algorithm.Sha1HashAlgorithm;
import org.streampipes.processors.transformation.flink.processor.hasher.algorithm.Sha2HashAlgorithm;

public class TestFieldHasher extends DataStreamTestBase {

  @Test
  public void testFieldHasherMd5() {
    FieldHasher fieldHasher = new FieldHasher("test", new Md5HashAlgorithm());
  }

  @Test
  public void testFieldHasherSha1() {
    FieldHasher fieldHasher = new FieldHasher("test", new Sha1HashAlgorithm());

  }

  @Test
  public void testFieldHasherSha2() {
    FieldHasher fieldHasher = new FieldHasher("test", new Sha2HashAlgorithm());

  }

}
